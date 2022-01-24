import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Config } from "../config";
import { StorageService } from "./StorageService";

interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

class AuthService {
    // the public client does not contain any request or response interceptors.
    // it can be used to login.
    static PublicClient = axios.create({
        baseURL: Config.restApiBaseUrl,
    });

    static ProtectedClient = axios.create({
        baseURL: Config.restApiBaseUrl,
    });

    private static accessToken: string | null = null;

    private static refreshTokenStorageKey = "@auth/refreshToken";
    private static accessTokenStorageKey = "@auth/accessToken";

    static refreshTokenRequest: Promise<
        AxiosResponse<TokenResponse>
    > | null = null;

    static async loginUsingDeviceId(deviceId: string): Promise<void> {
        const token = await this.PublicClient.post<TokenResponse>(
            "/auth/login",
            {
                type: "deviceId",
                deviceId,
            }
        );

        await this.handleSuccessfulToken(token.data);
    }

    static async logout() {
        // destroy the tokens from the storage
        await Promise.all([
            StorageService.delete(this.refreshTokenStorageKey),
            StorageService.delete(this.accessTokenStorageKey),
        ]);
    }

    private static async handleSuccessfulToken(token: TokenResponse) {
        await Promise.all([
            StorageService.save(this.accessTokenStorageKey, token.accessToken),
            StorageService.save(
                this.refreshTokenStorageKey,
                token.refreshToken
            ),
        ]);
        this.accessToken = token.accessToken;
    }

    static async refreshToken() {
        const token = await this.ProtectedClient.post<TokenResponse>(
            "/auth/refresh",
            {
                refreshToken: await StorageService.getValueFor(
                    this.refreshTokenStorageKey
                ),
            }
        );

        return token;
    }

    private static maybeRefreshToken() {
        if (this.refreshTokenRequest === null) {
            this.refreshTokenRequest = this.refreshToken();
        }
    }

    static rejectedInterceptor(error: AxiosError) {
        if (error.response?.status === 401) {
            // if the requests was rejected with a 401 response, this means,
            // that the user is not authenticated or the token is expired.
            // lets try to refresh it.
            this.maybeRefreshToken();
            // just retry the request.
            // the execution will be blocked by the request interceptor which awaits
            // any ongoing refresh requests.
            return this.ProtectedClient.request(error.config);
        }
        return Promise.reject(error);
    }

    static async requestInterceptor(config: AxiosRequestConfig) {
        if (this.refreshTokenRequest !== null) {
            try {
                await this.refreshTokenRequest;
                this.refreshTokenRequest = null;
            } catch (e) {
                this.refreshTokenRequest = null;
                return new axios.Cancel("refresh token failed");
            }
        }

        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${this.accessToken}`,
        };
    }
}

// add the interceptor.
AuthService.ProtectedClient.interceptors.response.use(
    (response) => response,
    AuthService.rejectedInterceptor
);

// adds the authorization header to each request.
// like a middleware.
AuthService.ProtectedClient.interceptors.request.use(
    AuthService.requestInterceptor
);

import axios, {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosInstance,
} from "axios";
import { Config } from "../config";
import { StorageService } from "./StorageService";

interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

class AuthService {
    publicClient: AxiosInstance;
    protectedClient: AxiosInstance;

    constructor() {
        this.protectedClient = axios.create({
            baseURL: Config.restApiBaseUrl,
        });

        this.publicClient = axios.create({
            baseURL: Config.restApiBaseUrl,
        });

        // add the interceptor.
        this.protectedClient.interceptors.response.use(
            (response) => response,
            this.rejectedInterceptor.bind(this)
        );

        // adds the authorization header to each request.
        // like a middleware.
        this.protectedClient.interceptors.request.use(
            this.requestInterceptor.bind(this)
        );
    }
    // the public client does not contain any request or response interceptors.
    // it can be used to login.

    private accessToken: string | null = null;

    private static refreshTokenStorageKey = "@auth/refreshToken";
    private static accessTokenStorageKey = "@auth/accessToken";

    refreshTokenRequest: Promise<AxiosResponse<TokenResponse>> | null = null;

    async loginUsingDeviceId(deviceId: string): Promise<void> {
        const token = await this.publicClient.post<TokenResponse>(
            "/auth/login",
            {
                type: "deviceId",
                deviceId,
            }
        );

        await this.handleSuccessfulToken(token.data);
    }

    async logout() {
        // destroy the tokens from the storage
        await Promise.all([
            StorageService.delete(AuthService.refreshTokenStorageKey),
            StorageService.delete(AuthService.accessTokenStorageKey),
        ]);
    }

    private async handleSuccessfulToken(token: TokenResponse) {
        await Promise.all([
            StorageService.save(
                AuthService.accessTokenStorageKey,
                token.accessToken
            ),
            StorageService.save(
                AuthService.refreshTokenStorageKey,
                token.refreshToken
            ),
        ]);
        this.accessToken = token.accessToken;
    }

    async refreshToken() {
        const token = await this.protectedClient.post<TokenResponse>(
            "/auth/refresh",
            {
                refreshToken: await StorageService.getValueFor(
                    AuthService.refreshTokenStorageKey
                ),
            }
        );

        return token;
    }

    private maybeRefreshToken() {
        if (this.refreshTokenRequest === null) {
            this.refreshTokenRequest = this.refreshToken();
        }
    }

    rejectedInterceptor(error: AxiosError) {
        if (error.response?.status === 401) {
            // if the requests was rejected with a 401 response, this means,
            // that the user is not authenticated or the token is expired.
            // lets try to refresh it.
            this.maybeRefreshToken();
            // just retry the request.
            // the execution will be blocked by the request interceptor which awaits
            // any ongoing refresh requests.
            return this.protectedClient.request(error.config);
        }
        return Promise.reject(error);
    }

    async requestInterceptor(config: AxiosRequestConfig) {
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

export const authService = new AuthService();

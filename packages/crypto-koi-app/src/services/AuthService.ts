import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from "axios";
import { Config } from "../config";
import log from "../utils/logger";
import { StorageService } from "./StorageService";

interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

class AuthService {
    publicClient: AxiosInstance;
    protectedClient: AxiosInstance;
    loadTokenPromise: Promise<unknown>;
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
        // load the tokens.
        this.loadTokenPromise = Promise.all([
            StorageService.getValueFor(AuthService.refreshTokenStorageKey),
            StorageService.getValueFor(AuthService.accessTokenStorageKey),
        ]).then(([refreshToken, accessToken]) => {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
        });
    }
    // the public client does not contain any request or response interceptors.
    // it can be used to login.

    private accessToken: string | null = null;
    private refreshToken: string | null = null;

    private static refreshTokenStorageKey = "_auth_refreshToken";
    private static accessTokenStorageKey = "_auth_accessToken";

    refreshTokenRequest: Promise<AxiosResponse<TokenResponse>> | null = null;

    async exchangeDeviceIdForToken(deviceId: string): Promise<boolean> {
        try {
            const token = await this.publicClient.post<TokenResponse>(
                "/auth/login",
                {
                    type: "deviceId",
                    deviceId,
                }
            );
            await this.handleSuccessfulToken(token.data);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     *
     * @returns A promise that resolves to the success state.
     */
    async tryToLoginUsingStoredCredentials(): Promise<boolean> {
        log.info("trying to login using stored credentials");
        // check if the tokens do exist.
        await this.loadTokenPromise;
        if (this.accessToken === null) {
            log.warn("no access token found");
            return false;
        }
        // they do exist.
        // check if they are still valid.
        // we can do this by just refreshing the access token.
        try {
            const token = await this.refreshAccessToken();
            await this.handleSuccessfulToken(token.data);
            return true;
        } catch (e) {
            return false;
        }
    }

    getAccessToken() {
        return this.accessToken;
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
        this.refreshToken = token.refreshToken;
    }

    private async refreshAccessToken() {
        const token = await this.protectedClient.post<TokenResponse>(
            "/auth/refresh",
            {
                refreshToken: this.refreshToken,
            }
        );

        return token;
    }

    private maybeRefreshToken() {
        if (this.refreshTokenRequest === null) {
            this.refreshTokenRequest = this.refreshAccessToken();
        }
    }

    private rejectedInterceptor(error: AxiosError) {
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

    private async requestInterceptor(config: AxiosRequestConfig) {
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

import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from "axios";
import { config } from "../config";
import log from "../utils/logger";
import { StorageService } from "./StorageService";

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

class AuthService {
    publicClient: AxiosInstance;
    protectedClient: AxiosInstance;
    loadTokenPromise: Promise<unknown>;
    constructor() {
        this.protectedClient = axios.create({
            baseURL: config.restApiBaseUrl,
            timeout: 10 * 1000,
        });

        this.publicClient = axios.create({
            baseURL: config.restApiBaseUrl,
            timeout: 10 * 1000,
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
    private static deviceIdStorageKey = "_auth_deviceId";

    refreshTokenRequest: Promise<AxiosResponse<TokenResponse>> | null = null;

    async exchangeWalletAddressForToken(
        walletAddress: string
    ): Promise<boolean> {
        try {
            log.info("trying to exchange device id for token");
            const token = await this.publicClient.post<TokenResponse>(
                "/auth/login",
                {
                    walletAddress,
                }
            );
            log.info("exchange successful. Storing token on device");
            await this.handleSuccessfulToken(token.data);
            return true;
        } catch (e) {
            log.error("exchange failed", e);
            return false;
        }
    }

    async exchangeDeviceIdForToken() {
        try {
            const deviceId = await StorageService.getValueFor(
                AuthService.deviceIdStorageKey
            );

            if (!deviceId) {
                // generate a new one.
                const deviceId =
                    Math.random().toString(36).substring(2, 15) +
                    Math.random().toString(36).substring(2, 15);
                await StorageService.save(
                    AuthService.deviceIdStorageKey,
                    deviceId
                );
            }
            log.info("trying to exchange device id for token");
            const token = await this.publicClient.post<TokenResponse>(
                "/auth/login",
                {
                    deviceId,
                }
            );
            log.info("exchange successful. Storing token on device");
            await this.handleSuccessfulToken(token.data);
            return true;
        } catch (e) {
            log.error("exchange failed", e);
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
            log.warn("no access token found. stopping login");
            return false;
        }
        // they do exist.
        // check if they are still valid.
        // we can do this by just refreshing the access token.
        try {
            const token = await this.refreshAccessToken();
            await this.handleSuccessfulToken(token.data);
            log.info(
                "login successful. Token stored on device for next session"
            );
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
            // do NOT delete the deviceId storage key.
            // StorageService.delete(AuthService.deviceIdStorageKey),
        ]);
    }

    async handleSuccessfulToken(token: TokenResponse) {
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

    async refreshAccessToken() {
        try {
            const token = await this.publicClient.post<TokenResponse>(
                "/auth/refresh",
                {
                    refreshToken: this.refreshToken,
                }
            );
            return token;
        } catch (e) {
            log.error("refresh access token failed", e);
            throw e;
        }
    }

    async destroyAccount() {
        try {
            await this.protectedClient.delete("/auth");
        } catch (e) {
            log.error("destroy account failed", e);
            throw e;
        }
    }

    private maybeRefreshToken() {
        if (this.refreshTokenRequest === null) {
            log.info("refreshing access token");
            this.refreshTokenRequest = this.refreshAccessToken();
        }
    }

    private rejectedInterceptor(error?: AxiosError) {
        if (!error || !error.config) {
            log.error(
                "no error passed to rejectedInterceptor: " +
                    JSON.stringify(error)
            );
            return Promise.reject(error);
        }
        log.warn(
            "request to url: " +
                error?.config?.url +
                " failed with status code: " +
                error?.response?.status
        );
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
            log.warn("waiting for refresh token request");
            try {
                await this.refreshTokenRequest;
                this.refreshTokenRequest = null;
            } catch (e) {
                log.error("refresh token request failed", e);
                this.refreshTokenRequest = null;
                return new axios.Cancel("refresh token failed");
            }
        }

        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${this.accessToken}`,
        };
        return config;
    }
}

export const authService = new AuthService();

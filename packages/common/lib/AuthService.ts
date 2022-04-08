import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios'
import { Logger } from './logger'
import { TokenStorage } from './TokenStorage'

export interface RegisterRequest {
    name: string
    email: string
    walletAddress?: string
    deviceId?: string
}

export interface TokenResponse {
    accessToken: string
    refreshToken: string
}

export class AuthService {
    publicClient: AxiosInstance
    protectedClient: AxiosInstance
    loadTokenPromise: Promise<unknown>
    constructor(
        protected tokenService: TokenStorage,
        restApiBaseUrl: string,
        protected logger: Logger
    ) {
        this.protectedClient = axios.create({
            baseURL: restApiBaseUrl,
            timeout: 10 * 1000,
        })

        this.publicClient = axios.create({
            baseURL: restApiBaseUrl,
            timeout: 10 * 1000,
        })

        // add the interceptor.
        this.protectedClient.interceptors.response.use(
            (response) => response,
            this.rejectedInterceptor.bind(this)
        )

        // adds the authorization header to each request.
        // like a middleware.
        this.protectedClient.interceptors.request.use(
            this.requestInterceptor.bind(this)
        )
        // load the tokens.
        this.loadTokenPromise = Promise.all([
            this.tokenService.getRefreshToken(),
            this.tokenService.getAccessToken(),
        ]).then(([refreshToken, accessToken]) => {
            this.accessToken = accessToken
            this.refreshToken = refreshToken
        })
    }
    // the public client does not contain any request or response interceptors.
    // it can be used to login.

    private accessToken: string | null = null
    private refreshToken: string | null = null

    static deviceIdStorageKey = '_auth_deviceId'

    refreshTokenRequest: Promise<AxiosResponse<TokenResponse>> | null = null

    async exchangeWalletAddressForToken(
        walletAddress: string
    ): Promise<boolean> {
        try {
            this.logger.info('trying to exchange device id for token')
            const token = await this.publicClient.post<TokenResponse>(
                '/auth/login',
                {
                    walletAddress,
                }
            )
            this.logger.info('exchange successful. Storing token on device')
            await this.handleSuccessfulToken(token.data)
            return true
        } catch (e: any) {
            this.logger.error('exchange failed', e)
            return false
        }
    }

    waitForTokenLoad() {
        return this.loadTokenPromise
    }

    async exchangeDeviceIdForToken() {
        try {
            let deviceId = await this.tokenService.getDeviceId()

            if (!deviceId) {
                // generate a new one.
                deviceId = await this.tokenService.generateDeviceId()
            }
            this.logger.info('trying to exchange device id for token')
            const token = await this.publicClient.post<TokenResponse>(
                '/auth/login',
                {
                    deviceId,
                }
            )
            this.logger.info('exchange successful. Storing token on device')
            await this.handleSuccessfulToken(token.data)
            return true
        } catch (e: any) {
            this.logger.error('exchange failed', e)
            return false
        }
    }

    /**
     *
     * @returns A promise that resolves to the success state.
     */
    async tryToLoginUsingStoredCredentials(): Promise<boolean> {
        this.logger.info('trying to login using stored credentials')
        // check if the tokens do exist.
        await this.loadTokenPromise
        if (this.accessToken === null) {
            this.logger.warn('no access token found. stopping login')
            return false
        }
        // they do exist.
        // check if they are still valid.
        // we can do this by just refreshing the access token.
        try {
            const token = await this.refreshAccessToken()
            await this.handleSuccessfulToken(token.data)
            this.logger.info(
                'login successful. Token stored on device for next session'
            )
            return true
        } catch (e) {
            return false
        }
    }

    async register(registerRequest: RegisterRequest) {
        this.logger.info('start register')
        // they do exist.
        // check if they are still valid.
        // we can do this by just refreshing the access token.
        try {
            const token = await this.publicClient.post(
                '/auth/register',
                registerRequest
            )
            await this.handleSuccessfulToken(token.data)
            this.logger.info(
                'register successful. Token stored on device for next session'
            )
            return true
        } catch (e) {
            return false
        }
    }

    getAccessToken() {
        return this.accessToken
    }

    async logout() {
        // destroy the tokens from the storage
        await this.tokenService.deleteTokens()
        // do NOT delete the deviceId storage key.
    }

    async handleSuccessfulToken(token: TokenResponse) {
        await Promise.all([
            this.tokenService.saveAccessToken(token.accessToken),
            this.tokenService.saveRefreshToken(token.refreshToken),
        ])
        this.accessToken = token.accessToken
        this.refreshToken = token.refreshToken
    }

    async refreshAccessToken() {
        try {
            const token = await this.publicClient.post<TokenResponse>(
                '/auth/refresh',
                {
                    refreshToken: this.refreshToken,
                }
            )
            return token
        } catch (e: any) {
            this.logger.error('refresh access token failed', e)
            throw e
        }
    }

    async destroyAccount() {
        try {
            await this.protectedClient.delete('/auth')
        } catch (e: any) {
            this.logger.error('destroy account failed', e)
            throw e
        }
    }

    private maybeRefreshToken() {
        if (this.refreshTokenRequest === null) {
            this.logger.info('refreshing access token')
            this.refreshTokenRequest = this.refreshAccessToken()
        }
    }

    private rejectedInterceptor(error?: AxiosError) {
        if (!error || !error.config) {
            this.logger.error(
                'no error passed to rejectedInterceptor: ' +
                    JSON.stringify(error)
            )
            return Promise.reject(error)
        }
        this.logger.warn(
            'request to url: ' +
                error?.config?.url +
                ' failed with status code: ' +
                error?.response?.status
        )
        if (error.response?.status === 401) {
            // if the requests was rejected with a 401 response, this means,
            // that the user is not authenticated or the token is expired.
            // lets try to refresh it.
            this.maybeRefreshToken()
            // just retry the request.
            // the execution will be blocked by the request interceptor which awaits
            // any ongoing refresh requests.
            return this.protectedClient.request(error.config)
        }
        return Promise.reject(error)
    }

    private async requestInterceptor(config: AxiosRequestConfig) {
        if (this.refreshTokenRequest !== null) {
            this.logger.warn('waiting for refresh token request')
            try {
                await this.refreshTokenRequest
                this.refreshTokenRequest = null
            } catch (e: any) {
                this.logger.error('refresh token request failed', e)
                this.refreshTokenRequest = null
                return new axios.Cancel('refresh token failed')
            }
        }

        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${this.accessToken}`,
        }
        return config
    }
}

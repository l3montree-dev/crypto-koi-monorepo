import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import {
    AuthService,
    RegisterRequest,
} from '@crypto-koi/common/lib/AuthService'
import { GET_SELF, GET_USER } from './graphql/queries/user'
import {
    GetUser,
    GetUserVariables,
} from './graphql/queries/__generated__/GetUser'
import { Self } from './graphql/queries/__generated__/Self'

export class UserService {
    constructor(
        protected authService: AuthService,
        protected apolloClient: ApolloClient<NormalizedCacheObject>
    ) {}
    /**
     * Executes side-effects. If the login is successful, it does update the authorization store.
     * @returns
     */
    async loginUsingWalletAddress(
        walletAddress: string
    ): Promise<GetUser['user'] | null> {
        const success = await this.authService.exchangeWalletAddressForToken(
            walletAddress
        )
        if (!success) {
            return null
        }

        return this.sync()
    }

    async registerUsingWalletAddress(registerRequest: RegisterRequest) {
        const success = await this.authService.register(registerRequest)
        if (!success) {
            return
        }
        return this.sync()
    }

    async registerUsingDeviceId(values: RegisterRequest) {
        const success = await this.authService.register(values)
        if (!success) {
            return
        }
        return this.sync()
    }

    /**
     * Executes side-effects. If the login is successful, it does update the authorization store.
     * @returns
     */
    async tryToLogin(): Promise<GetUser['user'] | null> {
        const success =
            await this.authService.tryToLoginUsingStoredCredentials()
        if (!success) {
            // try to login using the stored token
            const storedDeviceIdSuccess =
                await this.authService.exchangeDeviceIdForToken()
            if (storedDeviceIdSuccess) {
                return null
            }
        }

        return this.sync()
    }

    async logout(): Promise<void> {
        await this.authService.logout()
    }

    async sync() {
        const res = await this.apolloClient.query<Self>({
            query: GET_SELF,
            fetchPolicy: 'no-cache',
        })

        return res.data.self
    }

    async deleteAccount() {
        // makes an http call.
        await this.authService.destroyAccount()
        // just destroys the tokens.
        await this.authService.logout()
    }

    async findById(id: string) {
        const res = await this.apolloClient.query<GetUser, GetUserVariables>({
            query: GET_USER,
            variables: {
                id: id,
            },
        })

        return res.data.user
    }
}

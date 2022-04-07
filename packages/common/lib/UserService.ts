import { GET_USER } from '../../../apps/native/src/graphql/queries/user'
import { GetUser } from '../../../apps/native/src/graphql/queries/__generated__/GetUser'
import { rootStore } from '../../../apps/native/src/mobx/RootStore'
import {
    AuthService,
    RegisterRequest,
} from '@crypto-koi/common/lib/AuthService'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

export class UserService {
    constructor(
        protected authService: AuthService,
        protected apolloClient: ApolloClient<NormalizedCacheObject>
    ) {}
    /**
     * Executes side-effects. If the login is successful, it does update the authorization store.
     * @returns
     */
    async loginUsingWalletAddress(walletAddress: string): Promise<void> {
        const success = await this.authService.exchangeWalletAddressForToken(
            walletAddress
        )
        if (!success) {
            return
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

    async loginUsingDeviceId() {
        const success = await this.authService.exchangeDeviceIdForToken()
        if (!success) {
            return
        }
        return this.sync()
    }

    /**
     * Executes side-effects. If the login is successful, it does update the authorization store.
     * @returns
     */
    async tryToLogin(): Promise<void> {
        const success =
            await this.authService.tryToLoginUsingStoredCredentials()
        if (!success) return

        return this.sync()
    }

    async logout(): Promise<void> {
        await this.authService.logout()
        rootStore.authStore.setCurrentUser(null)
    }

    async sync() {
        const user = await this.apolloClient.query<GetUser>({
            query: GET_USER,
            fetchPolicy: 'no-cache',
        })
        rootStore.authStore.setCurrentUser(user.data.user)
    }

    async deleteAccount() {
        // makes an http call.
        await this.authService.destroyAccount()
        // just destroys the tokens.
        await this.authService.logout()
        rootStore.authStore.setCurrentUser(null)
    }
}

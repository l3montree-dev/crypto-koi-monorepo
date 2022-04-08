import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { apolloClientFactory } from '@crypto-koi/common/lib/ApolloClient'
import { AppEventEmitter } from '@crypto-koi/common/lib/AppEventEmitter'
import { AuthService } from '@crypto-koi/common/lib/AuthService'
import RootStore from '@crypto-koi/common/lib/mobx/RootStore'
import { TokenStorage } from '@crypto-koi/common/lib/TokenStorage'
import { UserService } from '@crypto-koi/common/lib/UserService'
import { config } from './config'

export interface ServiceLayer {
    userService: UserService
    appEventEmitter: AppEventEmitter
    authService: AuthService
    apolloClient: ApolloClient<NormalizedCacheObject>
}
export const buildServiceLayer = (tokenStorage: TokenStorage): ServiceLayer => {
    const appEventEmitter = new AppEventEmitter()

    const authService = new AuthService(tokenStorage, config.api, console)

    const apolloClient = apolloClientFactory(
        authService,
        config.graphqlBaseUrl,
        console
    )
    const userService = new UserService(authService, apolloClient)

    return {
        userService,
        appEventEmitter,
        authService,
        apolloClient,
    }
}

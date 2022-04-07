import RootStore from '@crypto-koi/common/lib/mobx/RootStore'
import { UserService } from '@crypto-koi/common/lib/UserService'
import { AppEventEmitter } from '@crypto-koi/common/lib/AppEventEmitter'
import { createContext, ReactNode } from 'react'
import { initStore } from '../mobx/store'
import { AuthService } from '@crypto-koi/common/lib/AuthService'
import { apolloClientFactory } from '@crypto-koi/common/lib/ApolloClient'
import { WebStorage } from '../WebStorage'
import { config } from '../config'
import { ApolloProvider } from '@apollo/client'

export interface WebContext {
    store: RootStore
    services: {
        userService: UserService
        appEventEmitter: AppEventEmitter
        authService: AuthService
    }
}

export let AppStateContext: React.Context<WebContext>
/**
 * Boot routine which provides support for server side rendering and client side rendering
 * It takes care of hydrating the state accordingly.
 * @param param0
 */
export const AppStateProvider = ({
    children,
    hydrationData,
}: {
    children: ReactNode
    hydrationData?: Parameters<typeof RootStore.prototype.hydrate>[0]
}) => {
    const rootStore = initStore(hydrationData)

    const appEventEmitter = new AppEventEmitter()

    const authService = new AuthService(new WebStorage(), config.api, console)

    const apolloClient = apolloClientFactory(
        authService,
        config.graphqlBaseUrl,
        console
    )
    const userService = new UserService(rootStore, authService, apolloClient)

    const webContext: WebContext = {
        store: rootStore,
        services: {
            userService,
            appEventEmitter,
            authService,
        },
    }

    // set the global variable - now the AppState can be accessed by child components.
    AppStateContext = createContext<WebContext>(webContext)
    return (
        <ApolloProvider client={apolloClient}>
            <AppStateContext.Provider value={webContext}>
                {children}
            </AppStateContext.Provider>
        </ApolloProvider>
    )
}

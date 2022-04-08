import { ApolloProvider } from '@apollo/client'
import RootStore, {
    HydrationState,
} from '@crypto-koi/common/lib/mobx/RootStore'
import { createContext, ReactNode } from 'react'
import { initStore } from '../mobx/store'
import { buildServiceLayer, ServiceLayer } from '../service-layer'
import { WebStorage } from '../WebTokenStorage'

export interface WebContext {
    store: RootStore
    services: ServiceLayer
}

export let AppStateContext: React.Context<WebContext>
/**
 * Boot routine which provides support for server side rendering and client side rendering
 * It takes care of hydrating the state accordingly.
 * @param param0
 */
export const AppStateProvider = ({
    children,
    hydrationState: hydrationData,
}: {
    children: ReactNode
    hydrationState?: HydrationState | null
}) => {
    const rootStore = initStore(hydrationData)
    const services = buildServiceLayer(new WebStorage())
    const webContext: WebContext = {
        store: rootStore,
        services: services,
    }

    // set the global variable - now the AppState can be accessed by child components.
    AppStateContext = createContext<WebContext>(webContext)
    return (
        <ApolloProvider client={services.apolloClient}>
            <AppStateContext.Provider value={webContext}>
                {children}
            </AppStateContext.Provider>
        </ApolloProvider>
    )
}

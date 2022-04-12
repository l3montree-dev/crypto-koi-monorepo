import { ApolloProvider } from '@apollo/client'
import RootStore, {
    HydrationState,
} from '@crypto-koi/common/lib/mobx/RootStore'
import { createContext, ReactNode, useContext } from 'react'
import { useInitStore as useInitStore } from '../mobx/store'
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
    console.log('Initializing AppState and service layer')
    const services = buildServiceLayer(new WebStorage())
    const rootStore = useInitStore(services, hydrationData)
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

export function useAppState(): RootStore
export function useAppState<T>(selectorFn: (store: RootStore) => T): T
export function useAppState<T = RootStore>(
    selectorFn?: (state: RootStore) => T
): T {
    const context = useContext(AppStateContext)
    if (!context) {
        throw new Error('useAppState must be used within a AppStateProvider')
    }
    if (selectorFn) {
        return selectorFn(context.store)
    }
    return context.store as unknown as T
}

// we need to enable static rendering for prevent rerender on server side and leaking memory
import AuthStore from '@crypto-koi/common/lib/mobx/AuthStore'
import RootStore, {
    HydrationState,
} from '@crypto-koi/common/lib/mobx/RootStore'
import ThemeStore from '@crypto-koi/common/lib/mobx/ThemeStore'
import { enableStaticRendering } from 'mobx-react-lite'
import { useEffect, useMemo } from 'react'
import { ServiceLayer } from '../service-layer'

// enable static rendering ONLY on server
enableStaticRendering(typeof window === 'undefined')

// init a client store that we will send to client (one store for client)
let clientStore: RootStore

export const useInitStore = (
    services: ServiceLayer,
    initData?: HydrationState | null
) => {
    // check if we already declare store (client Store), otherwise create one
    let store = useMemo(
        () => clientStore ?? new RootStore(new AuthStore(), new ThemeStore()),
        []
    )
    // hydrate to store if receive initial data
    if (initData) {
        store.hydrate(initData)
    }

    useEffect(() => {
        // check if we can hydrate the store client side - if the server did not send any initData.
        if (!initData && !clientStore) {
            // if we are on client side, we need to hydrate the store with the data from server
            // we can do this by calling the hydrate method on the store
            ;(async function () {
                store.hydrate(await services.userService.sync())
                // save the client store - on subsequent calls, the condition will return false and we are never hydrating
                // the store client side.
                clientStore = store
            })()
        }
    }, [initData, services.userService, store])

    return store
}

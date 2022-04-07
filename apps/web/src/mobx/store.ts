// we need to enable static rendering for prevent rerender on server side and leaking memory
import AuthStore from '@crypto-koi/common/lib/mobx/AuthStore'
import RootStore from '@crypto-koi/common/lib/mobx/RootStore'
import ThemeStore from '@crypto-koi/common/lib/mobx/ThemeStore'
import { enableStaticRendering } from 'mobx-react-lite'

// enable static rendering ONLY on server
enableStaticRendering(typeof window === 'undefined')

// init a client store that we will send to client (one store for client)
let clientStore: RootStore

export const initStore = (
    initData?: Parameters<typeof RootStore.prototype.hydrate>[0]
) => {
    // check if we already declare store (client Store), otherwise create one
    const store =
        clientStore ?? new RootStore(new AuthStore(), new ThemeStore())
    // hydrate to store if receive initial data
    if (initData) store.hydrate(initData)

    // Create a store on every server request
    if (typeof window === 'undefined') return store
    // Otherwise it's client, remember this store and return
    if (!clientStore) clientStore = store
    return store
}

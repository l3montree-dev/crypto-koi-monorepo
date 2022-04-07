import { makeAutoObservable } from 'mobx'
import AuthStore from './AuthStore'
import ThemeStore from './ThemeStore'

/**
 * The mobx root store of the application
 */
export default class RootStore {
    constructor(public authStore: AuthStore, public themeStore: ThemeStore) {
        makeAutoObservable(this)
    }

    hydrate(initialState: Parameters<typeof AuthStore.prototype.hydrate>[0]) {
        this.authStore.hydrate(initialState)
    }
}

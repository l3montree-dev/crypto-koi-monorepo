import { makeAutoObservable } from 'mobx'
import { GetUser } from '../graphql/queries/__generated__/GetUser'
import AuthStore from './AuthStore'
import ThemeStore from './ThemeStore'

export type HydrationState = GetUser['user']
/**
 * The mobx root store of the application
 */
export default class RootStore {
    public authStore: AuthStore

    public themeStore: ThemeStore

    constructor(authStore: AuthStore, themeStore: ThemeStore) {
        makeAutoObservable(this)
        this.authStore = authStore
        this.themeStore = themeStore
    }

    hydrate(initialState: HydrationState) {
        this.authStore.setCurrentUser(initialState)
    }
}

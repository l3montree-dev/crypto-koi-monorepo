import { makeAutoObservable } from "mobx";
import AuthStore from "./AuthStore";
import ThemeStore from "./ThemeStore";

/**
 * The mobx root store of the application
 */
export default class RootStore {
    authStore: AuthStore;
    themeStore: ThemeStore;

    constructor() {
        makeAutoObservable(this);
        this.authStore = new AuthStore();
        this.themeStore = new ThemeStore();
    }
}

// create a singleton instance.
export const rootStore = new RootStore();
export const authStore = rootStore.authStore;

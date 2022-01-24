import { makeAutoObservable } from "mobx";
import AuthStore from "./AuthStore";

/**
 * The mobx root store of the application
 */
export default class RootStore {
    authStore: AuthStore;
    constructor() {
        makeAutoObservable(this);
        this.authStore = new AuthStore();
    }
}

// create a singleton instance.
export const rootStore = new RootStore();
export const authStore = rootStore.authStore;

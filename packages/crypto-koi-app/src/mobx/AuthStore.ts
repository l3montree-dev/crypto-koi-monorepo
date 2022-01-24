import { makeAutoObservable } from "mobx";

/**
 * Handles authorization state.
 */
export default class AuthStore {
    constructor() {
        makeAutoObservable(this);
    }
}

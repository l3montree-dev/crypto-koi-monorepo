import { makeAutoObservable } from "mobx";
import User from "../graphql/models/User";

/**
 * Handles authorization state.
 */
export default class AuthStore {
    currentUser: User | null;
    constructor() {
        makeAutoObservable(this);
        this.currentUser = null;
    }
}

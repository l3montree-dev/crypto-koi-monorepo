import { makeAutoObservable } from "mobx";
import { GetUser } from "../graphql/queries/__generated__/GetUser";
import Cryptogotchi from "./Cryptogotchi";
import User from "./User";

/**
 * Handles authorization state.
 */
export default class AuthStore {
    currentUser: User | null;
    test = "";
    constructor() {
        makeAutoObservable(this);
        this.currentUser = null;
    }

    setCurrentUser(user: GetUser["user"] | null) {
        this.test = Math.random().toString();

        if (user) {
            this.currentUser = new User(
                user.id,
                user.walletAddress,
                user.deviceId,
                user.createdAt,
                user.cryptogotchies.map((cryptogotchi) => {
                    return new Cryptogotchi(cryptogotchi);
                })
            );
        } else {
            this.currentUser = null;
        }
    }
}

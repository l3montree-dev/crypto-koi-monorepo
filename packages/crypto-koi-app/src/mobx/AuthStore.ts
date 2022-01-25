import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { GetUser } from "../graphql/queries/__generated__/GetUser";
import log from "../utils/logger";
import Cryptogotchi from "./Cryptogotchi";
import User from "./User";

/**
 * Handles authorization state.
 */
export default class AuthStore {
    currentUser: User | null;
    test = "";
    constructor() {
        makeObservable(this, {
            currentUser: observable,
            setCurrentUser: action,
        });
        this.currentUser = null;
    }

    setCurrentUser(user: GetUser["user"] | null) {
        this.test = Math.random().toString();
        log.info("setting current user", user);
        if (user) {
            this.currentUser = new User(
                user.id,
                user.name,
                user.createdAt,
                user.cryptogotchies.map((cryptogotchi) => {
                    return new Cryptogotchi(
                        cryptogotchi.id,
                        cryptogotchi.isAlive,
                        cryptogotchi.name,
                        cryptogotchi.affection,
                        cryptogotchi.food,
                        cryptogotchi.tokenId,
                        cryptogotchi.createdAt,
                        [],
                        [],
                        user.id
                    );
                })
            );
        } else {
            this.currentUser = null;
        }
    }
}

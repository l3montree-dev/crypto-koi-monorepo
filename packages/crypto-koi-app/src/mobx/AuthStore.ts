import { makeAutoObservable } from "mobx";
import moment from "moment";
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
                user.name,
                user.createdAt,
                user.cryptogotchies.map((cryptogotchi) => {
                    return new Cryptogotchi(
                        cryptogotchi.id,
                        cryptogotchi.isAlive,
                        cryptogotchi.name,
                        cryptogotchi.food,
                        cryptogotchi.fun,
                        cryptogotchi.affection,
                        cryptogotchi.tokenId,
                        moment(cryptogotchi.createdAt),
                        [],
                        [],
                        user.id,
                        cryptogotchi.foodDrain,
                        cryptogotchi.funDrain,
                        cryptogotchi.affectionDrain,
                        cryptogotchi.deathDate !== null
                            ? moment(cryptogotchi.deathDate)
                            : null
                    );
                })
            );
        } else {
            this.currentUser = null;
        }
    }
}

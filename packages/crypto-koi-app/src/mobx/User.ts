import { makeAutoObservable } from "mobx";
import moment, { Moment } from "moment";
import Cryptogotchi from "./Cryptogotchi";

export default class User {
    public createdAt: Moment;
    constructor(
        public id: string,
        public walletAddress: string,
        createdAt: string,
        public cryptogotchies: Cryptogotchi[]
    ) {
        makeAutoObservable(this);

        this.createdAt = moment(createdAt);
    }
}

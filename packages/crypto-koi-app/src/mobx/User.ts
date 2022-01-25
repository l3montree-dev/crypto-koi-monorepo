import { makeAutoObservable } from "mobx";
import moment, { Moment } from "moment";
import Cryptogotchi from "./Cryptogotchi";

export default class User {
    public createdAt: Moment;
    constructor(
        public id: string,
        public name: string | null,
        createdAt: string,
        public cryptogotchies: Cryptogotchi[]
    ) {
        makeAutoObservable(this);

        this.createdAt = moment(createdAt);
    }
}

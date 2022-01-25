import { makeAutoObservable } from "mobx";

export default class Event {
    constructor(
        public id: string,
        public type: string,
        public payload: Record<string, unknown>,
        public createdAt: Date
    ) {
        makeAutoObservable(this);
    }
}

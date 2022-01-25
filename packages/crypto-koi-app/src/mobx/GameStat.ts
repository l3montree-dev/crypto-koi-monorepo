import { makeAutoObservable } from "mobx";

export default class GameStat {
    constructor(
        public id: string,
        public type: string,
        public score: number | undefined,
        public cryptogotchiId: string,
        public gameFinished: Date | undefined,
        public createdAt: Date
    ) {
        makeAutoObservable(this);
    }
}

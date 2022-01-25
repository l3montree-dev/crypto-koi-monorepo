import { makeAutoObservable } from "mobx";
import GameStat from "./GameStat";
import Event from "./Event";

export default class Cryptogotchi {
    constructor(
        public id: string,
        public isAlive: boolean,
        public name: string | null,
        public affection: number,
        public food: number,
        public tokenId: string | null,
        public createdAt: Date,
        public gameStats: GameStat[],
        public events: Event[],
        public ownerId: string
    ) {
        makeAutoObservable(this);
    }
}

import { makeAutoObservable } from "mobx";
import GameStat from "./GameStat";
import Event from "./Event";
import moment, { Moment } from "moment";
import TimeUtils from "../utils/TimeUtils";

export default class Cryptogotchi {
    constructor(
        public id: string,
        public isAlive: boolean,
        public name: string | null,
        public food: number,
        public fun: number,
        public affection: number,
        public tokenId: string | null,
        public createdAt: Moment,
        public gameStats: GameStat[],
        public events: Event[],
        public ownerId: string,
        public foodDrain: number,
        public funDrain: number,
        public affectionDrain: number,
        public deathDate: Moment | null
    ) {
        makeAutoObservable(this);
    }

    setName(name: string | undefined | null) {
        if (!name) {
            return;
        }
        this.name = name;
    }

    get foodEmptyDate(): Moment {
        // the drain variables indicates the loss per minute.
        // this way we can just calculate the time till the variable will equal null
        const minutesLeft = Math.max(0, this.food / this.foodDrain);

        return moment().add(minutesLeft, "minutes");
    }

    get funEmptyDate(): Moment {
        // the drain variables indicates the loss per minute.
        // this way we can just calculate the time till the variable will equal null
        const minutesLeft = Math.max(this.fun / this.funDrain, 0);
        return moment().add(minutesLeft, "minutes");
    }

    get affectionEmptyDate(): Moment {
        // the drain variables indicates the loss per minute.
        // this way we can just calculate the time till the variable will equal null
        const minutesLeft = Math.max(this.affection / this.affectionDrain, 0);
        return moment().add(minutesLeft, "minutes");
    }

    get getBase64Uuid(): string {
        const hex = this.id.replace(/-/g, "");
        return Buffer.from(hex, "hex").toString("base64");
    }

    get deathDateString(): string | undefined {
        if (!this.deathDate) {
            return undefined;
        }

        return TimeUtils.getTimeString(this.deathDate, this.createdAt);
    }
}

import { makeAutoObservable } from "mobx";
import GameStat from "./GameStat";
import Event from "./Event";
import moment, { Moment } from "moment";
import TimeUtils from "../utils/TimeUtils";
import { ClientCryptogotchi } from "../graphql/queries/__generated__/ClientCryptogotchi";

export default class Cryptogotchi {
    public id: string;
    public isAlive: boolean;
    public name: string | null;
    public food: number;
    public tokenId: string | null;
    public createdAt: Moment;
    public ownerId: string;
    public gameStats: GameStat[] = [];
    public events: Event[] = [];
    public minutesTillDeath: number;
    public deathDate: Moment | null;
    public nextFeeding: Moment;
    public snapshotValid: Moment;
    public maxLifetimeMinutes: number;
    constructor(fragment: ClientCryptogotchi) {
        makeAutoObservable(this);

        // duplicate...
        this.id = fragment.id;
        this.isAlive = fragment.isAlive;
        this.name = fragment.name;
        this.food = fragment.food;
        this.tokenId = fragment.tokenId;
        this.createdAt = moment(fragment.createdAt);
        // this.gameStats = fragment.gameStats.map(gs => new GameStat(gs))
        // this.events = fragment.events.map(e => new Event(e))
        this.minutesTillDeath = fragment.minutesTillDeath;
        this.deathDate = fragment.deathDate ? moment(fragment.deathDate) : null;
        this.nextFeeding = moment(fragment.nextFeeding);
        this.snapshotValid = moment(fragment.snapshotValid);
        this.maxLifetimeMinutes = fragment.maxLifetimeMinutes;
        this.ownerId = fragment.ownerId;
    }

    setFromFragment(fragment: ClientCryptogotchi) {
        this.id = fragment.id;
        this.isAlive = fragment.isAlive;
        this.name = fragment.name;
        this.food = fragment.food;
        this.tokenId = fragment.tokenId;
        this.createdAt = moment(fragment.createdAt);
        // this.gameStats = fragment.gameStats.map(gs => new GameStat(gs))
        // this.events = fragment.events.map(e => new Event(e))
        this.minutesTillDeath = fragment.minutesTillDeath;
        this.deathDate = fragment.deathDate ? moment(fragment.deathDate) : null;
        this.nextFeeding = moment(fragment.nextFeeding);
        this.snapshotValid = moment(fragment.snapshotValid);
        this.maxLifetimeMinutes = fragment.maxLifetimeMinutes;
        this.ownerId = fragment.ownerId;
    }

    setName(name: string | undefined | null) {
        if (!name) {
            return;
        }
        this.name = name;
    }

    get foodEmptyDate(): Moment {
        return moment().add(this.minutesTillDeath, "minutes");
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

import { makeAutoObservable } from "mobx";
import moment, { Moment } from "moment";
import { ClientCryptogotchi } from "../graphql/queries/__generated__/ClientCryptogotchi";
import TimeUtils from "../utils/TimeUtils";
import Transformer from "../utils/Transformer";
import Event from "./Event";
import GameStat from "./GameStat";

export default class Cryptogotchi {
    public id!: string;
    public isAlive!: boolean;
    public name!: string | null;
    public food!: number;
    public createdAt!: Moment;
    public ownerId!: string;
    public gameStats: GameStat[] = [];
    public events: Event[] = [];
    public minutesTillDeath!: number;
    public deathDate!: Moment | null;
    public nextFeeding!: Moment;
    public snapshotValid!: Moment;
    public maxLifetimeMinutes!: number;
    public color!: string;
    public isValidNft!: boolean;
    constructor(fragment: ClientCryptogotchi) {
        makeAutoObservable(this);
        this.setFromFragment(fragment);
    }

    setFromFragment(fragment: ClientCryptogotchi) {
        Object.assign(this, fragment);
        this.createdAt = moment(fragment.createdAt);
        this.deathDate = fragment.deathDate ? moment(fragment.deathDate) : null;
        this.nextFeeding = moment(fragment.nextFeeding);
        this.snapshotValid = moment(fragment.snapshotValid);
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
        return Transformer.uuidToBase64(this.id);
    }

    get deathDateString(): string | undefined {
        if (!this.deathDate) {
            return undefined;
        }

        return TimeUtils.getTimeString(this.deathDate, this.createdAt);
    }
}

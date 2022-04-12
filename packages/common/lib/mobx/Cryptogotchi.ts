import { makeAutoObservable } from 'mobx'
import moment, { Moment } from 'moment'
import { ClientCryptogotchi } from '../graphql/queries/__generated__/ClientCryptogotchi'
import TimeUtils from '../TimeUtils'
import Transformer from '../Transformer'
import Event from './Event'
import GameStat from './GameStat'

export default class Cryptogotchi {
    public id: string = ''
    public isAlive!: boolean
    public name: string | null = null
    public food: number = 0
    public _createdAt: string = ''
    public ownerAddress: string = ''
    public ownerId: string = ''
    public gameStats: GameStat[] = []
    public events: Event[] = []
    public minutesTillDeath: number = 0
    public _deathDate: string | null = null
    public _nextFeeding: string = ''
    public _snapshotValid: string = ''
    public maxLifetimeMinutes: number = 0
    public color: string = '#000000'
    public rank: number = -1
    public isValidNft: boolean = false

    public attributes!: ClientCryptogotchi['attributes']

    constructor(fragment: ClientCryptogotchi) {
        makeAutoObservable(this)
        this.setFromFragment(fragment)
    }

    setFromFragment(fragment: ClientCryptogotchi) {
        const { createdAt, deathDate, nextFeeding, snapshotValid, ...rest } =
            fragment
        Object.assign(this, rest)
        this._createdAt = createdAt
        this._deathDate = deathDate
        this._nextFeeding = nextFeeding
        this._snapshotValid = snapshotValid
    }

    get createdAt(): Moment {
        return moment(this._createdAt)
    }

    get deathDate(): Moment | null {
        return this._deathDate === null ? null : moment(this._deathDate)
    }

    get nextFeeding(): Moment {
        return moment(this._nextFeeding)
    }

    get snapshotValid(): Moment {
        return moment(this._snapshotValid)
    }

    setName(name: string | undefined | null) {
        if (!name) {
            return
        }
        this.name = name
    }

    get foodEmptyDate(): Moment {
        return moment().add(this.minutesTillDeath, 'minutes')
    }

    get getUint256(): string {
        return Transformer.uuidToUint256(this.id)
    }

    get deathDateString(): string | undefined {
        if (!this.deathDate) {
            return undefined
        }

        return TimeUtils.getTimeString(this.deathDate, this.createdAt)
    }
}

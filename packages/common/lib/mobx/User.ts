import { makeAutoObservable } from 'mobx'
import moment, { Moment } from 'moment'
import Cryptogotchi from './Cryptogotchi'

export default class User {
    _createdAt: string = ''

    public cryptogotchies: Cryptogotchi[] = []

    constructor(
        public id: string,
        public name: string,
        public walletAddress: string | null,
        public deviceId: string | null,
        createdAt: string,
        cryptogotchies: Cryptogotchi[]
    ) {
        makeAutoObservable(this)
        this.cryptogotchies = cryptogotchies
        this._createdAt = createdAt
    }

    get createdAt(): Moment {
        return moment(this._createdAt)
    }
}

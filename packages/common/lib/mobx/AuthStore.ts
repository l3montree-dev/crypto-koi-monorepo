import { makeAutoObservable } from 'mobx'
import { GetUser } from '../graphql/queries/__generated__/GetUser'
import Cryptogotchi from './Cryptogotchi'
import User from './User'

/**
 * Handles authorization state.
 */
export default class AuthStore {
    currentUser: User | null

    constructor() {
        makeAutoObservable(this)
        this.currentUser = null
    }

    hydrate(initialState: GetUser['user'] | null) {
        this.setCurrentUser(initialState)
    }

    setCurrentUser(user: GetUser['user'] | null) {
        if (user) {
            this.currentUser = new User(
                user.id,
                user.walletAddress,
                user.deviceId,
                user.createdAt,
                user.cryptogotchies.map((cryptogotchi) => {
                    return new Cryptogotchi(cryptogotchi)
                })
            )
        } else {
            this.currentUser = null
        }
    }
}

import { gql } from '@apollo/client'
import { CLIENT_CRYPTOGOTCHI_FRAGMENT } from './fragments'

export const GET_USER = gql`
    ${CLIENT_CRYPTOGOTCHI_FRAGMENT}
    query GetUser($id: ID!) {
        user(id: $id) {
            id
            walletAddress
            deviceId
            createdAt
            name
            cryptogotchies {
                ...ClientCryptogotchi
            }
        }
    }
`

export const GET_SELF = gql`
    ${CLIENT_CRYPTOGOTCHI_FRAGMENT}
    query Self {
        self {
            id
            walletAddress
            deviceId
            createdAt
            name
            cryptogotchies {
                ...ClientCryptogotchi
            }
        }
    }
`

export const CONNECT_WALLET_MUTATION = gql`
    mutation ConnectWallet($walletAddress: String!) {
        connectWallet(walletAddress: $walletAddress) {
            id
        }
    }
`

export const ACCEPT_PUSH_NOTIFICATIONS = gql`
    mutation AcceptPushNotifications($pushNotificationToken: String!) {
        acceptPushNotifications(pushNotificationToken: $pushNotificationToken) {
            id
        }
    }
`

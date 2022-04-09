import { gql } from '@apollo/client'
import {
    CLIENT_CRYPTOGOTCHI_FRAGMENT,
    CLIENT_EVENT_FRAGMENT,
    CLIENT_NFT_DATA,
} from './fragments'

export const CHANGE_NAME_OF_CRYPTOGOTCHI_MUTATION = gql`
    ${CLIENT_CRYPTOGOTCHI_FRAGMENT}
    mutation ChangeCryptogotchiName($id: ID!, $name: String!) {
        changeCryptogotchiName(id: $id, newName: $name) {
            ...ClientCryptogotchi
        }
    }
`

export const CREATE_CRYPTOGOTCHI_MUTATION = gql`
    ${CLIENT_NFT_DATA}
    mutation CreateCryptogotchi($walletAddress: String!) {
        createCryptogotchi(walletAddress: $walletAddress) {
            ...ClientNftData
        }
    }
`

export const GET_NFT_SIGNATURE = gql`
    ${CLIENT_NFT_DATA}
    mutation GetNftSignature($id: ID!, $address: String!) {
        getNftSignature(id: $id, address: $address) {
            ...ClientNftData
        }
    }
`

export const FEED_CRYPTOGOTCHI_MUTATION = gql`
    ${CLIENT_CRYPTOGOTCHI_FRAGMENT}
    mutation Feed($id: ID!) {
        feed(cryptogotchiId: $id) {
            ...ClientCryptogotchi
        }
    }
`

export const FIND_CRYPTOGOTCHI = gql`
    ${CLIENT_CRYPTOGOTCHI_FRAGMENT}
    query FindCryptogotchi($id: ID!) {
        cryptogotchi(cryptogotchiId: $id) {
            ...ClientCryptogotchi
        }
    }
`

export const FETCH_EVENTS = gql`
    ${CLIENT_EVENT_FRAGMENT}
    query FetchEvents($id: ID!, $offset: Int!, $limit: Int!) {
        events(cryptogotchiId: $id, offset: $offset, limit: $limit) {
            ...ClientEvent
        }
    }
`

export const FETCH_LEADERBOARD = gql`
    ${CLIENT_CRYPTOGOTCHI_FRAGMENT}
    query FetchLeaderBoard($offset: Int!, $limit: Int!) {
        leaderboard(offset: $offset, limit: $limit) {
            ...ClientCryptogotchi
        }
    }
`

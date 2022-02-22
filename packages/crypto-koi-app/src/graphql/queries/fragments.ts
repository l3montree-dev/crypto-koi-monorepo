import { gql } from "@apollo/client";

export const CLIENT_CRYPTOGOTCHI_FRAGMENT = gql`
    fragment ClientCryptogotchi on Cryptogotchi {
        id
        isAlive
        name
        food
        createdAt
        minutesTillDeath
        maxLifetimeMinutes
        ownerId
        deathDate
        nextFeeding
        snapshotValid
        isValidNft
        color
    }
`;

export const CLIENT_EVENT_FRAGMENT = gql`
    fragment ClientEvent on Event {
        id
        type
        payload
        createdAt
    }
`;

export const CLIENT_NFT_DATA = gql`
    fragment ClientNftData on NftData {
        signature
        address
        tokenId
    }
`;

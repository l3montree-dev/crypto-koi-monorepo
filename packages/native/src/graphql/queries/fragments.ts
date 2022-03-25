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
        ownerAddress
        deathDate
        nextFeeding
        snapshotValid
        isValidNft
        rank
        ownerId
        color
        attributes {
            primaryColor
            bodyColor
            finColor
            patternQuantity
            species
            birthday
        }
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

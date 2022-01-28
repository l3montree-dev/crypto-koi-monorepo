import { gql } from "@apollo/client";

export const CLIENT_CRYPTOGOTCHI_FRAGMENT = gql`
    fragment ClientCryptogotchi on Cryptogotchi {
        id
        isAlive
        name
        food
        tokenId
        createdAt
        minutesTillDeath
        maxLifetimeMinutes
        deathDate
        nextFeeding
        snapshotValid
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

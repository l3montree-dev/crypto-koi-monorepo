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
        deathDate
        nextFeeding
    }
`;

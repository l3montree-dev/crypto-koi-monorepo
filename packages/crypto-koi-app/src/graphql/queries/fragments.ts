import { gql } from "@apollo/client";

export const CLIENT_CRYPTOGOTCHI_FRAGMENT = gql`
    fragment ClientCryptogotchi on Cryptogotchi {
        id
        isAlive
        name
        affection
        fun
        food
        tokenId
        createdAt
        foodDrain
        funDrain
        affectionDrain
        deathDate
    }
`;

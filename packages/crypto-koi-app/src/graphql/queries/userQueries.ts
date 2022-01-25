import { gql } from "@apollo/client";

export const GET_USER = gql`
    query GetUser {
        user {
            id
            createdAt
            name

            cryptogotchies {
                id
                isAlive
                name
                affection
                fun
                food
                tokenId
                createdAt
            }
        }
    }
`;

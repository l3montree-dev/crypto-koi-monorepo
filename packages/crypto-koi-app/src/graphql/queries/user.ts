import { gql } from "@apollo/client";
import { CLIENT_CRYPTOGOTCHI_FRAGMENT } from "./fragments";

export const GET_USER = gql`
    ${CLIENT_CRYPTOGOTCHI_FRAGMENT}
    query GetUser {
        user {
            id
            walletAddress
            createdAt
            cryptogotchies {
                ...ClientCryptogotchi
            }
        }
    }
`;

import { gql } from "@apollo/client";
import { CLIENT_CRYPTOGOTCHI_FRAGMENT } from "./fragments";

export const GET_USER = gql`
    ${CLIENT_CRYPTOGOTCHI_FRAGMENT}
    query GetUser {
        user {
            id
            walletAddress
            deviceId
            createdAt
            cryptogotchies {
                ...ClientCryptogotchi
            }
        }
    }
`;

export const CONNECT_WALLET_MUTATION = gql`
    mutation ConnectWallet($walletAddress: String!) {
        connectWallet(walletAddress: $walletAddress) {
            id
        }
    }
`;

export const ACCEPT_PUSH_NOTIFICATIONS = gql`
    mutation AcceptPushNotifications($pushNotificationToken: String!) {
        acceptPushNotifications(pushNotificationToken: $pushNotificationToken) {
            id
        }
    }
`;

import { gql } from "@apollo/client";
import { CLIENT_CRYPTOGOTCHI_FRAGMENT } from "./fragments";

export const CHANGE_NAME_OF_CRYPTOGOTCHI_MUTATION = gql`
    ${CLIENT_CRYPTOGOTCHI_FRAGMENT}
    mutation ChangeCryptogotchiName($id: ID!, $name: String!) {
        changeCryptogotchiName(id: $id, newName: $name) {
            ...ClientCryptogotchi
        }
    }
`;

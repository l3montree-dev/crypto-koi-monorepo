/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUser
// ====================================================

export interface GetUser_user_cryptogotchies {
  __typename: "Cryptogotchi";
  name: string;
}

export interface GetUser_user {
  __typename: "User";
  id: string;
  name: string;
  cryptogotchies: (GetUser_user_cryptogotchies | null)[] | null;
}

export interface GetUser {
  user: GetUser_user;
}

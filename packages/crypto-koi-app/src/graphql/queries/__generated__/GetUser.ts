/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUser
// ====================================================

export interface GetUser_user_cryptogotchies {
  __typename: "Cryptogotchi";
  id: string;
  isAlive: boolean;
  name: string | null;
  food: number;
  tokenId: string | null;
  createdAt: any;
  minutesTillDeath: number;
  deathDate: any | null;
  nextFeeding: any;
}

export interface GetUser_user {
  __typename: "User";
  id: string;
  createdAt: any;
  name: string | null;
  cryptogotchies: GetUser_user_cryptogotchies[];
}

export interface GetUser {
  user: GetUser_user;
}

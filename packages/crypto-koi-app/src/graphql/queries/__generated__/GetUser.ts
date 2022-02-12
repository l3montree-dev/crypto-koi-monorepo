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
  createdAt: any;
  minutesTillDeath: number;
  maxLifetimeMinutes: number;
  ownerId: string;
  deathDate: any | null;
  nextFeeding: any;
  snapshotValid: any;
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

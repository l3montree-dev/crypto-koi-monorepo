/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_user_cryptogotchies_attributes {
  __typename: "CryptogotchiAttributes";
  primaryColor: string;
  bodyColor: string;
  finColor: string;
  patternQuantity: number;
  species: string;
  birthday: number;
}

export interface User_user_cryptogotchies {
  __typename: "Cryptogotchi";
  id: string;
  isAlive: boolean;
  name: string | null;
  food: number;
  createdAt: any;
  minutesTillDeath: number;
  maxLifetimeMinutes: number;
  ownerAddress: string | null;
  deathDate: any | null;
  nextFeeding: any;
  snapshotValid: any;
  isValidNft: boolean;
  rank: number;
  ownerId: string;
  color: string;
  attributes: User_user_cryptogotchies_attributes;
}

export interface User_user {
  __typename: "User";
  id: string;
  walletAddress: string | null;
  deviceId: string | null;
  createdAt: any;
  cryptogotchies: User_user_cryptogotchies[];
}

export interface User {
  user: User_user | null;
}

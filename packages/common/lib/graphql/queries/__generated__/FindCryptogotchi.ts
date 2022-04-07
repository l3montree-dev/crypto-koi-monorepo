/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FindCryptogotchi
// ====================================================

export interface FindCryptogotchi_cryptogotchi_attributes {
  __typename: "CryptogotchiAttributes";
  primaryColor: string;
  bodyColor: string;
  finColor: string;
  patternQuantity: number;
  species: string;
  birthday: number;
}

export interface FindCryptogotchi_cryptogotchi {
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
  attributes: FindCryptogotchi_cryptogotchi_attributes;
}

export interface FindCryptogotchi {
  cryptogotchi: FindCryptogotchi_cryptogotchi | null;
}

export interface FindCryptogotchiVariables {
  id: string;
}

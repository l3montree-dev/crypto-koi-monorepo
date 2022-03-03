/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCryptogotchi
// ====================================================

export interface CreateCryptogotchi_createCryptogotchi_attributes {
  __typename: "CryptogotchiAttributes";
  primaryColor: string;
  bodyColor: string;
  finColor: string;
  patternQuantity: number;
  species: string;
  birthday: number;
}

export interface CreateCryptogotchi_createCryptogotchi {
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
  color: string;
  attributes: CreateCryptogotchi_createCryptogotchi_attributes;
}

export interface CreateCryptogotchi {
  createCryptogotchi: CreateCryptogotchi_createCryptogotchi;
}

export interface CreateCryptogotchiVariables {
  _?: string | null;
}

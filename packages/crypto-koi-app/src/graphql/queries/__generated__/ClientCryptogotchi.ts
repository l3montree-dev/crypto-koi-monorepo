/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ClientCryptogotchi
// ====================================================

export interface ClientCryptogotchi_attributes {
  __typename: "CryptogotchiAttributes";
  primaryColor: string;
  bodyColor: string;
  finColor: string;
  patternQuantity: number;
  species: string;
  birthday: number;
}

export interface ClientCryptogotchi {
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
  attributes: ClientCryptogotchi_attributes;
}

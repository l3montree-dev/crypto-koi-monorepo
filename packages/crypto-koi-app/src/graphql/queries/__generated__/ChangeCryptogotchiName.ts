/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangeCryptogotchiName
// ====================================================

export interface ChangeCryptogotchiName_changeCryptogotchiName_attributes {
  __typename: "CryptogotchiAttributes";
  primaryColor: string;
  bodyColor: string;
  finColor: string;
  patternQuantity: number;
  species: string;
  birthday: number;
}

export interface ChangeCryptogotchiName_changeCryptogotchiName {
  __typename: "Cryptogotchi";
  id: string;
  isAlive: boolean;
  name: string | null;
  food: number;
  createdAt: any;
  minutesTillDeath: number;
  maxLifetimeMinutes: number;
  ownerAddress: string;
  deathDate: any | null;
  nextFeeding: any;
  snapshotValid: any;
  isValidNft: boolean;
  rank: number;
  color: string;
  attributes: ChangeCryptogotchiName_changeCryptogotchiName_attributes;
}

export interface ChangeCryptogotchiName {
  changeCryptogotchiName: ChangeCryptogotchiName_changeCryptogotchiName;
}

export interface ChangeCryptogotchiNameVariables {
  id: string;
  name: string;
}

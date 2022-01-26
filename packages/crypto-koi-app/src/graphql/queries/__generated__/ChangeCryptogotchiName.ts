/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangeCryptogotchiName
// ====================================================

export interface ChangeCryptogotchiName_changeCryptogotchiName {
  __typename: "Cryptogotchi";
  id: string;
  isAlive: boolean;
  name: string | null;
  food: number;
  tokenId: string | null;
  createdAt: any;
  minutesTillDeath: number;
  maxLifetimeMinutes: number;
  deathDate: any | null;
  nextFeeding: any;
}

export interface ChangeCryptogotchiName {
  changeCryptogotchiName: ChangeCryptogotchiName_changeCryptogotchiName;
}

export interface ChangeCryptogotchiNameVariables {
  id: string;
  name: string;
}

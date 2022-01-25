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
  affection: number;
  fun: number;
  food: number;
  tokenId: string | null;
  createdAt: any;
  foodDrain: number;
  funDrain: number;
  affectionDrain: number;
  deathDate: any | null;
}

export interface ChangeCryptogotchiName {
  changeCryptogotchiName: ChangeCryptogotchiName_changeCryptogotchiName;
}

export interface ChangeCryptogotchiNameVariables {
  id: string;
  name: string;
}

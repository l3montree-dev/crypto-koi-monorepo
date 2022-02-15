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
  createdAt: any;
  minutesTillDeath: number;
  maxLifetimeMinutes: number;
  ownerId: string;
  deathDate: any | null;
  nextFeeding: any;
  snapshotValid: any;
  color: string;
}

export interface ChangeCryptogotchiName {
  changeCryptogotchiName: ChangeCryptogotchiName_changeCryptogotchiName;
}

export interface ChangeCryptogotchiNameVariables {
  id: string;
  name: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FindCryptogotchi
// ====================================================

export interface FindCryptogotchi_cryptogotchi {
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

export interface FindCryptogotchi {
  cryptogotchi: FindCryptogotchi_cryptogotchi | null;
}

export interface FindCryptogotchiVariables {
  id: string;
}

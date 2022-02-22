/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ClientCryptogotchi
// ====================================================

export interface ClientCryptogotchi {
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
  isValidNft: boolean;
  color: string;
}

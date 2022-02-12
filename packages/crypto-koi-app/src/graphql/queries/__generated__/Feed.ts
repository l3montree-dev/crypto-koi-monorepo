/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Feed
// ====================================================

export interface Feed_feed {
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

export interface Feed {
  feed: Feed_feed;
}

export interface FeedVariables {
  id: string;
}

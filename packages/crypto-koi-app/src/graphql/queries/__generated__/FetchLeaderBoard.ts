/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchLeaderBoard
// ====================================================

export interface FetchLeaderBoard_leaderboard {
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
  color: string;
}

export interface FetchLeaderBoard {
  leaderboard: FetchLeaderBoard_leaderboard[];
}

export interface FetchLeaderBoardVariables {
  offset: number;
  limit: number;
}

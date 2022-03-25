/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCryptogotchi
// ====================================================

export interface CreateCryptogotchi_createCryptogotchi {
  __typename: "NftData";
  signature: string;
  address: string;
  tokenId: string;
}

export interface CreateCryptogotchi {
  createCryptogotchi: CreateCryptogotchi_createCryptogotchi;
}

export interface CreateCryptogotchiVariables {
  walletAddress: string;
}

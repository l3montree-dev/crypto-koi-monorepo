/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GetNftSignature
// ====================================================

export interface GetNftSignature_getNftSignature {
  __typename: "NftData";
  signature: string;
  address: string;
  tokenId: string;
}

export interface GetNftSignature {
  getNftSignature: GetNftSignature_getNftSignature;
}

export interface GetNftSignatureVariables {
  id: string;
  address: string;
}

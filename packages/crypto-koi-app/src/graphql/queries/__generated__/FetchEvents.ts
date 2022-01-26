/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchEvents
// ====================================================

export interface FetchEvents_events {
  __typename: "Event";
  id: string;
  type: string;
  payload: number;
  createdAt: any;
}

export interface FetchEvents {
  events: FetchEvents_events[];
}

export interface FetchEventsVariables {
  id: string;
  offset: number;
  limit: number;
}

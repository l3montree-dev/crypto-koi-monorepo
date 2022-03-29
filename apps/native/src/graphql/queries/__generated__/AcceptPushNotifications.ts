/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AcceptPushNotifications
// ====================================================

export interface AcceptPushNotifications_acceptPushNotifications {
  __typename: "User";
  id: string;
}

export interface AcceptPushNotifications {
  acceptPushNotifications: AcceptPushNotifications_acceptPushNotifications;
}

export interface AcceptPushNotificationsVariables {
  pushNotificationToken: string;
}

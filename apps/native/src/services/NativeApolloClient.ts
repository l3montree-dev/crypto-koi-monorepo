import { apolloClientFactory } from "@crypto-koi/common/lib/ApolloClient";
import { config } from "../config";
import log from "../utils/logger";
import nativeAuthService from "./NativeAuthService";

export const nativeApolloClient = apolloClientFactory(
    nativeAuthService,
    config.graphqlBaseUrl,
    log
);

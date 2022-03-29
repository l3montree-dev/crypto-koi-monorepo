import { apolloClientFactory } from "@crypto-koi/common/lib/ApolloClient";
import nativeAuthService from "./NativeAuthService";

export const nativeApolloClient = apolloClientFactory(nativeAuthService);

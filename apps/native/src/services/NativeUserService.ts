import { UserService } from "@crypto-koi/common/lib/UserService";
import { nativeApolloClient } from "./NativeApolloClient";
import nativeAuthService from "./NativeAuthService";

class NativeUserServer extends UserService {}

export const nativeUserService = new NativeUserServer(
    nativeAuthService,
    nativeApolloClient
);

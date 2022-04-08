import { AuthService } from "@crypto-koi/common/lib/AuthService";
import { config } from "../config";
import log from "../utils/logger";
import { NativeTokenStorage } from "./NativeStorageService";

class NativeAuthService extends AuthService {}
const nativeAuthService = new NativeAuthService(
    new NativeTokenStorage(),
    config.restApiBaseUrl,
    log
);
export default nativeAuthService;

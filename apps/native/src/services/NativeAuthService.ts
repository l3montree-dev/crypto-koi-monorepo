import { AuthService } from "@crypto-koi/common/lib/AuthService";
import { config } from "../config";
import log from "../utils/logger";
import { NativeStorageService } from "./NativeStorageService";

class NativeAuthService extends AuthService {}
const nativeAuthService = new NativeAuthService(
    new NativeStorageService(),
    config.restApiBaseUrl,
    log
);
export default nativeAuthService;

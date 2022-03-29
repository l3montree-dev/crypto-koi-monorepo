import { AuthService } from "@crypto-koi/common/lib/AuthService";
import { NativeStorageService } from "./NativeStorageService";

class NativeAuthService extends AuthService {}
const nativeAuthService = new NativeAuthService(new NativeStorageService());
export default nativeAuthService;

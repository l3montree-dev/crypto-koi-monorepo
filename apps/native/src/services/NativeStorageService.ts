import { TokenStorage } from "@crypto-koi/common/lib/TokenStorage";
import * as SecureStore from "expo-secure-store";

export class NativeTokenStorage implements TokenStorage {
    private static refreshTokenStorageKey = "_auth_refreshToken";
    private static accessTokenStorageKey = "_auth_accessToken";
    private static deviceIdStorageKey = "_auth_deviceId";

    saveAccessToken(value: string): void | Promise<void> {
        return SecureStore.setItemAsync(
            NativeTokenStorage.accessTokenStorageKey,
            value
        );
    }
    saveRefreshToken(value: string): void | Promise<void> {
        return SecureStore.setItemAsync(
            NativeTokenStorage.refreshTokenStorageKey,
            value
        );
    }
    getAccessToken(): Promise<string | null> {
        return SecureStore.getItemAsync(
            NativeTokenStorage.accessTokenStorageKey
        );
    }
    getRefreshToken(): Promise<string | null> {
        return SecureStore.getItemAsync(
            NativeTokenStorage.refreshTokenStorageKey
        );
    }
    async deleteTokens(): Promise<void> {
        await Promise.all([
            SecureStore.deleteItemAsync(
                NativeTokenStorage.accessTokenStorageKey
            ),
            SecureStore.deleteItemAsync(
                NativeTokenStorage.refreshTokenStorageKey
            ),
        ]);
    }
    getDeviceId(): Promise<string | null> {
        return SecureStore.getItemAsync(NativeTokenStorage.deviceIdStorageKey);
    }

    async generateDeviceId(): Promise<string> {
        const deviceId =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
        await SecureStore.setItemAsync(
            NativeTokenStorage.deviceIdStorageKey,
            deviceId
        );
        return deviceId;
    }
}

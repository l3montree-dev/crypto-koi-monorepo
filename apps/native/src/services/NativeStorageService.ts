import { StorageService } from "@crypto-koi/common/lib/StorageService";
import * as SecureStore from "expo-secure-store";

export class NativeStorageService implements StorageService {
    async save(key: string, value: string) {
        return await SecureStore.setItemAsync(key, value);
    }

    async getValueFor(key: string): Promise<string | null> {
        return await SecureStore.getItemAsync(key);
    }

    async delete(key: string) {
        return await SecureStore.deleteItemAsync(key);
    }
}

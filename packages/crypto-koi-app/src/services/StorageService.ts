import * as SecureStore from "expo-secure-store";

export class StorageService {
    static async save(key: string, value: string) {
        return await SecureStore.setItemAsync(key, value);
    }

    static async getValueFor(key: string): Promise<string | null> {
        return await SecureStore.getItemAsync(key);
    }

    static async delete(key: string) {
        return await SecureStore.deleteItemAsync(key);
    }
}

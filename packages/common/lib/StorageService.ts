export interface StorageService {
    save(key: string, value: string): Promise<void> | void;
    getValueFor(key: string): Promise<string | null> | null | string;
    delete(key: string) : Promise<void> | void;
}
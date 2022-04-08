export interface TokenStorage {
    saveAccessToken(value: string): void | Promise<void>
    saveRefreshToken(value: string): void | Promise<void>
    getAccessToken(): string | Promise<string | null> | null
    getRefreshToken(): string | Promise<string | null> | null
    deleteTokens(): void | Promise<void>
    getDeviceId(): string | null | Promise<string | null>
    generateDeviceId(): string | Promise<string>
}

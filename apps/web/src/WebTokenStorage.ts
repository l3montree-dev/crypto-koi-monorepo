import { AuthService } from '@crypto-koi/common/lib/AuthService'
import { TokenStorage } from '@crypto-koi/common/lib/TokenStorage'

export class WebStorage implements TokenStorage {
    static cookieName = 'access_token'
    private static refreshTokenStorageKey = '_auth_refreshToken'
    private static accessTokenStorageKey = '_auth_accessToken'
    private static deviceIdStorageKey = '_auth_deviceId'

    getDeviceId(): string | null | Promise<string | null> {
        return localStorage.getItem(WebStorage.deviceIdStorageKey)
    }

    generateDeviceId(): string | Promise<string> {
        if (typeof window === 'undefined') {
            throw new Error('generateDeviceId cannot be called serverside')
        }
        const deviceId =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15)
        localStorage.setItem(WebStorage.deviceIdStorageKey, deviceId)
        return deviceId
    }

    saveAccessToken(value: string): void | Promise<void> {
        if (typeof window === 'undefined') {
            return
        }
        // save the access token as cookie as well.
        document.cookie = `${WebStorage.cookieName}=${value}; path=/`
        localStorage.setItem(WebStorage.accessTokenStorageKey, value)
    }

    saveRefreshToken(value: string): void | Promise<void> {
        if (typeof window === 'undefined') {
            return
        }
        localStorage.setItem(WebStorage.refreshTokenStorageKey, value)
    }
    getAccessToken(): string | Promise<string | null> | null {
        if (typeof window === 'undefined') {
            return null
        }
        return localStorage.getItem(WebStorage.accessTokenStorageKey)
    }
    getRefreshToken(): string | Promise<string | null> | null {
        if (typeof window === 'undefined') {
            return null
        }
        return localStorage.getItem(WebStorage.refreshTokenStorageKey)
    }
    deleteTokens(): void | Promise<void> {
        if (typeof window === 'undefined') {
            return
        }

        localStorage.removeItem(WebStorage.accessTokenStorageKey)
        localStorage.removeItem(WebStorage.refreshTokenStorageKey)
    }
}

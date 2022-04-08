import { TokenStorage } from '@crypto-koi/common/lib/TokenStorage'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'
import { WebStorage } from './WebTokenStorage'

export default class CookieStorage implements TokenStorage {
    constructor(private cookies: NextApiRequestCookies) {}
    saveAccessToken(value: string): void | Promise<void> {
        throw new Error('The server should never save an access token')
    }
    saveRefreshToken(value: string): void | Promise<void> {
        throw new Error('The server should never save an refresh token')
    }
    getAccessToken(): string | Promise<string | null> | null {
        return this.cookies[WebStorage.cookieName]
    }
    getRefreshToken(): string | Promise<string | null> | null {
        return null
    }
    deleteTokens(): void | Promise<void> {
        throw new Error('The server cant delete any tokens')
    }
    getDeviceId(): string | Promise<string | null> | null {
        throw new Error('The server cant get the device id')
    }
    generateDeviceId(): string | Promise<string> {
        throw new Error('The server cant generate a device id')
    }
}

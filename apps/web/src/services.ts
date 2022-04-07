import { AuthService } from '@crypto-koi/common/lib/AuthService'
import { StorageService } from '@crypto-koi/common/lib/StorageService'
import { UserService } from '@crypto-koi/common/lib/UserService'
import { apolloClientFactory } from '@crypto-koi/common/lib/ApolloClient'
import { config } from './config'

class WebStorage implements StorageService {
    save(key: string, value: string): void | Promise<void> {
        localStorage.setItem(key, value)
    }
    getValueFor(key: string): string | Promise<string | null> | null {
        return localStorage.getItem(key)
    }
    delete(key: string): void | Promise<void> {
        localStorage.removeItem(key)
    }
}

export const authService = new AuthService(new WebStorage(), config.api)

export const apolloClient = apolloClientFactory(
    authService,
    config.graphqlBaseUrl,
    console
)
export const userService = new UserService(authService, apolloClient)

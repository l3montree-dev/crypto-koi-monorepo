import { StorageService } from '@crypto-koi/common/lib/StorageService'

export class WebStorage implements StorageService {
    save(key: string, value: string): void | Promise<void> {
        if (typeof window === 'undefined') {
            return
        }
        localStorage.setItem(key, value)
    }
    getValueFor(key: string): string | Promise<string | null> | null {
        if (typeof window === 'undefined') {
            return null
        }
        return localStorage.getItem(key)
    }
    delete(key: string): void | Promise<void> {
        if (typeof window === 'undefined') {
            return
        }
        localStorage.removeItem(key)
    }
}

import { config } from '../config'

export const cmsApi = async <T>(path: string): Promise<T> => {
    const response = await fetch(`${config.cmsHost}/api/${path}`)
    return response.json()
}

export const api = async <T>(path: string): Promise<T> => {
    const response = await fetch(`${config.api}/${path}`)
    return response.json()
}

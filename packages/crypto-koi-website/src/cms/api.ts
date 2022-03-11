import { config } from '../misc/config'

export const api = async <T>(url: string): Promise<T> => {
  const response = await fetch(`${config.cmsHost}/api/${url}`)
  return response.json()
}

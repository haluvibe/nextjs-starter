import useSWR, { ConfigInterface } from 'swr'
import { fetchAndCache, fetcher } from '../utils/swr'

export const getResource = async (id: string) => {
  if (!id) return
  return fetchAndCache('resource/' + id)
}

export const useResource = (id: string, config: ConfigInterface = {}) => {
  return useSWR('resource/' + id, fetcher, config)
}

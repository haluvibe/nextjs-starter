import useSWR, { ConfigInterface, cache } from 'swr'
import { swrKeys } from '../constants/swrKeys'
import { fetchAndCache, fetcher } from '../utils/swr'

export const getResource = async (id: string) => {
  if (!id) return
  return fetchAndCache(swrKeys.resource + id)
}

export const useResource = (id: string, config: ConfigInterface = {}) => {
  console.log('useResource -> cache', cache)
  return useSWR(swrKeys.resource + id, fetcher, config)
}

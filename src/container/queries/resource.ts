import useSWR, { ConfigInterface, cache } from 'swr'
import { apiNamespace } from '../../constants'
import { fetchAndCache, fetcher } from '../../utils/swr'

export const getResource = async (id: string) => {
  if (!id) return
  return fetchAndCache(apiNamespace + 'resource/' + id)
}

export const useResource = (id: string, config: ConfigInterface = {}) => {
  console.log('useResource -> cache', cache)
  return useSWR(apiNamespace + 'resource/' + id, fetcher, config)
}

import useSWR, { ConfigInterface, cache } from 'swr'
import { fetchAndCache, fetcher } from '../utils/swr.utils'

export const getResource = async (id: string) => {
  if (!id) return
  return fetchAndCache('resource/' + id)
}

export const useResource = (id: string, config: ConfigInterface = {}) => {
  const currentData = cache.get(['resource', id])
  console.log('currentData', currentData)
  return useSWR('resource/' + id, fetcher, { revalidateOnMount: false, ...config })
}

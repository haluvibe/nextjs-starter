import { mutate, cache } from 'swr'

export const fetcher = (path: string) =>
  fetch('/api/' + path).then((response: Response) => response.json())

export function fetchAndCache(key: string) {
  const request = fetcher(key)
  console.log('cache', cache)
  mutate(key, request)
  return request
}

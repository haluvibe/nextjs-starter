import { mutate } from 'swr'

export const fetcher = (path: string) =>
  fetch('/api/' + path).then((response: Response) => response.json())

export function fetchAndCache(key: string) {
  const request = fetcher(key)
  mutate(key, request)
  return request
}

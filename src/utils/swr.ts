import { mutate } from 'swr'

export const fetcher = (url: string, options: RequestInit = {}) =>
  fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...options,
  }).then((response: Response) => {
    if (response?.headers?.get('content-type')?.match('json')) {
      return response.json()
    }
    return response
  })

export function fetchAndCache(key: string) {
  const request = fetcher(key)
  mutate(key, request)
  return request
}

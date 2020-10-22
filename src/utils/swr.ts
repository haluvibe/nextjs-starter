import { mutate } from 'swr'

export const fetcher = (url: string, options: RequestInit = {}) =>
  fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...options,
  }).then((r) => {
    if (r?.headers?.get('content-type')?.match('json')) {
      return r.json()
    }
  })

export function fetchAndCache(key: string) {
  const request = fetcher(key)
  mutate(key, request)
  return request
}

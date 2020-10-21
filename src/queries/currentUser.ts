import useSWR, { ConfigInterface } from 'swr'

// fetcher
async function getCurrentUser() {
  const res = await fetch('/api/me')
  return await res.json()
}

export function useCurrentUser(config: ConfigInterface = {}) {
  return useSWR('current-user', getCurrentUser, { suspense: true, ...config })
}

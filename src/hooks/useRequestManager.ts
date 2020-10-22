import { useCallback, useState } from 'react'

export const useRequestManager = () => {
  const [pendingRequestIds, setPendingRequestIds] = useState<symbol[]>([])

  const create = useCallback(() => {
    const requestId = Symbol()
    setPendingRequestIds([...pendingRequestIds, requestId])

    return {
      done() {
        setPendingRequestIds((pendingRequestIds) =>
          pendingRequestIds.filter((id) => id !== requestId)
        )
      },
    }
  }, [])
  return {
    create,
    hasPendingRequests: pendingRequestIds.length > 0,
  }
}

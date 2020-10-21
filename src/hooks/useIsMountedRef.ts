import { useEffect, useRef } from 'react'

export const useIsMountedRef = () => {
  const isMounted = useRef<boolean>(true)

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  return isMounted
}

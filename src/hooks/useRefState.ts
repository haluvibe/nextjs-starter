import { useRef, useState } from 'react'

export function useRefState<T>(initialState: T) {
  const [, setState] = useState<T>(initialState)
  const ref = useRef<T>(initialState)

  const updateRefAndSetState = (newState: T): void => {
    ref.current = newState
    setState(newState)
  }

  return { ref, updateRefAndSetState }
}

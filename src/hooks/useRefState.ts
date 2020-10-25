import { useRef, useState } from 'react'

export function useRefState(initialState) {
  const [state, setState] = useState(initialState)
  const ref = useRef(state)

  function updateRefAndSetState(newState) {
    ref.current = newState
    setState(newState)
  }

  return [ref, updateRefAndSetState]
}

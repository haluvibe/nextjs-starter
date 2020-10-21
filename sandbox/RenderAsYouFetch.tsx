import React, { FunctionComponent, useEffect, useState } from 'react'
import { Resource } from './Resource'
import { useDebounce } from '../hooks/useDebounce.hook'
import { getResource } from '../queries/resource'

export const RenderAsYouFetch: FunctionComponent = () => {
  const [id, setID] = useState<string>('')
  const debouncedId = useDebounce<string>(id, 500)

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newID: string = event.target.value
    setID(newID)
  }

  const [id2, setID2] = useState<string>('')
  const debouncedId2 = useDebounce<string>(id2, 500)

  async function handleChange2(event: React.ChangeEvent<HTMLInputElement>) {
    const newID2: string = event.target.value
    setID2(newID2)
  }

  // Fetch API (optional)
  useEffect(() => {
    if (debouncedId) {
      getResource(debouncedId)
    }
    if (debouncedId2) {
      getResource(debouncedId2)
    }
  }, [debouncedId, debouncedId2])

  return (
    <>
      <label htmlFor="id">Resource ID:</label>{' '}
      <input id="id" type="text" onChange={handleChange} value={id} />
      <input id="id2" type="text" onChange={handleChange2} value={id2} />
      {!debouncedId || !debouncedId2 ? (
        <p>Enter IDs</p>
      ) : (
        <>
          <Resource id={debouncedId} />
          <Resource id={debouncedId2} />
        </>
      )}
    </>
  )
}

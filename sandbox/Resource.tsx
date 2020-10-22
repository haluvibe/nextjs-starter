// resource.js
import React from 'react'
import { Loading } from '../src/presentational/elements/loading/Loading'
import { useResource } from '../src/container/queries/resource'

interface IResourceProps {
  id: string
}

export const Resource: React.FunctionComponent<IResourceProps> = ({ id }) => {
  const { data } = useResource(id)
  if (!data) return <Loading />
  return <p>{data.url}</p>
}

import React from 'react'
import { RenderAsYouFetch } from '../../sandbox/RenderAsYouFetch'

type Props = {
  name: string
}

const RenderPage: React.FunctionComponent<Props> = () => (
  <div>
    <div>
      <RenderAsYouFetch />
    </div>
  </div>
)
export default RenderPage

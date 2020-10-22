import Link from 'next/link'
import React from 'react'
import { RenderAsYouFetch } from '../../sandbox/RenderAsYouFetch'

type Props = {
  name: string
}

const RenderPage: React.FunctionComponent<Props> = () => (
  <div>
    <Link href="/">
      <a>home</a>
    </Link>
    <div>
      <RenderAsYouFetch />
    </div>
  </div>
)
export default RenderPage

import React from 'react'
import { TailsTodos } from '../../sandbox/TailsTodos'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  name: string
}

const TailsPage: React.FunctionComponent<Props> = () => (
  <div>
    <Head>
      <title>todos</title>
      <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
    </Head>
    <div>
      <Link href="/">
        <a>home</a>
      </Link>
    </div>
    <TailsTodos />
  </div>
)
export default TailsPage

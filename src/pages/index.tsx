import React from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

type Props = {
  name: string
}

const Home: React.FunctionComponent<Props> = ({ name }) => (
  <div>
    <p>Hello {name}!</p>
    <div>
      <Link href="/render">
        <a>render as you fetch example</a>
      </Link>
    </div>
    <div>
      <Link href="/todo">
        <a>Todo app example</a>
      </Link>
    </div>
  </div>
)
export default Home

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const name = query.name instanceof Array ? query.name.join(', ') : query.name
  return {
    props: {
      name: name || 'World',
    },
  }
}

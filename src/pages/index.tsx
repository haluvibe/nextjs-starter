import React from 'react'
import Link from 'next/link'

const Home: React.FunctionComponent = () => (
  <div>
    <div>
      <Link href="/render">
        <a>render as you fetch example</a>
      </Link>
    </div>
    <div>
      <Link href="/tails">
        <a>Tails Todo app example</a>
      </Link>
    </div>
  </div>
)
export default Home

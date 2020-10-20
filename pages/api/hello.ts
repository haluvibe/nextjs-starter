// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log('req', req)
  setTimeout(() => {
    res.status(200).json({ name: 'John Doe' })
  }, 1000)
}

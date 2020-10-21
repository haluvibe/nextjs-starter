// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'

export type Todo = {
  id: number
  title: string
  completed: boolean
}

export default (req: NextApiRequest, res: NextApiResponse<Todo>) => {
  console.log('req', req)
  setTimeout(() => {
    res.status(200).json({ id: 1, title: 'my todo title', completed: false })
  }, 2000)
}

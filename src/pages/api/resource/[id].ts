// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { sleep } from '../../../utils/sleep'

export type Resource = {
  url: string
}

export default async (req: NextApiRequest, res: NextApiResponse<Resource>) => {
  if (!req.url) {
    res.status(200).json({ url: '/' })
  } else {
    await sleep(Math.random() * 5000)
    const url = req.url
    res.status(200).json({ url })
  }
}

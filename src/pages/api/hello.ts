// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import requestIp from 'request-ip'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const detectedIp = requestIp.getClientIp(req)
  const forwarded = req.headers["x-forwarded-for"]
  console.log('my request')
  console.log(`forwarded ${forwarded}`)
  console.log(`detectedIp ${detectedIp}`)
  console.log(`X-Forwarded-For: ${req.headers['X-Forwarded-For']}`)
  console.log(`CF-Connecting-IP: ${req.headers['CF-Connecting-IP']}`)
  console.log(`True-Client-IP: ${req.headers['True-Client-IP']}`)

  res.status(200).json({ name: 'John Doe' })
}

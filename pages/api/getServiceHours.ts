import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiParamsLangs } from 'types/api-types'

const serviceHours = {
  tc: '上午10時至晚上7時',
  sc: '上午10時至晚上7時',
  en: '10 a.m. to 7 p.m.',
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { lang },
    method,
  } = req

  switch (method) {
    case 'GET':
      res.status(200).json({
        serviceHours: serviceHours[lang as ApiParamsLangs],
      })
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

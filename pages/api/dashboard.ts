import { VercelRequest, VercelResponse } from '@vercel/node'

const summaryData = {
  startDate: '2014-10',
  toDate: '2021-09-30',
  transaction: 879000,
  coins: 712000000,
  totalCost: 1072000000,
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  switch (req.method) {
    case 'GET':
      return res.status(200).json({ result: summaryData })
  }
}

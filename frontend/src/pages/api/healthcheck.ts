import { NextApiRequest, NextApiResponse } from 'next';
 
// The endpoint will be (hostname)/api/healthcheck
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ status: 'ok' });
}
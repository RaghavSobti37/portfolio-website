import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getNowPlaying } from './_lib/spotify';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const payload = await getNowPlaying();
  return res.status(200).json(payload);
}

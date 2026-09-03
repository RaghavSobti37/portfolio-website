import { getNowPlaying } from './_lib/spotify.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const payload = await getNowPlaying();
    return res.status(200).json(payload);
  } catch (err) {
    return res.status(200).json({
      isPlaying: false,
      empty: true,
      configured: false,
      error: err instanceof Error ? err.message : 'Spotify error',
    });
  }
}

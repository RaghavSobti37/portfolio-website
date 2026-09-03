import type { VercelRequest, VercelResponse } from '@vercel/node';

const REDIRECT_URI = 'https://bluepolaroid.com/callback';

/**
 * Exchange Spotify auth code → tokens (used by /callback page).
 * POST { code: string }
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const code = typeof req.body === 'string'
    ? (JSON.parse(req.body) as { code?: string }).code
    : (req.body as { code?: string })?.code;

  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: 'Spotify client env not configured on server' });
  }
  if (!code) return res.status(400).json({ error: 'Missing code' });

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const json = await tokenRes.json();
  if (!tokenRes.ok) {
    return res.status(400).json({ error: 'Token exchange failed', details: json });
  }

  return res.status(200).json({
    refresh_token: json.refresh_token,
    access_token: json.access_token,
    expires_in: json.expires_in,
    scope: json.scope,
  });
}

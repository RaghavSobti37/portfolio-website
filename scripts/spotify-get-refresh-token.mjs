/**
 * Prints the Spotify authorize URL for production redirect.
 * Redirect URI: https://bluepolaroid.com/callback
 *
 * 1. Spotify Dashboard → Redirect URIs → https://bluepolaroid.com/callback
 * 2. Put SPOTIFY_CLIENT_ID + SPOTIFY_CLIENT_SECRET in Vercel env
 * 3. Deploy
 * 4. Open https://bluepolaroid.com/callback → Authorize Spotify
 * 5. Copy refresh token into Vercel as SPOTIFY_REFRESH_TOKEN → redeploy
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

function loadEnvFile() {
  const envPath = resolve(process.cwd(), '.env');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvFile();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const REDIRECT_URI = 'https://bluepolaroid.com/callback';
const SCOPES = [
  'user-read-currently-playing',
  'user-read-recently-played',
].join(' ');

if (!CLIENT_ID) {
  console.error('Set SPOTIFY_CLIENT_ID in .env first.');
  process.exit(1);
}

const authUrl = new URL('https://accounts.spotify.com/authorize');
authUrl.searchParams.set('client_id', CLIENT_ID);
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
authUrl.searchParams.set('scope', SCOPES);

console.log('\n1) Confirm Redirect URI in Spotify Dashboard:\n   ', REDIRECT_URI);
console.log('\n2) After deploy + Vercel env (CLIENT_ID + CLIENT_SECRET), open:\n');
console.log(authUrl.toString());
console.log('\n3) Or go to https://bluepolaroid.com/callback and click Authorize.\n');
console.log('4) Copy SPOTIFY_REFRESH_TOKEN into Vercel → Redeploy.\n');

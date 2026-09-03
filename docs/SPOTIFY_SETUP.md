# Spotify Live Activity (production)

Redirect URI (exact): `https://bluepolaroid.com/callback`

## One-time setup

1. [Spotify Dashboard](https://developer.spotify.com/dashboard) → your app → **Settings**
2. Redirect URIs → add `https://bluepolaroid.com/callback` → Save
3. Vercel → Project → Settings → Environment Variables:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
4. Deploy the site
5. Open https://bluepolaroid.com/callback → **Authorize Spotify**
6. Copy the printed `refresh_token`
7. Add Vercel env `SPOTIFY_REFRESH_TOKEN` = that value
8. Redeploy

Disc (bottom-left) then shows live / last played.

Never commit `.env`. Client secret stays server-side only.

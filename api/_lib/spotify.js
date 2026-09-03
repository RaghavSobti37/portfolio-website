const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

function mapTrack(item) {
  return {
    title: item.name,
    artist: item.artists?.map((a) => a.name).join(', ') ?? 'Unknown',
    album: item.album?.name ?? '',
    albumArt: item.album?.images?.[0]?.url ?? null,
    url:
      item.external_urls?.spotify ??
      'https://open.spotify.com/user/314i4j6nzrmctdy5xvhosa4iwvlu',
  };
}

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing Spotify env vars');
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) throw new Error(`Token refresh failed: ${res.status}`);
  const data = await res.json();
  return data.access_token;
}

export async function getNowPlaying() {
  const configured = Boolean(
    process.env.SPOTIFY_CLIENT_ID &&
      process.env.SPOTIFY_CLIENT_SECRET &&
      process.env.SPOTIFY_REFRESH_TOKEN
  );

  if (!configured) {
    return { isPlaying: false, empty: true, configured: false };
  }

  try {
    const token = await getAccessToken();
    const nowRes = await fetch(NOW_PLAYING, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (nowRes.status === 200) {
      const now = await nowRes.json();
      if (now.item && now.currently_playing_type === 'track') {
        return {
          isPlaying: Boolean(now.is_playing),
          ...mapTrack(now.item),
          playedAt: null,
          configured: true,
        };
      }
    }

    const recentRes = await fetch(RECENTLY_PLAYED, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!recentRes.ok) throw new Error(`Recently played failed: ${recentRes.status}`);

    const recent = await recentRes.json();
    const last = recent.items?.[0];
    if (!last) return { isPlaying: false, empty: true, configured: true };

    return {
      isPlaying: false,
      ...mapTrack(last.track),
      playedAt: last.played_at,
      configured: true,
    };
  } catch (err) {
    return {
      isPlaying: false,
      empty: true,
      configured: true,
      error: err instanceof Error ? err.message : 'Spotify error',
    };
  }
}

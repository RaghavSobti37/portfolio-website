import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const CLIENT_ID = '9c6fcfcade814acbad98edbe59e9e186';
const REDIRECT_URI = 'https://bluepolaroid.com/callback';
const SCOPES = ['user-read-currently-playing', 'user-read-recently-played'].join(' ');

export default function SpotifyCallback() {
  const [params] = useSearchParams();
  const code = params.get('code');
  const error = params.get('error');
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'fail'>('idle');
  const [message, setMessage] = useState('');

  const authorizeUrl = useMemo(() => {
    const url = new URL('https://accounts.spotify.com/authorize');
    url.searchParams.set('client_id', CLIENT_ID);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('redirect_uri', REDIRECT_URI);
    url.searchParams.set('scope', SCOPES);
    return url.toString();
  }, []);

  useEffect(() => {
    if (!code) return;
    let cancelled = false;
    (async () => {
      setStatus('loading');
      try {
        const res = await fetch('/api/spotify-auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Exchange failed');
        if (!cancelled) {
          setRefreshToken(json.refresh_token || null);
          setStatus('done');
          if (!json.refresh_token) {
            setMessage(
              'No refresh_token returned. Revoke the app at spotify.com/account/apps and authorize again.'
            );
          }
        }
      } catch (e) {
        if (!cancelled) {
          setStatus('fail');
          setMessage(e instanceof Error ? e.message : 'Failed');
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [code]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-lg w-full border border-border p-8 space-y-6">
        <p className="font-mono-meta text-primary">SPOTIFY · CALLBACK</p>
        <h1 className="font-display text-3xl font-bold tracking-tight">Connect live listening</h1>

        {error && (
          <p className="font-body text-sm text-destructive">Auth error: {error}</p>
        )}

        {!code && !error && (
          <div className="space-y-4">
            <p className="font-body text-muted-foreground text-sm leading-relaxed">
              Redirect URI must be exactly <code className="text-primary">https://bluepolaroid.com/callback</code> in the Spotify Dashboard.
            </p>
            <a
              href={authorizeUrl}
              className="inline-block font-display text-sm tracking-[0.15em] uppercase bg-primary text-primary-foreground px-6 py-3"
            >
              Authorize Spotify →
            </a>
          </div>
        )}

        {status === 'loading' && (
          <p className="font-mono-meta">Exchanging code…</p>
        )}

        {status === 'fail' && (
          <p className="font-body text-sm text-destructive">{message}</p>
        )}

        {status === 'done' && refreshToken && (
          <div className="space-y-3">
            <p className="font-body text-sm text-muted-foreground">
              Add this to Vercel env as <code className="text-accent">SPOTIFY_REFRESH_TOKEN</code>, then redeploy:
            </p>
            <pre className="font-mono text-[11px] break-all whitespace-pre-wrap bg-secondary/50 border border-border p-4 max-h-48 overflow-auto">
              {refreshToken}
            </pre>
            <button
              type="button"
              className="font-mono-meta text-primary"
              onClick={() => navigator.clipboard.writeText(refreshToken)}
            >
              COPY TOKEN
            </button>
          </div>
        )}

        {status === 'done' && !refreshToken && (
          <p className="font-body text-sm text-muted-foreground">{message}</p>
        )}

        <Link to="/" className="inline-block font-mono-meta text-muted-foreground hover:text-primary">
          ← Back home
        </Link>
      </div>
    </div>
  );
}

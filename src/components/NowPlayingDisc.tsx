import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { topTracks } from '@/components/TopTracksSection';

const SPOTIFY_PROFILE =
  'https://open.spotify.com/user/314i4j6nzrmctdy5xvhosa4iwvlu';

export interface NowPlayingPayload {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumArt?: string | null;
  url?: string;
  playedAt?: string | null;
  empty?: boolean;
  configured?: boolean;
  error?: string;
}

function ago(iso: string | null | undefined): string {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

const fallback: NowPlayingPayload = {
  isPlaying: false,
  title: topTracks[0].name,
  artist: topTracks[0].artists,
  albumArt: topTracks[0].cover,
  url: topTracks[0].url,
  playedAt: null,
  empty: false,
  configured: false,
};

export const NowPlayingDisc = () => {
  const [data, setData] = useState<NowPlayingPayload>(fallback);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const endpoint =
          import.meta.env.VITE_SPOTIFY_API_URL?.toString() || '/api/now-playing';
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error('bad response');
        const json = (await res.json()) as NowPlayingPayload;
        if (cancelled) return;

        if (json.empty || (!json.title && !json.isPlaying)) {
          setData({
            ...fallback,
            configured: json.configured,
            error: json.error,
          });
        } else {
          setData(json);
        }
      } catch {
        if (!cancelled) setData(fallback);
      }
    };

    load();
    const id = window.setInterval(load, 30_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  const spinning = Boolean(data.isPlaying);
  const href = data.url || SPOTIFY_PROFILE;

  return (
    <div
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[90] pointer-events-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHovered(false);
      }}
    >
      <div className="pointer-events-auto relative flex flex-row-reverse items-end gap-3">
        {/* Disc only by default — title / Open on Spotify appear on hover (left of disc) */}
        <button
          type="button"
          className="relative w-[72px] h-[72px] md:w-20 md:h-20 shrink-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-[0_8px_40px_rgba(35,92,185,0.35)] block cursor-pointer"
          aria-label={
            spinning ? `Now playing: ${data.title}` : `Listening: ${data.title}`
          }
          aria-expanded={hovered}
        >
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/50"
            animate={{ rotate: 360 }}
            transition={{ duration: spinning ? 6 : 14, ease: 'linear', repeat: Infinity }}
            style={{
              background:
                'radial-gradient(circle at center, hsl(240 6% 10%) 28%, hsl(240 6% 6%) 29%, hsl(240 6% 14%) 30%, hsl(240 6% 8%) 55%, hsl(217 68% 25%) 100%)',
            }}
          >
            <div className="absolute inset-[22%] rounded-full overflow-hidden border border-paper/10">
              {data.albumArt ? (
                <img src={data.albumArt} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/40 to-ink" />
              )}
            </div>
            <div className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-accent border border-ink z-10" />
          </motion.div>

          {spinning && (
            <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-accent animate-pulse border-2 border-ink" />
          )}
        </button>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="max-w-[220px] text-right border border-border bg-background/95 backdrop-blur-md p-3 shadow-card"
            >
              <p className="font-mono text-[9px] tracking-wider uppercase text-accent mb-1.5 flex items-center justify-end gap-1.5">
                {spinning ? 'Now playing' : 'Last played'}
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    spinning ? 'bg-accent animate-pulse' : 'bg-muted-foreground'
                  }`}
                />
              </p>
              <p className="font-display text-sm font-semibold leading-tight line-clamp-2">
                {data.title}
              </p>
              <p className="font-body text-xs text-muted-foreground mt-0.5 line-clamp-1">
                {data.artist}
              </p>
              {!spinning && data.playedAt && (
                <p className="font-mono text-[10px] text-muted-foreground mt-1.5">
                  {ago(data.playedAt)}
                </p>
              )}
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-2.5 pt-2.5 border-t border-border font-mono text-[10px] tracking-wider uppercase text-primary hover:text-accent"
              >
                Open on Spotify ↗
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

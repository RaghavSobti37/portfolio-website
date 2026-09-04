import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, LayoutList, Rows3 } from 'lucide-react';
import {
  collaborators,
  formatListeners,
  LIST_PAGE_SIZE,
  sortCollaboratorsByListeners,
  splitCollaboratorRows,
  type Collaborator,
} from '@/data/collaborators';
import { cn } from '@/lib/utils';

const { top: TOP_ROW, bottom: BOTTOM_ROW } = splitCollaboratorRows(collaborators);
const SPEED_PX_S = 36;

type ViewMode = 'marquee' | 'list';

function ArtistChip({
  artist,
  active,
  onEnter,
  onLeave,
  onSelect,
}: {
  artist: Collaborator;
  active: boolean;
  onEnter: (a: Collaborator) => void;
  onLeave: () => void;
  onSelect: (a: Collaborator) => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        'group relative flex shrink-0 items-center gap-3 whitespace-nowrap px-3 py-2 transition-opacity',
        active ? 'opacity-100' : 'opacity-80 hover:opacity-100'
      )}
      onMouseEnter={() => onEnter(artist)}
      onMouseLeave={onLeave}
      onFocus={() => onEnter(artist)}
      onBlur={onLeave}
      onClick={() => onSelect(artist)}
      aria-label={`${artist.name}, ${formatListeners(artist.monthlyListeners)} monthly listeners`}
    >
      <img
        src={artist.image}
        alt=""
        width={40}
        height={40}
        loading="lazy"
        decoding="async"
        className={cn(
          'h-10 w-10 rounded-full object-cover ring-1 ring-foreground/15 transition-transform duration-300',
          active && 'scale-110 ring-accent'
        )}
        referrerPolicy="no-referrer"
      />
      <span className="font-display text-sm md:text-base tracking-wide">{artist.name}</span>
    </button>
  );
}

function MarqueeRow({
  artists,
  trackRef,
  activeId,
  onEnter,
  onLeave,
  onSelect,
}: {
  artists: Collaborator[];
  trackRef: React.RefObject<HTMLDivElement | null>;
  activeId: string | null;
  onEnter: (a: Collaborator) => void;
  onLeave: () => void;
  onSelect: (a: Collaborator) => void;
}) {
  const loop = [...artists, ...artists, ...artists];

  return (
    <div className="relative overflow-hidden py-1">
      <div ref={trackRef} className="flex w-max will-change-transform">
        {loop.map((artist, i) => (
          <ArtistChip
            key={`${artist.id}-${i}`}
            artist={artist}
            active={activeId === artist.id}
            onEnter={onEnter}
            onLeave={onLeave}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

function ArtistDetail({
  artist,
  onEnter,
  onLeave,
}: {
  artist: Collaborator;
  onEnter?: () => void;
  onLeave?: () => void;
}) {
  return (
    <div
      className="max-w-2xl border border-border/80 bg-secondary/40 backdrop-blur-sm px-5 py-4"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="flex items-start gap-4">
        <img
          src={artist.image}
          alt=""
          className="h-14 w-14 rounded-full object-cover ring-1 ring-foreground/20 shrink-0"
          referrerPolicy="no-referrer"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-display text-xl font-semibold tracking-tight">{artist.name}</h3>
            <span className="font-mono text-[10px] tracking-wider uppercase text-accent">
              {formatListeners(artist.monthlyListeners)} monthly listeners
            </span>
          </div>
          <p className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground mt-1">
            {artist.genres.join(' · ')}
          </p>
          <p className="font-body text-sm text-foreground/80 mt-2 leading-relaxed">{artist.bio}</p>
          <ul className="mt-3 space-y-1">
            {artist.projects.map((p) => (
              <li key={p.title} className="font-mono text-[11px] text-muted-foreground">
                <span className="text-primary">{p.year}</span>
                {' · '}
                {p.title}
                <span className="text-foreground/40"> — {p.role}</span>
              </li>
            ))}
          </ul>
          <a
            href={artist.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 font-display text-xs tracking-[0.15em] uppercase text-primary hover:text-accent transition-colors"
          >
            Open on Spotify <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

export const ArtistsMarqueeSection = () => {
  const [view, setView] = useState<ViewMode>('marquee');
  const [active, setActive] = useState<Collaborator | null>(null);
  const [paused, setPaused] = useState(false);
  const [listCount, setListCount] = useState(LIST_PAGE_SIZE);

  const ranked = useMemo(() => sortCollaboratorsByListeners(), []);
  const visibleList = ranked.slice(0, listCount);
  const hasMore = listCount < ranked.length;

  const topTrackRef = useRef<HTMLDivElement | null>(null);
  const bottomTrackRef = useRef<HTMLDivElement | null>(null);
  const topOffset = useRef(0);
  const bottomOffset = useRef(0);
  const loopWidth = useRef(1);
  const pausedRef = useRef(false);
  const dragging = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const dragBaseTop = useRef(0);
  const dragBaseBottom = useRef(0);
  const leaveTimer = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);
  const lastTs = useRef<number | null>(null);

  pausedRef.current = paused || dragging.current;

  const clearLeaveTimer = () => {
    if (leaveTimer.current != null) {
      window.clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  };

  const onEnter = useCallback((a: Collaborator) => {
    clearLeaveTimer();
    setActive(a);
    setPaused(true);
  }, []);

  const onLeave = useCallback(() => {
    clearLeaveTimer();
    leaveTimer.current = window.setTimeout(() => {
      setActive(null);
      setPaused(false);
      leaveTimer.current = null;
    }, 160);
  }, []);

  const onSelect = useCallback((a: Collaborator) => {
    clearLeaveTimer();
    setActive(a);
    setPaused(true);
  }, []);

  const holdPanel = useCallback(() => {
    clearLeaveTimer();
    setPaused(true);
  }, []);

  const applyTransforms = () => {
    const w = loopWidth.current || 1;
    // Keep offsets in [-w, 0) for seamless loop
    const wrap = (v: number) => ((v % w) + w) % w - w;
    topOffset.current = wrap(topOffset.current);
    bottomOffset.current = wrap(bottomOffset.current);
    if (topTrackRef.current) {
      topTrackRef.current.style.transform = `translate3d(${topOffset.current}px,0,0)`;
    }
    if (bottomTrackRef.current) {
      bottomTrackRef.current.style.transform = `translate3d(${bottomOffset.current}px,0,0)`;
    }
  };

  const measureLoop = useCallback(() => {
    const el = bottomTrackRef.current ?? topTrackRef.current;
    if (!el) return;
    // Three copies → one segment is 1/3 of scrollWidth
    loopWidth.current = Math.max(1, el.scrollWidth / 3);
  }, []);

  useEffect(() => {
    if (view !== 'marquee') {
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
      rafId.current = null;
      lastTs.current = null;
      return;
    }

    measureLoop();
    const onResize = () => measureLoop();
    window.addEventListener('resize', onResize);

    const tick = (ts: number) => {
      if (lastTs.current == null) lastTs.current = ts;
      const dt = Math.min(0.05, (ts - lastTs.current) / 1000);
      lastTs.current = ts;

      if (!pausedRef.current && !dragging.current) {
        // Top moves right (offset ↑), bottom moves left (offset ↓)
        topOffset.current += SPEED_PX_S * dt;
        bottomOffset.current -= SPEED_PX_S * dt;
        applyTransforms();
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    // Initial paint
    requestAnimationFrame(() => {
      measureLoop();
      applyTransforms();
    });

    return () => {
      window.removeEventListener('resize', onResize);
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
      rafId.current = null;
      lastTs.current = null;
    };
  }, [view, measureLoop]);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
    dragging.current = true;
    dragBaseTop.current = topOffset.current;
    dragBaseBottom.current = bottomOffset.current;
    setPaused(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const x = e.touches[0]?.clientX ?? touchStartX.current;
    const dx = x - touchStartX.current;
    // Bottom follows swipe; top opposite — offsets stick (no snap-back)
    bottomOffset.current = dragBaseBottom.current + dx;
    topOffset.current = dragBaseTop.current - dx;
    applyTransforms();
  };

  const onTouchEnd = () => {
    touchStartX.current = null;
    dragging.current = false;
    // Resume auto-scroll from current offsets — do not reset
    if (!active) setPaused(false);
    lastTs.current = null;
  };

  return (
    <section
      id="artists"
      className="relative border-t border-border py-16 md:py-24 overflow-hidden"
      aria-labelledby="artists-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, hsl(var(--primary) / 0.18), transparent 60%), radial-gradient(ellipse 60% 40% at 80% 100%, hsl(var(--accent) / 0.12), transparent 55%)',
        }}
        aria-hidden
      />

      <div className="container mx-auto px-6 relative z-10 mb-8 md:mb-12">
        <p className="font-mono-meta text-accent mb-4 flex items-center gap-2">
          <span className="orange-dot" />
          COLLABORATORS · SPOTIFY
        </p>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="artists-heading"
              className="font-display text-[clamp(2.4rem,8vw,5rem)] font-bold tracking-tighter leading-[0.92] max-w-3xl"
            >
              ARTISTS I&apos;VE FRAMED
            </h2>
            <p className="font-body text-muted-foreground mt-4 max-w-xl text-base md:text-lg leading-relaxed">
              Strip or ranked list — Spotify reach plus projects we made together. Swipe the strip:
              bottom follows your finger, top goes the other way, then keeps rolling from there.
            </p>
          </div>

          <div
            className="inline-flex shrink-0 border border-border p-1 self-start"
            role="tablist"
            aria-label="Artist view"
          >
            <button
              type="button"
              role="tab"
              aria-selected={view === 'marquee'}
              onClick={() => setView('marquee')}
              className={cn(
                'inline-flex items-center gap-2 px-3 py-2 font-display text-xs tracking-[0.15em] uppercase transition-colors',
                view === 'marquee'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Rows3 className="h-3.5 w-3.5" /> Strip
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={view === 'list'}
              onClick={() => {
                setView('list');
                setActive(null);
                setPaused(false);
              }}
              className={cn(
                'inline-flex items-center gap-2 px-3 py-2 font-display text-xs tracking-[0.15em] uppercase transition-colors',
                view === 'list'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <LayoutList className="h-3.5 w-3.5" /> List
            </button>
          </div>
        </div>
      </div>

      {view === 'marquee' ? (
        <>
          <div
            className="relative select-none touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchEnd}
          >
            <MarqueeRow
              artists={TOP_ROW}
              trackRef={topTrackRef}
              activeId={active?.id ?? null}
              onEnter={onEnter}
              onLeave={onLeave}
              onSelect={onSelect}
            />
            <div className="h-px bg-border/60 my-2 mx-6" aria-hidden />
            <MarqueeRow
              artists={BOTTOM_ROW}
              trackRef={bottomTrackRef}
              activeId={active?.id ?? null}
              onEnter={onEnter}
              onLeave={onLeave}
              onSelect={onSelect}
            />
          </div>

          <div className="container mx-auto px-6 relative z-10 mt-8 min-h-[9.5rem] md:min-h-[8rem]">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <ArtistDetail artist={active} onEnter={holdPanel} onLeave={onLeave} />
                </motion.div>
              ) : (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-mono text-[11px] tracking-wider uppercase text-muted-foreground/70"
                >
                  Hover / tap a name · swipe keeps going from where you stop
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </>
      ) : (
        <div className="container mx-auto px-6 relative z-10">
          <p className="font-mono text-[11px] tracking-wider uppercase text-muted-foreground mb-6">
            Ranked by Spotify monthly listeners · showing {visibleList.length} of {ranked.length}
          </p>
          <ol className="space-y-0 border-t border-border">
            {visibleList.map((artist, i) => {
              const open = active?.id === artist.id;
              return (
                <li key={artist.id} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => setActive(open ? null : artist)}
                    className="w-full flex items-center gap-4 py-4 text-left hover:bg-secondary/30 transition-colors px-1"
                  >
                    <span className="font-mono text-xs text-muted-foreground w-7 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <img
                      src={artist.image}
                      alt=""
                      className="h-12 w-12 rounded-full object-cover ring-1 ring-foreground/15 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="font-display text-lg md:text-xl font-semibold tracking-tight block truncate">
                        {artist.name}
                      </span>
                      <span className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground">
                        {artist.genres.slice(0, 2).join(' · ')}
                      </span>
                    </span>
                    <span className="font-mono text-[11px] tracking-wider uppercase text-accent shrink-0">
                      {formatListeners(artist.monthlyListeners)}
                    </span>
                  </button>
                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden pb-4 pl-11 md:pl-14"
                      >
                        <ArtistDetail artist={artist} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() =>
                  setListCount((n) => Math.min(ranked.length, n + LIST_PAGE_SIZE))
                }
                className="inline-flex items-center gap-2 font-display text-sm tracking-[0.2em] uppercase border border-primary text-primary px-7 py-3.5 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Load more artists
                <span className="font-mono text-[10px] opacity-70 normal-case tracking-normal">
                  +{Math.min(LIST_PAGE_SIZE, ranked.length - listCount)}
                </span>
              </button>
            </div>
          )}
          {!hasMore && ranked.length > LIST_PAGE_SIZE && (
            <p className="mt-6 text-center font-mono text-[11px] tracking-wider uppercase text-muted-foreground">
              All {ranked.length} artists loaded
            </p>
          )}
        </div>
      )}
    </section>
  );
};

import { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import {
  collaborators,
  formatListeners,
  splitCollaboratorRows,
  type Collaborator,
} from '@/data/collaborators';
import { cn } from '@/lib/utils';

const { top: TOP_ROW, bottom: BOTTOM_ROW } = splitCollaboratorRows(collaborators);

type RowDir = 'left' | 'right';

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
  direction,
  paused,
  dragOffset,
  activeId,
  onEnter,
  onLeave,
  onSelect,
}: {
  artists: Collaborator[];
  direction: RowDir;
  paused: boolean;
  dragOffset: number;
  activeId: string | null;
  onEnter: (a: Collaborator) => void;
  onLeave: () => void;
  onSelect: (a: Collaborator) => void;
}) {
  const loop = [...artists, ...artists, ...artists];
  const anim = direction === 'left' ? 'artists-marquee-left' : 'artists-marquee-right';

  return (
    <div className="relative overflow-hidden py-1">
      {/* Outer: swipe drag. Inner: CSS marquee (transforms must not fight). */}
      <div
        className="will-change-transform transition-transform duration-150 ease-out"
        style={{ transform: `translateX(${dragOffset}px)` }}
      >
        <div className={cn('flex w-max will-change-transform', anim, paused && 'artists-marquee-paused')}>
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
    </div>
  );
}

export const ArtistsMarqueeSection = () => {
  const [active, setActive] = useState<Collaborator | null>(null);
  const [paused, setPaused] = useState(false);
  const [swipeX, setSwipeX] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const baseSwipe = useRef(0);
  const leaveTimer = useRef<number | null>(null);

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

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
    baseSwipe.current = swipeX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const x = e.touches[0]?.clientX ?? touchStartX.current;
    const dx = x - touchStartX.current;
    // Bottom row follows finger; clamp so it feels intentional
    setSwipeX(baseSwipe.current + dx);
    setPaused(true);
  };

  const onTouchEnd = () => {
    touchStartX.current = null;
    if (!active) setPaused(false);
    // Ease residual offset back toward a gentle rest
    setSwipeX((v) => Math.max(-180, Math.min(180, v * 0.35)));
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

      <div className="container mx-auto px-6 relative z-10 mb-10 md:mb-14">
        <p className="font-mono-meta text-accent mb-4 flex items-center gap-2">
          <span className="orange-dot" />
          COLLABORATORS · SPOTIFY
        </p>
        <h2
          id="artists-heading"
          className="font-display text-[clamp(2.4rem,8vw,5rem)] font-bold tracking-tighter leading-[0.92] max-w-3xl"
        >
          ARTISTS I&apos;VE FRAMED
        </h2>
        <p className="font-body text-muted-foreground mt-4 max-w-xl text-base md:text-lg leading-relaxed">
          Two live strips — hover a name to pause and see Spotify reach plus the projects we made
          together. On phone, swipe: bottom follows your finger, top runs the other way.
        </p>
      </div>

      <div
        className="relative select-none touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        {/* Top: default right; opposite of swipe (negate) */}
        <MarqueeRow
          artists={TOP_ROW}
          direction="right"
          paused={paused}
          dragOffset={-swipeX}
          activeId={active?.id ?? null}
          onEnter={onEnter}
          onLeave={onLeave}
          onSelect={onSelect}
        />
        <div className="h-px bg-border/60 my-2 mx-6" aria-hidden />
        {/* Bottom: default left; follows swipe */}
        <MarqueeRow
          artists={BOTTOM_ROW}
          direction="left"
          paused={paused}
          dragOffset={swipeX}
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
              className="max-w-2xl border border-border/80 bg-secondary/40 backdrop-blur-sm px-5 py-4"
              onMouseEnter={holdPanel}
              onMouseLeave={onLeave}
            >
              <div className="flex items-start gap-4">
                <img
                  src={active.image}
                  alt=""
                  className="h-14 w-14 rounded-full object-cover ring-1 ring-foreground/20 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-xl font-semibold tracking-tight">{active.name}</h3>
                    <span className="font-mono text-[10px] tracking-wider uppercase text-accent">
                      {formatListeners(active.monthlyListeners)} monthly listeners
                    </span>
                  </div>
                  <p className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground mt-1">
                    {active.genres.join(' · ')}
                  </p>
                  <p className="font-body text-sm text-foreground/80 mt-2 leading-relaxed">
                    {active.bio}
                  </p>
                  <ul className="mt-3 space-y-1">
                    {active.projects.map((p) => (
                      <li key={p.title} className="font-mono text-[11px] text-muted-foreground">
                        <span className="text-primary">{p.year}</span>
                        {' · '}
                        {p.title}
                        <span className="text-foreground/40"> — {p.role}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={active.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 font-display text-xs tracking-[0.15em] uppercase text-primary hover:text-accent transition-colors"
                  >
                    Open on Spotify <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-mono text-[11px] tracking-wider uppercase text-muted-foreground/70"
            >
              Hover / tap a name · swipe strips on mobile
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement | string,
        opts: Record<string, unknown>
      ) => {
        seekTo: (seconds: number, allowSeekAhead: boolean) => void;
        playVideo: () => void;
        destroy: () => void;
      };
      PlayerState: { PLAYING: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const VIDEO_ID = '28Mb1cIooGw';
const LOOP_SECONDS = 7;

export const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);
  const opacity = useTransform(scrollY, [0, 280], [1, 0]);
  const playerHostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<{
    seekTo: (s: number, a: boolean) => void;
    playVideo: () => void;
    destroy: () => void;
  } | null>(null);
  const loopRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const mountPlayer = () => {
      if (cancelled || !playerHostRef.current || !window.YT?.Player) return;

      playerRef.current = new window.YT.Player(playerHostRef.current, {
        videoId: VIDEO_ID,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
          start: 0,
        },
        events: {
          onReady: (e: { target: { playVideo: () => void; seekTo: (s: number, a: boolean) => void } }) => {
            e.target.playVideo();
            if (loopRef.current) window.clearInterval(loopRef.current);
            loopRef.current = window.setInterval(() => {
              e.target.seekTo(0, true);
              e.target.playVideo();
            }, LOOP_SECONDS * 1000);
          },
        },
      });
    };

    if (window.YT?.Player) {
      mountPlayer();
    } else {
      const existing = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      if (!existing) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        mountPlayer();
      };
    }

    return () => {
      cancelled = true;
      if (loopRef.current) window.clearInterval(loopRef.current);
      try {
        playerRef.current?.destroy();
      } catch {
        /* ignore */
      }
    };
  }, []);

  const handleEnter = () => {
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-20 overflow-hidden">
          <div
            ref={playerHostRef}
            id="hero-yt-player"
            className="absolute inset-0 w-[calc(100%+160px)] h-[calc(100%+160px)] -translate-x-20 -translate-y-20"
          />
        </div>
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 film-grain opacity-[0.12] mix-blend-overlay" />
      </div>

      <motion.div style={{ y }} className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 px-6 max-w-5xl mx-auto w-full pt-24"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-mono-meta text-primary mb-8"
        >
          BLUEPOLAROID / CINEMA × CODE × CHAOS
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-display text-[clamp(3.2rem,12vw,8.5rem)] leading-[0.9] font-bold tracking-tighter mb-8"
        >
          <span className="block">I MAKE</span>
          <span className="block">THINGS THAT</span>
          <span className="block text-primary">MOVE.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-body text-base md:text-lg text-muted-foreground max-w-md mb-3"
        >
          Film. Digital. Experiments.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="font-body text-sm md:text-base text-muted-foreground/80 max-w-lg mb-10"
        >
          Somewhere between a camera and a computer.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          onClick={handleEnter}
          className="group inline-flex items-center gap-3 font-display text-sm tracking-[0.2em] uppercase text-foreground border border-foreground/20 px-8 py-4 hover:border-primary hover:text-primary transition-colors duration-300"
        >
          Step into the work
          <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-20 md:mt-28 flex items-center gap-3 cursor-pointer"
          onClick={handleEnter}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-primary" />
          </motion.div>
          <span className="font-mono-meta">SCROLL / FRAME_001</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

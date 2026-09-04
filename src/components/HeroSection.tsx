import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

const CENTER_LOOP = 6;

type Clip = {
  src: string;
  poster: string;
  label: string;
  maxSeconds?: number;
  zoom?: boolean;
};

const HeroClip = ({
  src,
  poster,
  label,
  maxSeconds,
  zoom,
  className,
}: Clip & { className?: string }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.playbackRate = 1;
    v.play().catch(() => undefined);
  }, [src]);

  const clampLoop = () => {
    const v = ref.current;
    if (!v || maxSeconds == null) return;
    if (v.currentTime >= maxSeconds) v.currentTime = 0.04;
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-ink shadow-lift border border-foreground/10',
        className
      )}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        playsInline
        autoPlay
        loop={maxSeconds == null}
        preload="auto"
        onTimeUpdate={clampLoop}
        className={cn('absolute inset-0 w-full h-full object-cover', zoom && 'scale-[1.08]')}
        aria-label={label}
      />
    </div>
  );
};

const WideKhwaab = ({ className }: { className?: string }) => (
  <HeroClip
    src="/hero/khwaab-b.mp4?v=cuts"
    poster="/hero/khwaab-b.jpg"
    label="Khwaab"
    className={className}
  />
);

const WideFanna = ({ className }: { className?: string }) => (
  <HeroClip
    src="/hero/fanna.mp4?v=cuts"
    poster="/hero/fanna.jpg"
    label="Fanna Fillah"
    className={className}
  />
);

const ReelVichaar = ({ className }: { className?: string }) => (
  <HeroClip
    src="/hero/right.mp4"
    poster="/thumbnails/ig-DbiexjeO0l-.jpg"
    label="Vichaar reel"
    zoom
    className={className}
  />
);

const ReelNh7 = ({ className }: { className?: string }) => (
  <HeroClip
    src="/hero/center.mp4"
    poster="/thumbnails/ig-DWY8k8Jj79k.jpg"
    label="NH7 Weekender reel"
    maxSeconds={CENTER_LOOP}
    className={className}
  />
);

const ReelAditya = ({ className }: { className?: string }) => (
  <HeroClip
    src="/hero/aditya.mp4"
    poster="/hero/aditya.jpg"
    label="Aditya Gadhvi reel"
    className={className}
  />
);

export const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 280], [1, 0]);

  const handleEnter = () => {
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden max-md:mb-20">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Phone — 2×16:9 stacked, then 3 equal 9:16 reels */}
        <div className="md:hidden absolute inset-0 flex flex-col gap-2 px-3 pt-[4.5rem] pb-8">
          <WideKhwaab className="w-full aspect-video shrink-0" />
          <WideFanna className="w-full aspect-video shrink-0" />
          <div className="flex justify-center gap-2 w-full shrink-0">
            <ReelNh7 className="flex-1 aspect-[9/16]" />
            <ReelAditya className="flex-1 aspect-[9/16]" />
            <ReelVichaar className="flex-1 aspect-[9/16]" />
          </div>
        </div>

        {/* Desktop — 16:9 stack same height as Vichaar */}
        <div className="hidden md:flex absolute inset-y-0 right-10 lg:right-16 xl:right-24 items-center gap-5 lg:gap-7">
          <div className="flex flex-col gap-3 lg:gap-4 h-[56vh] lg:h-[64vh] w-[calc((56vh-0.75rem)/2*16/9)] lg:w-[calc((64vh-1rem)/2*16/9)] shrink-0">
            <WideKhwaab className="flex-1 min-h-0 w-full opacity-80" />
            <WideFanna className="flex-1 min-h-0 w-full opacity-80" />
          </div>
          <ReelVichaar className="h-[56vh] lg:h-[64vh] aspect-[9/16] z-[1]" />
          <ReelNh7 className="h-[42vh] lg:h-[48vh] aspect-[9/16] opacity-80" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background/65 md:bg-gradient-to-r md:from-background md:via-background/80 md:to-background/25" />
        <div className="absolute inset-0 film-grain opacity-[0.12] mix-blend-overlay" />
      </div>

      <motion.div style={{ y }} className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 px-6 md:px-10 lg:px-16 max-w-5xl w-full pt-24 hero-ink max-md:absolute max-md:inset-x-0 max-md:top-0 max-md:h-[58%] max-md:pt-0 max-md:flex max-md:flex-col max-md:justify-end max-md:pb-2"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-mono-meta text-primary mb-6 md:mb-8"
        >
          BLUEPOLAROID / CINEMA × CODE × CHAOS
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-display text-[clamp(2.2rem,10vw,8.5rem)] leading-[0.9] font-bold tracking-tighter mb-6 md:mb-8"
        >
          <span className="block">I MAKE</span>
          <span className="block">THINGS THAT</span>
          <span className="block text-primary">MOVE.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="hidden md:block font-body text-base md:text-lg text-muted-foreground max-w-md mb-3"
        >
          Film. Digital. Experiments.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="hidden md:block font-body text-sm md:text-base text-muted-foreground/80 max-w-lg mb-10"
        >
          Somewhere between a camera and a computer.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          onClick={handleEnter}
          className="group inline-flex items-center gap-3 font-display text-sm tracking-[0.2em] uppercase text-foreground border border-foreground/20 px-6 py-3 md:px-8 md:py-4 hover:border-primary hover:text-primary transition-colors duration-300 mt-2 md:mt-0"
        >
          Step into the work
          <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
        </motion.button>
      </motion.div>
    </section>
  );
};

import { useEffect, useRef, useState } from 'react';

/** Short silent loops cut from Raghav's own footage, keyed by the YouTube id or Instagram shortcode. */
const LOCAL_LOOPS: Record<string, string> = {
  DWY8k8Jj79k: 'nh7',
  DbiexjeO0l: 'vichaar',
  DYZpxenwlot: 'aditya',
  DHdxbxSTuAu: 'laksh',
  EWIay_vyFMk: 'khwaab',
  mm48gpsJ9bQ: 'fanna',
};

export const mediaKey = (url: string) =>
  url.match(/(?:embed\/|v=|youtu\.be\/)([\w-]{11})/)?.[1] ??
  url.match(/instagram\.com\/(?:reels?|p)\/([^/?]+)/)?.[1]?.replace(/-$/, '') ??
  '';

const youtubeId = (url: string) => url.match(/(?:embed\/|v=|youtu\.be\/)([\w-]{11})/)?.[1];

/** Where a click should go: the original YouTube video or Instagram post. */
export function sourceUrl(url: string) {
  const id = youtubeId(url);
  if (id) return `https://www.youtube.com/watch?v=${id}`;
  return url.split('?')[0];
}

export function localLoop(url: string): string | undefined {
  const name = LOCAL_LOOPS[mediaKey(url)];
  return name ? `/loops/${name}.mp4` : undefined;
}

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** True while the element is on screen (with a little margin), so only visible tiles play. */
function useInView<T extends Element>(margin = '120px') {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, inView] as const;
}

type Props = {
  url: string;
  image: string;
  alt: string;
  /** Force a specific local loop file (e.g. /loops/premise.mp4). */
  loop?: string;
  className?: string;
};

/**
 * Always-moving media tile: a local silent loop when one exists, otherwise a muted
 * looping YouTube embed while on screen, otherwise the still with a slow push-in.
 */
export function LoopMedia({ url, image, alt, loop, className = '' }: Props) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const src = loop ?? localLoop(url);
  const yt = !src ? youtubeId(url) : undefined;
  const still = reduceMotion();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView && !still) v.play().catch(() => undefined);
    else v.pause();
  }, [inView, still]);

  return (
    <div ref={ref} className={`st-media ${className}`}>
      {src ? (
        <video
          ref={videoRef}
          src={src}
          poster={src.replace('.mp4', '.jpg')}
          muted
          loop
          playsInline
          preload="none"
          aria-label={alt}
        />
      ) : (
        <img src={image} alt={alt} loading="lazy" className={!yt && !still ? 'kb' : undefined} />
      )}
      {yt && inView && !still && (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&mute=1&loop=1&playlist=${yt}&controls=0&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3&disablekb=1&start=12`}
          title={alt}
          allow="autoplay; encrypted-media"
          tabIndex={-1}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

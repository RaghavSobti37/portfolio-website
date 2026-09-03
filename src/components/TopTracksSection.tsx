import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { LazyImage } from '@/components/LazyImage';

const SPOTIFY_PROFILE =
  'https://open.spotify.com/user/314i4j6nzrmctdy5xvhosa4iwvlu';

export const topTracks = [
  {
    name: 'Solo Mission',
    artists: 'The Chainsmokers',
    cover: 'https://i.scdn.co/image/ab67616d0000b273e741cd9dc139d57cc2906186',
    url: 'https://open.spotify.com/track/0oxPA3C0E3zkEDkfYogCb0',
  },
  {
    name: 'Green Lights - demo',
    artists: 'The Chainsmokers',
    cover: 'https://i.scdn.co/image/ab67616d0000b273073de3e169058c0232c98f7f',
    url: 'https://open.spotify.com/track/52KQoDPfvVy1mk4yLXh9hx',
  },
  {
    name: 'Tennis Court',
    artists: 'The Chainsmokers',
    cover:
      'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/88/d8/59/88d85935-dd2f-8b7b-a9e4-752ef669a89e/196872067590.jpg/600x600bb.jpg',
    url: 'https://open.spotify.com/track/4uUG5RXrOk84mYEfFvj3cK',
  },
  {
    name: '505',
    artists: 'Arctic Monkeys',
    cover: 'https://i.scdn.co/image/ab67616d0000b273b1f8da74f225fa1225cdface',
    url: 'https://open.spotify.com/track/0BxE4FqsDD1Ot4YuBXwAPp',
  },
  {
    name: 'The Fall',
    artists: 'The Chainsmokers, Ship Wrek',
    cover: 'https://i.scdn.co/image/ab67616d0000b273e741cd9dc139d57cc2906186',
    url: 'https://open.spotify.com/track/5FvGI8KtImlEbOsvEW3pfX',
  },
];

export const TopTracksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-20 md:py-28 border-t border-border" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <p className="font-mono-meta text-primary mb-2">ON REPEAT · LONG TERM</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
              Five that stick
            </h2>
          </div>
          <a
            href={SPOTIFY_PROFILE}
            target="_blank"
            rel="noreferrer"
            className="font-mono-meta text-muted-foreground hover:text-primary"
          >
            SPOTIFY PROFILE ↗
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {topTracks.map((track, i) => (
            <motion.a
              key={track.name}
              href={track.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07 }}
              className="group border border-border bg-secondary/20 hover:border-primary/50 transition-colors overflow-hidden"
            >
              <div className="aspect-square overflow-hidden bg-ink relative">
                <LazyImage
                  src={track.cover}
                  alt={`${track.name} album cover`}
                  shellClassName="absolute inset-0"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 font-mono text-[10px] text-paper bg-ink/60 px-1.5 py-0.5">
                  0{i + 1}
                </span>
              </div>
              <div className="p-3 md:p-4">
                <p className="font-display text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {track.name}
                </p>
                <p className="font-body text-xs text-muted-foreground mt-1 line-clamp-1">
                  {track.artists}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

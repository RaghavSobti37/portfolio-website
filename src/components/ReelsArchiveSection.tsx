import { motion, useInView } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { ExternalLink, Instagram, Play } from 'lucide-react';
import {
  reels,
  reelSeries,
  getReelEmbedUrl,
  getReelThumbnailUrl,
  reelViews,
  type Reel,
} from '@/data/reels';
import { LazyImage } from '@/components/LazyImage';

const ReelThumb = ({ reel, index }: { reel: Reel; index: number }) => {
  const [failed, setFailed] = useState(false);
  const thumb = getReelThumbnailUrl(reel.url);

  return (
    <div className="aspect-[9/16] bg-ink relative overflow-hidden">
      {thumb && !failed ? (
        <LazyImage
          src={thumb}
          alt={reel.title}
          shellClassName="absolute inset-0"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#833AB4]/40 via-[#FD1D1D]/30 to-[#F77737]/40 flex flex-col justify-between p-4">
          <Instagram className="w-4 h-4 text-paper/70" />
          <p className="font-display text-paper text-sm font-semibold leading-tight line-clamp-4">
            {reel.title}
          </p>
        </div>
      )}
      <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/40 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="w-12 h-12 rounded-full bg-paper/90 flex items-center justify-center">
          <Play className="w-5 h-5 text-ink fill-current ml-0.5" />
        </span>
      </div>
      <span className="absolute top-3 left-3 orange-dot" />
      <p className="absolute bottom-3 left-3 font-mono text-[9px] text-paper/80 bg-ink/50 px-1.5 py-0.5">
        REEL_{String(index + 1).padStart(3, '0')}
      </p>
    </div>
  );
};

export const ReelsArchiveSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [series, setSeries] = useState('all');
  const [active, setActive] = useState<Reel | null>(null);
  const [visible, setVisible] = useState(12);

  const filtered = useMemo(() => {
    const pool = series === 'all' ? reels : reels.filter((r) => r.series === series);
    return [...pool].sort((a, b) => reelViews(b) - reelViews(a) || a.id.localeCompare(b.id));
  }, [series]);

  const shown = filtered.slice(0, visible);

  return (
    <section id="archive" className="py-24 md:py-32 relative border-t border-border" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <p className="font-mono-meta text-primary mb-3">ARCHIVE · REELS</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Things I shot for the{' '}
            <span className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] bg-clip-text text-transparent">
              gram
            </span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl">
            Client &amp; artist reels — Rohith Sobti, Havells mYOUsic, Weekly Beat, TSC Academy,
            HarshaDuhita Collective, and more. Ordered by views.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-10">
          {reelSeries.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setSeries(s.id);
                setVisible(12);
              }}
              className={`font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 border transition-colors ${
                series === s.id
                  ? 'border-accent text-accent bg-accent/10'
                  : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {shown.map((reel, i) => (
            <motion.button
              key={reel.id}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 8) * 0.03 }}
              onClick={() => setActive(reel)}
              className="group text-left polaroid-frame !p-1.5 relative hover:shadow-lift transition-shadow"
              style={{ rotate: i % 3 === 0 ? '-0.8deg' : i % 3 === 1 ? '1deg' : '0deg' }}
            >
              <ReelThumb reel={reel} index={i} />
              <div className="px-1 pt-2 pb-1">
                <p className="font-display text-ink text-xs font-semibold truncate uppercase">
                  {reel.title}
                </p>
                <p className="font-mono text-[9px] text-ink/45 mt-0.5">
                  {reel.role} · {reel.year}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {filtered.length > visible && (
          <div className="text-center mt-12">
            <button
              type="button"
              onClick={() => setVisible((v) => v + 12)}
              className="font-mono-meta text-primary border border-primary/40 px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              LOAD MORE REELS
            </button>
          </div>
        )}
      </div>

      {active && (
        <div className="fixed inset-0 z-[100] bg-ink/95 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setActive(null)}
            className="absolute top-5 right-5 font-mono-meta text-paper hover:text-accent"
          >
            CLOSE ×
          </button>
          <div className="w-full max-w-md">
            <div className="aspect-[9/16] bg-black overflow-hidden mb-4">
              <iframe
                src={getReelEmbedUrl(active.url)}
                title={active.title}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-bold">{active.title}</h3>
                <p className="font-mono-meta mt-1">
                  {active.role} · {active.year}
                </p>
                {active.note && (
                  <p className="font-body text-sm text-muted-foreground mt-2">{active.note}</p>
                )}
              </div>
              <a
                href={active.url}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:text-accent"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

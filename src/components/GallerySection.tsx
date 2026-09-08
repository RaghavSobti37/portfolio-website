import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, useState } from 'react';
import { RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { photos, photoLabel, type Photo } from '@/data/photos';
import { LazyImage } from '@/components/LazyImage';

/** Fisher–Yates — new order each page load / reshuffle */
function shufflePhotos(list: Photo[]): Photo[] {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [ordered, setOrdered] = useState(() => shufflePhotos(photos));
  const [shuffleKey, setShuffleKey] = useState(0);
  const [visibleCount, setVisibleCount] = useState(18);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [lightboxReady, setLightboxReady] = useState(false);

  const displayedPhotos = showAll ? ordered : ordered.slice(0, visibleCount);

  const reshuffle = () => {
    setOrdered(shufflePhotos(photos));
    setShuffleKey((k) => k + 1);
    setSelectedIndex(null);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.35 },
    },
  };

  const openPhoto = (index: number) => {
    setLightboxReady(false);
    setSelectedIndex(index);
  };

  const selectedPhoto = selectedIndex !== null ? ordered[selectedIndex] : null;
  const selectedLabel = selectedIndex !== null ? photoLabel(selectedIndex) : '';

  return (
    <section id="gallery" className="py-24 md:py-32 relative border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-mono-meta text-primary mb-3">ARCHIVE · STILLS</p>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-3">
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
              Through the lens
            </h2>
            <button
              type="button"
              onClick={reshuffle}
              className="font-mono text-[10px] tracking-wider uppercase inline-flex items-center gap-2 border border-border text-muted-foreground hover:border-primary hover:text-primary px-3 py-2 transition-colors shrink-0 mb-1 md:mb-2"
              aria-label="Shuffle gallery grid"
            >
              <RefreshCw size={12} aria-hidden />
              New grid
            </button>
          </div>
          <p className="font-body text-muted-foreground max-w-lg">
            Frames from around the work — kept in their original ratios.
          </p>
        </motion.div>

        <motion.div
          key={shuffleKey}
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2 [column-fill:_balance]"
        >
          {displayedPhotos.map((photo, index) => {
            const label = photoLabel(index);
            return (
              <motion.button
                key={photo.id}
                type="button"
                variants={itemVariants}
                onClick={() => openPhoto(index)}
                className="group relative mb-2 w-full break-inside-avoid overflow-hidden bg-card block text-left"
              >
                <LazyImage
                  src={photo.src}
                  alt={label}
                  shellClassName="w-full"
                  className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <div className="absolute inset-0 z-[2] bg-ink/0 group-hover:bg-ink/40 transition-colors flex items-end p-2 opacity-0 group-hover:opacity-100 pointer-events-none">
                  <p className="font-mono text-[9px] text-paper tracking-wider">{label}</p>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {!showAll && ordered.length > visibleCount && (
          <div className="text-center mt-12 flex justify-center gap-4">
            <Button
              onClick={() => setVisibleCount((prev) => prev + 18)}
              variant="outline"
              className="font-mono-meta border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none"
            >
              LOAD MORE
            </Button>
            <Button
              onClick={() => setShowAll(true)}
              className="font-mono-meta rounded-none bg-primary"
            >
              SHOW ALL
            </Button>
          </div>
        )}

        {showAll && (
          <div className="text-center mt-12">
            <Button
              onClick={() => {
                setShowAll(false);
                setVisibleCount(18);
              }}
              variant="outline"
              className="font-mono-meta border-primary text-primary rounded-none"
            >
              SHOW LESS
            </Button>
          </div>
        )}
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[100] bg-ink/95 flex flex-col items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            className="absolute top-5 right-5 text-paper hover:text-accent z-10"
            aria-label="Close"
            type="button"
            onClick={() => setSelectedIndex(null)}
          >
            <X size={28} />
          </button>
          {!lightboxReady && (
            <div
              aria-hidden
              className="absolute inset-0 m-auto w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin"
            />
          )}
          <img
            src={selectedPhoto.src}
            alt={selectedLabel}
            className={`max-h-[85vh] max-w-full object-contain transition-opacity duration-300 ${
              lightboxReady ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setLightboxReady(true)}
            onClick={(e) => e.stopPropagation()}
          />
          <p className="mt-3 font-mono text-[10px] tracking-wider text-paper/70">{selectedLabel}</p>
        </div>
      )}
    </section>
  );
};

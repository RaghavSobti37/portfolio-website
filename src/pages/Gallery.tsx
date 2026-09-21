import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, RefreshCw, X } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { LazyImage } from '@/components/LazyImage';
import { FooterSection } from '@/components/FooterSection';
import { allPhotos, photoLabel, type Photo } from '@/data/photos';

/** Fisher–Yates — new order each page load / reshuffle */
function shufflePhotos(list: Photo[]): Photo[] {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.015 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
};

const Gallery = () => {
  const [ordered, setOrdered] = useState(() => shufflePhotos(allPhotos));
  const [shuffleKey, setShuffleKey] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [lightboxReady, setLightboxReady] = useState(false);

  const reshuffle = () => {
    setOrdered(shufflePhotos(allPhotos));
    setShuffleKey((k) => k + 1);
    setSelectedIndex(null);
  };

  const openPhoto = (index: number) => {
    setLightboxReady(false);
    setSelectedIndex(index);
  };

  const step = useMemo(
    () => (delta: number) => {
      setSelectedIndex((current) => {
        if (current === null) return current;
        setLightboxReady(false);
        return (current + delta + ordered.length) % ordered.length;
      });
    },
    [ordered.length]
  );

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedIndex, step]);

  const selectedPhoto = selectedIndex !== null ? ordered[selectedIndex] : null;
  const selectedLabel = selectedIndex !== null ? photoLabel(selectedIndex) : '';

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Seo
        title="Photo Gallery | Raghav Raj Sobti (BluePolaroid) — Photography Archive"
        description="Full photography archive of Raghav Raj Sobti (BluePolaroid) — stills from shoots, music films, live events and the Instagram archive."
        path="/gallery"
      />

      <header className="fixed top-0 left-0 right-0 z-50 glass py-3">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="font-display text-xl md:text-2xl font-bold tracking-tight">
            BLUE<span className="text-primary">POLAROID</span>
          </Link>
          <Link
            to="/"
            className="font-mono text-[10px] tracking-wider uppercase inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={12} aria-hidden />
            Back home
          </Link>
        </div>
      </header>

      <main className="pt-28 md:pt-32 pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="font-mono-meta text-primary mb-3">FULL ARCHIVE · STILLS</p>
            <div className="flex flex-wrap items-end justify-between gap-4 mb-3">
              <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
                The photo gallery
              </h1>
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
              Every frame in one place — site archive plus the Instagram feed and highlights.{' '}
              {allPhotos.length} photos, original ratios.
            </p>
          </motion.div>

          <motion.div
            key={shuffleKey}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2 [column-fill:_balance]"
          >
            {ordered.map((photo, index) => {
              const label = photoLabel(index);
              return (
                <motion.button
                  key={photo.src}
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
        </div>
      </main>

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
          <button
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-paper/70 hover:text-accent z-10 p-2"
            aria-label="Previous photo"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
          >
            <ChevronLeft size={32} />
          </button>
          <button
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-paper/70 hover:text-accent z-10 p-2"
            aria-label="Next photo"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
          >
            <ChevronRight size={32} />
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
          <p className="mt-3 font-mono text-[10px] tracking-wider text-paper/70">
            {selectedLabel} / {String(ordered.length).padStart(3, '0')}
          </p>
        </div>
      )}

      <FooterSection />
    </div>
  );
};

export default Gallery;

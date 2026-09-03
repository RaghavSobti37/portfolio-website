import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { photos, photoCategories } from '@/data/photos';

export const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(18);
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[0] | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filteredPhotos = photos.filter(
    (photo) => activeCategory === 'all' || photo.category === activeCategory
  );

  const displayedPhotos = showAll ? filteredPhotos : filteredPhotos.slice(0, visibleCount);

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
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-3">
            Through the lens
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mb-8">
            Portraits, places, sets — frames from around the work.
          </p>

          <div className="flex flex-wrap gap-2">
            {photoCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setVisibleCount(18);
                  setShowAll(false);
                }}
                className={`font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 border transition-colors ${
                  activeCategory === cat.id
                    ? 'border-accent text-accent bg-accent/10'
                    : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1"
        >
          {displayedPhotos.map((photo, index) => (
            <motion.button
              key={photo.id}
              type="button"
              variants={itemVariants}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative overflow-hidden bg-card aspect-square"
            >
              <img
                src={photo.src}
                alt={photo.title || `Still ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/45 transition-colors flex items-end p-2 opacity-0 group-hover:opacity-100">
                <p className="font-mono text-[9px] text-paper tracking-wider">
                  {String(index + 1).padStart(4, '0')}
                  {photo.category ? ` / ${photo.category.toUpperCase()}` : ''}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {!showAll && filteredPhotos.length > visibleCount && (
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
          className="fixed inset-0 z-[100] bg-ink/95 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute top-5 right-5 text-paper hover:text-accent"
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <img
            src={selectedPhoto.src}
            alt={selectedPhoto.title}
            className="max-h-[85vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { photos, photoCategories } from '@/data/photos';

export const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filteredPhotos = photos.filter(
    (photo) => activeCategory === 'all' || photo.category === activeCategory
  );

  const displayedPhotos = showAll ? filteredPhotos : filteredPhotos.slice(0, visibleCount);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section id="gallery" className="py-24 md:py-32 relative bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-display text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Photography
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
            Photo <span className="text-gradient">Gallery</span>
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {photoCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setVisibleCount(12);
                  setShowAll(false);
                }}
                className={`font-display text-sm tracking-widest uppercase px-5 py-2 rounded-sm transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Photo Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className={showAll 
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            : "columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
          }
        >
          {displayedPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              variants={itemVariants}
              className={`group cursor-pointer ${showAll ? '' : 'break-inside-avoid'}`}
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className={`relative overflow-hidden rounded-lg bg-card ${showAll ? 'aspect-square' : ''}`}>
                <img
                  src={photo.src}
                  alt={photo.title}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${showAll ? 'h-full' : 'h-auto'}`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-display text-sm text-foreground line-clamp-2">
                    {photo.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All / Load More Buttons */}
        {!showAll && filteredPhotos.length > visibleCount && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12 flex justify-center gap-4"
          >
            <Button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              variant="outline"
              className="font-display tracking-widest uppercase border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Load More Photos
            </Button>
            <Button
              onClick={() => setShowAll(true)}
              variant="default"
              className="font-display tracking-widest uppercase"
            >
              View All Photos
            </Button>
          </motion.div>
        )}

        {showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <Button
              onClick={() => {
                setShowAll(false);
                setVisibleCount(12);
              }}
              variant="outline"
              className="font-display tracking-widest uppercase border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Show Less
            </Button>
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute top-6 right-6 p-2 rounded-full bg-secondary hover:bg-primary transition-colors"
            onClick={() => setSelectedPhoto(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={selectedPhoto.src}
            alt={selectedPhoto.title}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <p className="font-display text-lg text-foreground">{selectedPhoto.title}</p>
          </div>
        </motion.div>
      )}
    </section>
  );
};

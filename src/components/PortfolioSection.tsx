import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play, ExternalLink, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { projects, projectCategories, type Project } from '@/data/projects';

type GridSize = 'small' | 'medium' | 'large' | 'tall' | 'wide';

// Get grid size based on platform - Instagram is vertical (tall), YouTube is horizontal (wide)
const getGridSizeByPlatform = (platform: 'youtube' | 'instagram'): GridSize => {
  return platform === 'instagram' ? 'tall' : 'wide';
};

// Helper to get grid classes based on size
const getGridClasses = (size: GridSize): string => {
  switch (size) {
    case 'tall':
      return 'md:row-span-2'; // Vertical for Instagram
    case 'wide':
      return 'md:col-span-2'; // Horizontal for YouTube
    default:
      return 'md:col-span-1 md:row-span-1';
  }
};

// Convert Instagram URL to embed URL
const getInstagramEmbedUrl = (url: string): string => {
  // Extract the reel ID and create embed URL
  const match = url.match(/instagram\.com\/reel\/([^/?]+)/);
  if (match) {
    return `https://www.instagram.com/reel/${match[1]}/embed`;
  }
  return url;
};

export const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(8);
  const [loadedEmbeds, setLoadedEmbeds] = useState<number[]>([]);

  const filteredItems = projects.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const handleLoadEmbed = (id: number) => {
    setLoadedEmbeds((prev) => [...prev, id]);
  };

  const openExternalLink = (item: Project) => {
    if (item.platform === 'instagram') {
      window.open(item.videoUrl, '_blank');
    } else {
      // Convert embed URL to watch URL for YouTube
      const watchUrl = item.videoUrl.replace('/embed/', '/watch?v=').split('?')[0];
      window.open(watchUrl.includes('watch') ? watchUrl : item.videoUrl, '_blank');
    }
  };

  return (
    <section id="work" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-display text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Portfolio
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
            Selected <span className="text-gradient">Works</span>
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {projectCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setVisibleCount(8);
                }}
                className={`font-display text-xs md:text-sm tracking-widest uppercase px-4 py-2 rounded-sm transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Grid - Masonry Puzzle Layout */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] md:auto-rows-[220px] lg:auto-rows-[240px] gap-1"
        >
          {filteredItems.slice(0, visibleCount).map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              layout
              className={`group relative overflow-hidden bg-card ${getGridClasses(getGridSizeByPlatform(item.platform))}`}
            >
              {/* Loaded Embed Content */}
              {loadedEmbeds.includes(item.id) ? (
                <div className="absolute inset-0">
                  {item.platform === 'youtube' && (
                    <iframe
                      src={`${item.videoUrl}?autoplay=1`}
                      title={item.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  )}
                  {item.platform === 'instagram' && (
                    <iframe
                      src={getInstagramEmbedUrl(item.videoUrl)}
                      title={item.title}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  )}
                </div>
              ) : (
                <>
                  {/* Thumbnail */}
                  <div className="absolute inset-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-display text-xs tracking-widest uppercase text-accent">
                        {item.category}
                      </span>
                      <span className="text-xs text-muted-foreground">• {item.year}</span>
                    </div>
                    <h3 className="font-display text-lg md:text-xl font-semibold mb-1 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="font-body text-xs text-primary mb-1">{item.role}</p>
                    <p className="font-body text-xs md:text-sm text-muted-foreground mb-4 line-clamp-2 hidden md:block">
                      {item.description}
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleLoadEmbed(item.id)}
                        className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-accent transition-colors"
                      >
                        <Play className="w-4 h-4 text-primary-foreground" fill="currentColor" />
                      </button>
                      <button
                        onClick={() => openExternalLink(item)}
                        className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-foreground" />
                      </button>
                    </div>
                  </div>

                  {/* Platform Badge */}
                  <div className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm">
                    {item.platform === 'youtube' ? (
                      <Youtube className="w-4 h-4 text-red-500" />
                    ) : (
                      <Instagram className="w-4 h-4 text-pink-500" />
                    )}
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        {visibleCount < filteredItems.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              variant="outline"
              className="font-display tracking-widest uppercase border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Load More
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

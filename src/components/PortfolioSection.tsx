import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play, ExternalLink, Film, Instagram, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Category = 'all' | 'film' | 'social' | 'web';

type GridSize = 'small' | 'medium' | 'large' | 'tall' | 'wide';

interface PortfolioItem {
  id: number;
  title: string;
  category: 'film' | 'social' | 'web';
  type: string;
  description: string;
  icon: typeof Film;
  embedType?: 'youtube' | 'instagram' | 'image' | 'video';
  embedUrl?: string;
  thumbnail?: string;
  gridSize: GridSize;
}

// Grid size patterns for puzzle layout - cycles through to ensure variety
const gridSizePatterns: GridSize[] = ['large', 'small', 'tall', 'small', 'wide', 'small', 'medium', 'tall'];

const getGridSize = (index: number): GridSize => {
  return gridSizePatterns[index % gridSizePatterns.length];
};

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'The Fifth Wall',
    category: 'film',
    type: 'Short Film',
    description: 'An experimental narrative exploring perception and reality.',
    icon: Film,
    embedType: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/28Mb1cIooGw?si=cZ5zHs2jnqOrDET9',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80',
    gridSize: 'large',
  },
  {
    id: 2,
    title: 'Urban Rhythms',
    category: 'film',
    type: 'Documentary',
    description: 'A visual journey through city soundscapes.',
    icon: Film,
    embedType: 'video',
    embedUrl: 'https://cdn.coverr.co/videos/coverr-filming-a-woman-in-a-studio-6285/1080p.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
    gridSize: 'small',
  },
  {
    id: 3,
    title: 'Brand Story Campaign',
    category: 'social',
    type: 'Instagram Reel',
    description: 'Viral content series for lifestyle brand.',
    icon: Instagram,
    embedType: 'instagram',
    embedUrl: 'https://www.instagram.com/reel/DGsNRvwtlX4/embed',
    thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80',
    gridSize: 'tall',
  },
  {
    id: 4,
    title: 'Product Launch',
    category: 'social',
    type: 'TikTok Series',
    description: 'High-engagement vertical content.',
    icon: Instagram,
    embedType: 'video',
    embedUrl: 'https://cdn.coverr.co/videos/coverr-woman-taking-a-video-of-food-1567/1080p.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=800&q=80',
    gridSize: 'small',
  },
  {
    id: 5,
    title: 'Studio Portfolio',
    category: 'web',
    type: 'React Website',
    description: 'Full-stack portfolio with CMS.',
    icon: Globe,
    embedType: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    gridSize: 'wide',
  },
  {
    id: 6,
    title: 'E-Commerce Platform',
    category: 'web',
    type: 'Next.js App',
    description: 'High-performance online store.',
    icon: Globe,
    embedType: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    gridSize: 'small',
  },
  {
    id: 7,
    title: 'Cinematic Wedding',
    category: 'film',
    type: 'Wedding Film',
    description: 'Emotional storytelling for special moments.',
    icon: Film,
    embedType: 'video',
    embedUrl: 'https://cdn.coverr.co/videos/coverr-couple-walking-in-a-lavender-field-4856/1080p.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    gridSize: 'medium',
  },
  {
    id: 8,
    title: 'Coffee Brand Story',
    category: 'social',
    type: 'Content Series',
    description: 'Artisanal coffee brand visual identity.',
    icon: Instagram,
    embedType: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    gridSize: 'tall',
  },
];

// Helper to get grid classes based on size
const getGridClasses = (size: GridSize): string => {
  switch (size) {
    case 'large':
      return 'md:col-span-2 md:row-span-2';
    case 'tall':
      return 'md:row-span-2';
    case 'wide':
      return 'md:col-span-2';
    case 'medium':
      return 'md:col-span-1 md:row-span-1';
    case 'small':
    default:
      return 'md:col-span-1 md:row-span-1';
  }
};

const categories = [
  { id: 'all', label: 'All Work' },
  { id: 'film', label: 'Filmmaking' },
  { id: 'social', label: 'Social Media' },
  { id: 'web', label: 'Web Projects' },
];

export const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [visibleCount, setVisibleCount] = useState(6);
  const [loadedEmbeds, setLoadedEmbeds] = useState<number[]>([]);

  const filteredItems = portfolioItems.filter(
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
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as Category)}
                className={`font-display text-sm tracking-widest uppercase px-6 py-2 rounded-sm transition-all duration-300 ${
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
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] md:auto-rows-[220px] lg:auto-rows-[240px]"
        >
          {filteredItems.slice(0, visibleCount).map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              layout
              className={`group relative overflow-hidden bg-card-gradient ${getGridClasses(item.gridSize)}`}
            >
              {/* Loaded Embed Content */}
              {loadedEmbeds.includes(item.id) ? (
                <div className="absolute inset-0">
                  {item.embedType === 'youtube' && (
                    <iframe
                      src={item.embedUrl}
                      title={item.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  )}
                  {item.embedType === 'instagram' && (
                    <iframe
                      src={item.embedUrl}
                      title={item.title}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  )}
                  {item.embedType === 'video' && (
                    <video
                      src={item.embedUrl}
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      muted
                    />
                  )}
                  {item.embedType === 'image' && (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ) : (
                <>
                  {/* Thumbnail */}
                  <div className="absolute inset-0">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-secondary/50">
                        <item.icon className="w-12 h-12 text-primary/30" />
                      </div>
                    )}
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="font-display text-xs tracking-widest uppercase text-accent mb-2">
                      {item.type}
                    </span>
                    <h3 className="font-display text-xl font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    <div className="flex gap-3">
                      {(item.embedType === 'youtube' || item.embedType === 'video' || item.embedType === 'instagram') && (
                        <button
                          onClick={() => handleLoadEmbed(item.id)}
                          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-accent transition-colors"
                        >
                          <Play className="w-4 h-4 text-primary-foreground" fill="currentColor" />
                        </button>
                      )}
                      <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary transition-colors">
                        <ExternalLink className="w-4 h-4 text-foreground" />
                      </button>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-sm bg-background/80 backdrop-blur-sm">
                    <span className="font-display text-xs tracking-wider uppercase text-muted-foreground">
                      {item.category}
                    </span>
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
              onClick={() => setVisibleCount((prev) => prev + 6)}
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

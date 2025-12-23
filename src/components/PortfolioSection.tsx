import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play, ExternalLink, Film, Instagram, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Category = 'all' | 'film' | 'social' | 'web';

const portfolioItems = [
  {
    id: 1,
    title: 'The Fifth Wall',
    category: 'film',
    type: 'Short Film',
    description: 'An experimental narrative exploring perception and reality.',
    icon: Film,
  },
  {
    id: 2,
    title: 'Urban Rhythms',
    category: 'film',
    type: 'Documentary',
    description: 'A visual journey through city soundscapes.',
    icon: Film,
  },
  {
    id: 3,
    title: 'Brand Story Campaign',
    category: 'social',
    type: 'Instagram Reels',
    description: 'Viral content series for lifestyle brand.',
    icon: Instagram,
  },
  {
    id: 4,
    title: 'Product Launch',
    category: 'social',
    type: 'TikTok Series',
    description: 'High-engagement vertical content.',
    icon: Instagram,
  },
  {
    id: 5,
    title: 'Studio Portfolio',
    category: 'web',
    type: 'React Website',
    description: 'Full-stack portfolio with CMS.',
    icon: Globe,
  },
  {
    id: 6,
    title: 'E-Commerce Platform',
    category: 'web',
    type: 'Next.js App',
    description: 'High-performance online store.',
    icon: Globe,
  },
];

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

        {/* Portfolio Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.slice(0, visibleCount).map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              layout
              className="group relative aspect-[4/3] rounded-sm overflow-hidden bg-card-gradient border border-border cursor-pointer"
            >
              {/* Placeholder Content */}
              <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
                <item.icon className="w-12 h-12 text-primary/30 group-hover:text-accent/50 transition-colors duration-300" />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

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
                  {item.category === 'film' && (
                    <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-accent transition-colors">
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

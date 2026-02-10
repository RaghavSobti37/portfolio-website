import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CodingHero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleScrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated code background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/50 to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        
        {/* Floating code snippets */}
        <motion.div
          animate={{ y: [0, -15, 0], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-10 font-mono text-xs text-accent/10 whitespace-pre hidden md:block"
        >
{`const App = () => {
  return <World />;
};`}
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.05, 0.08, 0.05] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          className="absolute bottom-32 right-16 font-mono text-xs text-primary/10 whitespace-pre hidden md:block"
        >
{`useEffect(() => {
  buildSomethingGreat();
}, []);`}
        </motion.div>

        {/* Film grain */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')]" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm"
        >
          <Terminal className="w-4 h-4 text-accent" />
          <span className="font-display text-xs tracking-[0.2em] uppercase text-accent">
            Creative Technologist
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="block">Building Digital.</span>
          <span className="block text-gradient">Crafting Experiences.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-lg md:text-xl text-muted-foreground mb-8 tracking-wide"
        >
          React.js{' '}
          <span className="text-accent">•</span>{' '}
          Next.js{' '}
          <span className="text-accent">•</span>{' '}
          UI/UX Design
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button
            onClick={handleScrollToProjects}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-display tracking-widest uppercase px-10 py-6 text-sm rounded-sm transition-all duration-300 hover:shadow-glow"
          >
            View Projects
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 cursor-pointer group"
            onClick={handleScrollToProjects}
          >
            <span className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground group-hover:text-accent transition-colors">
              Scroll
            </span>
            <ChevronDown className="w-5 h-5 text-accent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

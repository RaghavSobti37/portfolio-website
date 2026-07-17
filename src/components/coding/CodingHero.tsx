import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Code2, Github, Terminal, Workflow, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CodingHero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleScrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const proofPoints = [
    { icon: Code2, label: 'Interactive apps', value: 'React + TypeScript' },
    { icon: Workflow, label: 'Workflow systems', value: 'Automation + APIs' },
    { icon: Zap, label: 'Product utilities', value: 'Resume + mailer tools' },
  ];

  const featuredBuilds = ['Auto Mailer', 'CoreKnot', 'Photo Cleaner App', 'Resume Generator'];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-32">
      {/* Animated code background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/50 to-background" />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.14, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
        />
        
        {/* Floating code snippets */}
        <motion.div
          animate={{ y: [0, -15, 0], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-10 font-mono text-xs text-accent/15 whitespace-pre hidden md:block"
        >
{`const App = () => {
  return <World />;
};`}
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          className="absolute bottom-32 right-16 font-mono text-xs text-primary/15 whitespace-pre hidden md:block"
        >
{`useEffect(() => {
  buildSomethingGreat();
}, []);`}
        </motion.div>
        <motion.div
          animate={{ y: [5, -10, 5], opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 9, repeat: Infinity, delay: 4 }}
          className="absolute top-1/2 right-1/4 font-mono text-xs text-accent/10 whitespace-pre hidden lg:block"
        >
{`const deploy = async () => {
  await magic();
};`}
        </motion.div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(hsl(var(--accent) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent) / 0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
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
          <motion.span
            className="block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Products That Work.
          </motion.span>
          <motion.span
            className="block text-gradient"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            Systems That Scale.
          </motion.span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="font-body text-lg md:text-xl text-muted-foreground mb-8 tracking-wide"
        >
          Next.js{' '}
          <motion.span
            className="text-accent inline-block"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >•</motion.span>{' '}
          APIs{' '}
          <motion.span
            className="text-accent inline-block"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          >•</motion.span>{' '}
          Automation
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="font-body text-base md:text-lg text-muted-foreground/90 leading-relaxed max-w-3xl mx-auto mb-8"
        >
          I build practical web tools, AI-assisted workflows and lightweight
          operations systems that turn scattered work into usable products.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.02 }}
          className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto mb-8"
        >
          {featuredBuilds.map((build) => (
            <span
              key={build}
              className="rounded-full border border-accent/20 bg-background/70 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-accent/80 backdrop-blur"
            >
              {build}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto mb-10"
        >
          {proofPoints.map((point) => (
            <div
              key={point.label}
              className="border border-accent/20 bg-accent/5 backdrop-blur-sm px-5 py-4 text-left"
            >
              <point.icon className="w-5 h-5 text-accent mb-3" />
              <p className="font-display text-xs tracking-[0.24em] uppercase text-muted-foreground">
                {point.label}
              </p>
              <p className="font-display text-sm md:text-base text-foreground mt-1">
                {point.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              onClick={handleScrollToProjects}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-display tracking-widest uppercase px-10 py-6 text-sm rounded-sm transition-all duration-300 hover:shadow-glow gap-2"
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </Button>
            <a href="https://github.com/RaghavSobti37" target="_blank" rel="noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="border-accent/30 text-accent hover:bg-accent/10 font-display tracking-widest uppercase px-10 py-6 text-sm rounded-sm gap-2"
              >
                <Github className="w-4 h-4" />
                GitHub
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
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

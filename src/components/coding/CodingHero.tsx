import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Code2, Github, Terminal, Workflow, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CodingHero = () => {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/50 to-background" />
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(hsl(var(--accent) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent) / 0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 mb-6 rounded-full border border-accent/25 bg-accent/10 px-4 py-2 backdrop-blur-sm">
              <Terminal className="h-4 w-4 text-accent" />
              <span className="font-display text-[11px] uppercase tracking-[0.24em] text-accent">
                Creative Technologist
              </span>
            </div>

            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Useful products.<br />
              <span className="text-gradient">Clean systems.</span>
            </h1>

            <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
              I build practical web tools, automation flows and small products that make everyday work feel lighter.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {featuredBuilds.map((build) => (
                <span
                  key={build}
                  className="rounded-full border border-accent/20 bg-background/70 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-accent/80 backdrop-blur"
                >
                  {build}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={handleScrollToProjects}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-display tracking-widest uppercase px-8 py-6 text-sm rounded-sm gap-2"
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Button>
              <a href="https://github.com/RaghavSobti37" target="_blank" rel="noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-accent/30 text-accent hover:bg-accent/10 font-display tracking-widest uppercase px-8 py-6 text-sm rounded-sm gap-2"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-2xl border border-accent/20 bg-background/70 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur md:p-8"
          >
            <div className="flex items-center justify-between">
              <p className="font-display text-[11px] uppercase tracking-[0.3em] text-accent">Current focus</p>
              <span className="rounded-full border border-accent/20 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                Available for builds
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {proofPoints.map((point) => (
                <div key={point.label} className="rounded-xl border border-accent/10 bg-accent/5 p-4">
                  <div className="flex items-start gap-3">
                    <point.icon className="mt-0.5 h-5 w-5 text-accent" />
                    <div>
                      <p className="font-display text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                        {point.label}
                      </p>
                      <p className="mt-1 font-body text-sm text-foreground">{point.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div
          className="flex cursor-pointer flex-col items-center gap-2 group"
          onClick={handleScrollToProjects}
        >
          <span className="font-display text-[11px] uppercase tracking-[0.3em] text-muted-foreground group-hover:text-accent transition-colors">
            Scroll
          </span>
          <ChevronDown className="h-5 w-5 text-accent" />
        </div>
      </motion.div>
    </section>
  );
};

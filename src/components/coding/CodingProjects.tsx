import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { codingProjects } from '@/data/codingProjects';
import { CommitSparkline } from '@/components/coding/CommitSparkline';

export const CodingProjects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [showAll, setShowAll] = useState(false);

  const featured = codingProjects.filter((p) => p.featured);
  const rest = codingProjects.filter((p) => !p.featured);
  const list = showAll ? codingProjects : featured;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section id="projects" className="py-24 md:py-32 relative border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono-meta text-primary mb-3">BUILDS · FROM GITHUB</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Things I also build
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl leading-relaxed">
            Live repos pulled from{' '}
            <a
              href="https://github.com/RaghavSobti37"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:text-accent"
            >
              @RaghavSobti37
            </a>
            . Commit graphs update from GitHub.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-6"
        >
          {list.map((project, index) => (
            <motion.div key={project.id} variants={cardVariants}>
              <div className="group relative border border-border bg-card/40 hover:border-primary/40 transition-colors p-6 md:p-8">
                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                  <div>
                    <div className="flex flex-wrap items-baseline gap-3 mb-3">
                      <span className="font-mono text-[10px] text-accent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      {project.language && (
                        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                          {project.language}
                        </span>
                      )}
                    </div>

                    <p className="font-body text-muted-foreground leading-relaxed max-w-2xl mb-5">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] tracking-wider uppercase border border-border px-2.5 py-1 text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 font-mono-meta text-primary hover:text-accent"
                      >
                        <Github className="w-3.5 h-3.5" />
                        REPO ↗
                      </a>
                      {project.website && (
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 font-mono-meta text-muted-foreground hover:text-primary"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          LIVE ↗
                        </a>
                      )}
                    </div>
                  </div>

                  <CommitSparkline repo={project.repo} weeks={26} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {!showAll && rest.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="font-mono-meta text-primary border border-primary/40 px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              SHOW {rest.length} MORE REPOS
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

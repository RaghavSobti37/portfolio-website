import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { codingProjects, languageColor, type CodingProject } from '@/data/codingProjects';
import { CommitSparkline } from '@/components/coding/CommitSparkline';
import { ProjectPreview } from '@/components/coding/ProjectPreview';

/** CoreKnot first, then website designs (TSC → corp sites with frames), tools last */
const PROJECT_ORDER = [
  'coreknot',
  'tsc',
  'balaji',
  'shrim',
  'destiny',
  'kalla',
  'auto-mailer',
  'woteat',
  'resume-gen',
  'photo-cleaner',
  'ekors',
] as const;

const FEATURED_IDS = new Set(['coreknot', 'tsc', 'balaji', 'shrim', 'destiny']);

function orderedProjects(): CodingProject[] {
  const map = new Map(codingProjects.map((p) => [p.id, p]));
  return PROJECT_ORDER.map((id) => map.get(id)).filter(Boolean) as CodingProject[];
}

export const CodingProjects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [showAll, setShowAll] = useState(false);

  const all = orderedProjects();
  const featured = all.filter((p) => FEATURED_IDS.has(p.id));
  const restCount = all.length - featured.length;
  const list = showAll ? all : featured;

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
            Live repos from{' '}
            <a
              href="https://github.com/RaghavSobti37"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:text-accent"
            >
              @RaghavSobti37
            </a>
            . 16:9 frames from each product — design as shipped.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-6"
        >
          {list.map((project, index) => {
            const langColor = languageColor(project.language);
            return (
              <motion.div key={project.id} variants={cardVariants}>
                <div className="group relative border border-border bg-card/40 hover:border-primary/40 transition-colors overflow-hidden">
                  <div className="grid gap-0 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
                    <div className="relative border-b lg:border-b-0 lg:border-r border-border overflow-hidden bg-[#0a0a0b]">
                      <ProjectPreview project={project} />
                    </div>

                    <div className="p-6 md:p-8 flex flex-col justify-between gap-5">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className="font-mono text-[10px] text-accent">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          {project.language && (
                            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase text-muted-foreground border border-border px-2 py-0.5">
                              <span
                                className="w-2.5 h-2.5 rounded-full shrink-0 ring-1 ring-black/20"
                                style={{ backgroundColor: langColor }}
                                aria-hidden
                              />
                              <span style={{ color: langColor }}>{project.language}</span>
                            </span>
                          )}
                        </div>

                        {project.impact && (
                          <p className="font-body text-foreground/90 leading-relaxed mb-3">
                            {project.impact}
                          </p>
                        )}

                        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                          {project.description}
                        </p>

                        {project.highlights && project.highlights.length > 0 && (
                          <ul className="mb-5 space-y-1.5">
                            {project.highlights.map((h) => (
                              <li
                                key={h}
                                className="flex gap-2 font-mono text-[11px] text-muted-foreground"
                              >
                                <span className="text-accent shrink-0">▸</span>
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        <div className="flex flex-wrap gap-2 mb-5">
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
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {!showAll && restCount > 0 && (
          <div className="text-center mt-12">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="font-mono-meta text-primary border border-primary/40 px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              SHOW {restCount} MORE REPOS
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

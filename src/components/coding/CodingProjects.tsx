import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const codingProjects = [
  {
    id: 1,
    title: 'Auto Mailer',
    description: 'Automation project built to remove repetitive manual effort from outreach and communication workflows through structured email-process design.',
    tech: ['Automation', 'Email Systems', 'Workflow Design'],
    highlights: [
      'Repeated-task elimination for email outreach',
      'Reusable communication workflow structure',
      'Practical operations tool for faster follow-ups',
    ],
    github: 'https://github.com/RaghavSobti37/Auto-Mailer',
    website: '',
    preview: '/gallery/10.jpg',
  },
  {
    id: 2,
    title: 'CoreKnot',
    description: 'A product and workflow systems project focused on connecting core business information, user actions and operational tasks into a cleaner digital experience.',
    tech: ['Product Systems', 'Web Development', 'Operations UX'],
    highlights: [
      'Organizes scattered operational data into clearer flows',
      'Designed around practical business use cases',
      'Built as a foundation for connected internal tools',
    ],
    github: 'https://github.com/RaghavSobti37/CoreKnot',
    website: '',
    preview: '/gallery/11.jpg',
  },
  {
    id: 3,
    title: 'Photo Cleaner App',
    description: 'Streamlit-based photo utility built for practical image-collection cleanup, sorting and lightweight media workflow experimentation.',
    tech: ['Python', 'Streamlit', 'Image Utilities'],
    highlights: [
      'Simple interface for photo cleanup workflows',
      'Python application development with Streamlit',
      'Designed for practical media-library maintenance',
    ],
    github: 'https://github.com/RaghavSobti37/photo-cleaner-app',
    website: '',
    preview: '/gallery/12.jpg',
  },
  {
    id: 4,
    title: 'Resume Generator',
    description: 'Developer-focused tool designed to connect with a GitHub account, import projects and generate structured resumes with AI-assisted project descriptions.',
    tech: ['Web Development', 'GitHub Integration', 'AI-Assisted Writing'],
    highlights: [
      'GitHub project ingestion workflow',
      'AI-supported resume content generation',
      'Clean structured output for developer portfolios',
    ],
    github: 'https://github.com/RaghavSobti37/Resume-Generator',
    website: '',
    preview: '/gallery/13.jpg',
  },
];

export const CodingProjects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="font-display text-sm tracking-[0.3em] uppercase text-accent mb-4">
            Selected Builds
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="font-body text-muted-foreground mt-4 mx-auto max-w-2xl leading-relaxed">
            A curated collection of automation-first and developer-focused tools built to simplify everyday work and turn ideas into practical products.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-8"
        >
          {codingProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-sm border-2 border-accent/10 bg-card-gradient p-8 transition-all duration-300 hover:border-accent/30 md:p-10 card-lift">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 transition-all duration-500 group-hover:from-accent/5 group-hover:to-primary/5" />

                <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                  <div>
                    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="flex-1">
                        <h3 className="font-display text-2xl font-bold transition-colors duration-300 md:text-3xl group-hover:text-accent">
                          {project.title}
                        </h3>
                        <p className="mt-3 max-w-2xl font-body leading-relaxed text-muted-foreground">
                          {project.description}
                        </p>
                      </div>
                      <div className="font-display text-7xl font-bold text-foreground/5 transition-all duration-500 group-hover:opacity-0">
                        0{index + 1}
                      </div>
                    </div>

                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-accent"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <ul className="mb-6 space-y-2">
                      {project.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 font-body text-sm text-muted-foreground">
                          <span className="mt-1 text-accent">▸</span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-3">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer">
                          <Button variant="outline" size="sm" className="border-accent/30 text-accent hover:bg-accent/10 font-display tracking-wider uppercase text-xs gap-2">
                            <Github className="w-4 h-4" />
                            View GitHub
                          </Button>
                        </a>
                      )}
                      {project.website && (
                        <a href={project.website} target="_blank" rel="noreferrer">
                          <Button variant="outline" size="sm" className="border-accent/30 text-accent hover:bg-accent/10 font-display tracking-wider uppercase text-xs gap-2">
                            <ExternalLink className="w-4 h-4" />
                            View Website
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>

                  {project.preview && (
                    <div className="overflow-hidden rounded-2xl border border-accent/15 bg-background/70 p-2 shadow-sm">
                      <img
                        src={project.preview}
                        alt={`${project.title} preview`}
                        className="h-56 w-full rounded-xl object-cover sm:h-64"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

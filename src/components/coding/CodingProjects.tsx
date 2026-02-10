import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Globe } from 'lucide-react';

const codingProjects = [
  {
    id: 1,
    title: 'ERP System – Quotation & User Management',
    description: 'Full-stack system with Role-Based Access Control (RBAC) for tiered user permissions. Secure Token-Based Authentication and modular schemas for automated quotation and ticket tracking.',
    tech: ['Next.js', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    highlights: [
      'Role-Based Access Control (User/Admin/Super-Admin)',
      'Secure Token-Based Authentication',
      'Dynamic management interfaces for real-time CRUD',
    ],
  },
  {
    id: 2,
    title: 'Personal Portfolio Website',
    description: 'High-performance, responsive portfolio featuring advanced Framer Motion animations and page transitions. Integrated EmailJS for serverless communication.',
    tech: ['React.js', 'Framer Motion', 'EmailJS', 'CSS3'],
    highlights: [
      'Advanced animations & page transitions',
      'Serverless client communication',
      'Optimized image pipeline & SEO metadata',
    ],
  },
  {
    id: 3,
    title: 'The Shakti Collective (TSC)',
    description: 'Modern, visually-driven web application utilizing server-side rendering. High-bitrate video backgrounds and interactive UI bridging cinematic art with web technology.',
    tech: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    highlights: [
      'Server-side rendering for performance',
      'High-bitrate video backgrounds',
      'Mobile-first, utility-driven design',
    ],
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
            Portfolio
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Featured <span className="text-gradient">Projects</span>
          </h2>
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
              <div className="relative bg-card-gradient rounded-sm p-8 md:p-10 border-2 border-accent/10 hover:border-accent/30 card-lift overflow-hidden">
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-primary/5 transition-all duration-500" />

                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="font-body text-muted-foreground leading-relaxed mt-3 max-w-2xl">
                        {project.description}
                      </p>
                    </div>
                    {/* Number decoration */}
                    <div className="font-display text-7xl font-bold text-foreground/5 group-hover:text-accent/10 transition-colors duration-500 flex-shrink-0">
                      0{index + 1}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 font-body text-sm text-muted-foreground">
                        <span className="text-accent mt-1">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

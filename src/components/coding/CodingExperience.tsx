import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';

export const CodingExperience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const timelineData = [
    {
      date: 'Mar 2025 - Present',
      title: 'Freelance Creative Technologist',
      description: 'Building web platforms, workflow systems, API integrations and automation for creative-business operations and public-facing digital experiences.',
    },
    {
      date: 'Mar 2025 - Jul 2025',
      title: 'Project Intern - Full-Stack Systems',
      description: 'Developed internal business workflows with role-based permissions, secure authentication and MongoDB-backed data models.',
    },
    {
      date: '2025',
      title: 'Cinematography Programme - New York Film Academy',
      description: 'Completed intensive training in lighting, camera technicalities, storytelling, pacing, set practice, DaVinci Resolve, colour correction and grading.',
    },
    {
      date: '2021 - 2025',
      title: 'B.Tech in Computer Science - BML Munjal University, Gurugram',
      description: 'Comprehensive education in computer science fundamentals, software engineering, and web technologies.',
    },
  ];

  const certifications = [
    {
      title: 'Google Cloud Computing Foundations: Infrastructure in Google Cloud',
      org: 'Google Cloud',
      date: 'Oct 2023',
      tag: 'GCP',
      accent: '#4285F4',
      blurb: 'Cloud infrastructure fundamentals on Google Cloud.',
    },
    {
      title: 'Get Started with Figma',
      org: 'Coursera',
      date: 'Feb 2023',
      tag: 'FIGMA',
      accent: '#A259FF',
      blurb: 'Interface design workflow — frames, components, handoff basics.',
    },
    {
      title: 'Create a Storyboard using Canva',
      org: 'Coursera Project Network',
      date: 'Feb 2023',
      tag: 'CANVA',
      accent: '#00C4CC',
      blurb: 'Visual storytelling and storyboard layout for film / pitch decks.',
    },
  ];

  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-[600px] bg-gradient-to-r from-accent/5 to-transparent" />

      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* About */}
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto text-center mb-20">
            <p className="font-display text-sm tracking-[0.3em] uppercase text-accent mb-4">About</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Raghav Raj <span className="text-gradient">Sobti</span>
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Creative Technologist and Cinematographer building digital products,
              automation workflows and cinematic web experiences. His strongest work
              connects frontend craft, backend systems, APIs and creative operations.
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div variants={itemVariants} className="mb-20">
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-12 tracking-tight">
              EXPERIENCE & EDUCATION
            </h3>

            <div className="relative">
              <div className="absolute left-0 md:left-40 top-0 bottom-0 w-px bg-border" />

              <div className="space-y-8">
                {timelineData.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative flex flex-col md:flex-row gap-4 md:gap-8"
                  >
                    <div className="md:w-36 flex-shrink-0 text-right">
                      <span className="font-display text-sm tracking-wider text-accent font-semibold">
                        {item.date}
                      </span>
                    </div>
                    <div className="absolute left-0 md:left-40 top-1.5 w-3 h-3 -translate-x-1/2 rounded-full bg-accent border-2 border-background" />
                    <div className="pl-6 md:pl-8 pb-8 border-l md:border-l-0 border-border md:border-none">
                      <h4 className="font-display text-xl font-bold text-foreground">{item.title}</h4>
                      <p className="font-body text-muted-foreground leading-relaxed mt-2">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div variants={itemVariants}>
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-12 tracking-tight">
              CERTIFICATIONS
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="overflow-hidden border border-border bg-card/40 group hover:border-primary/40 transition-colors"
                >
                  <div
                    className="relative h-36 flex items-end p-5 border-b border-border"
                    style={{
                      background: `linear-gradient(145deg, ${cert.accent}33 0%, hsl(240 6% 8%) 55%, hsl(240 6% 6%) 100%)`,
                    }}
                  >
                    <div
                      className="absolute top-4 right-4 w-10 h-10 rounded-full opacity-40 blur-xl"
                      style={{ background: cert.accent }}
                    />
                    <span
                      className="font-display text-3xl font-bold tracking-tight"
                      style={{ color: cert.accent }}
                    >
                      {cert.tag}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="font-mono text-[10px] tracking-wider uppercase text-accent mb-2">
                      {cert.org} · {cert.date}
                    </p>
                    <h4 className="font-display text-lg font-bold text-foreground transition-colors group-hover:text-primary leading-snug">
                      {cert.title}
                    </h4>
                    <p className="mt-2 font-body text-sm text-muted-foreground leading-relaxed">
                      {cert.blurb}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

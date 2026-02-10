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
      date: 'Mar 2025 – Present',
      title: 'Freelance Creative Technologist',
      description: 'Developing custom web solutions for various brands. Ensuring usability and enhancing digital presence effectively.',
    },
    {
      date: 'Mar 2025 – Jul 2025',
      title: 'Project Intern — EKORS',
      description: 'Assisted in development of internal tools and projects. Supported achieving key milestones in project delivery.',
    },
  ];

  const educationData = [
    {
      date: '2021 – 2025',
      title: 'B.Tech in Computer Science',
      subtitle: 'BML Munjal University, Gurugram',
    },
    {
      date: '2025',
      title: 'Cinematography Program',
      subtitle: 'New York Film Academy — Academic Excellence Award',
    },
  ];

  const certifications = [
    { title: 'Google Cloud Computing Foundations', org: 'Google', date: 'Jan 2026' },
    { title: 'UI/UX Design Principles', org: 'Online Learning Platform', date: 'Dec 2025' },
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
              Creative Technologist with expertise in visual storytelling and web applications. 
              Proven skills in UI/UX design, fostering collaboration between technical and creative 
              teams to drive impactful digital solutions.
            </p>
          </motion.div>

          {/* Work Experience */}
          <motion.div variants={itemVariants} className="mb-20">
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-12 tracking-tight">
              EXPERIENCE
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

          {/* Education */}
          <motion.div variants={itemVariants} className="mb-20">
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-12 tracking-tight">
              EDUCATION
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {educationData.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-card-gradient rounded-sm p-8 border-2 border-accent/10"
                >
                  <span className="font-display text-sm tracking-wider text-accent font-semibold">{item.date}</span>
                  <h4 className="font-display text-xl font-bold text-foreground mt-2">{item.title}</h4>
                  <p className="font-body text-muted-foreground mt-1">{item.subtitle}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div variants={itemVariants}>
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-12 tracking-tight">
              CERTIFICATIONS
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-card-gradient rounded-sm p-8 border-2 border-accent/10 group hover:border-accent/30 card-lift"
                >
                  <h4 className="font-display text-lg font-bold text-foreground group-hover:text-accent transition-colors">{cert.title}</h4>
                  <p className="font-body text-muted-foreground mt-1">{cert.org} — {cert.date}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

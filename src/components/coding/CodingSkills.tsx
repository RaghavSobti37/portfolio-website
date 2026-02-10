import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Palette, Server, Zap } from 'lucide-react';

const skillCategories = [
  {
    icon: Code2,
    title: 'Frontend',
    skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'CSS3/SASS'],
  },
  {
    icon: Server,
    title: 'Backend',
    skills: ['Node.js', 'Express', 'MongoDB', 'JWT Auth', 'REST APIs', 'PostgreSQL'],
  },
  {
    icon: Palette,
    title: 'Design',
    skills: ['UI/UX Design', 'Figma', 'Responsive Design', 'Design Systems', 'Accessibility', 'Motion Design'],
  },
  {
    icon: Zap,
    title: 'Tools & Other',
    skills: ['Git/GitHub', 'DaVinci Resolve', 'SEO Optimization', 'Performance Tuning', 'EmailJS', 'Vercel'],
  },
];

export const CodingSkills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section id="skills" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="font-display text-sm tracking-[0.3em] uppercase text-accent mb-4">
            Tech Stack
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              className="group relative"
            >
              <div className="relative h-full bg-card-gradient rounded-sm p-8 border-2 border-accent/10 hover:border-accent/30 card-lift overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-primary/5 transition-all duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-sm bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                    <category.icon className="w-7 h-7 text-accent group-hover:text-foreground transition-colors duration-300" />
                  </div>

                  <h3 className="font-display text-xl font-semibold mb-5 group-hover:text-accent transition-colors duration-300">
                    {category.title}
                  </h3>

                  <ul className="space-y-2.5">
                    {category.skills.map((skill) => (
                      <li key={skill} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <span className="font-display tracking-wide">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="absolute top-4 right-4 font-display text-7xl font-bold text-foreground/5 group-hover:text-accent/10 transition-colors duration-500">
                  0{index + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

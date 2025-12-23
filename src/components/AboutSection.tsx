import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { Film, Code, Mic } from 'lucide-react';

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-[600px] bg-gradient-to-r from-primary/5 to-transparent" />

      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-12 md:gap-20 items-center"
        >
          {/* Image Side */}
          <motion.div variants={itemVariants} className="relative">
            <div className="aspect-[4/5] relative rounded-sm overflow-hidden">
              {/* Placeholder with cinematic overlay */}
              <div className="absolute inset-0 bg-card-gradient" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Film className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="font-display text-sm tracking-widest uppercase text-muted-foreground">
                    The Storyteller
                  </p>
                </div>
              </div>
              {/* Film strip decoration */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-background flex gap-1 p-1">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="flex-1 bg-muted rounded-sm" />
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-background flex gap-1 p-1">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="flex-1 bg-muted rounded-sm" />
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 md:right-6 bg-primary px-6 py-4 rounded-sm shadow-lift"
            >
              <p className="font-display text-xs tracking-widest uppercase text-primary-foreground">
                NYFA Class of
              </p>
              <p className="font-display text-3xl font-bold text-primary-foreground">
                2024
              </p>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <p className="font-display text-sm tracking-[0.3em] uppercase text-primary mb-4">
                The Story
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                I am a writer, singer,{' '}
                <span className="text-gradient">and storyteller.</span>
              </h2>
            </div>

            <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
              <p>
                As a proud graduate of the <span className="text-foreground font-semibold">New York Film Academy</span>, 
                I bring a unique perspective to every project—blending the art of cinema with the precision of code.
              </p>
              <p>
                My expertise in <span className="text-accent">DaVinci Resolve</span> allows me to craft 
                clean, narrative-driven content that captivates audiences. But I don't just film—I recite 
                ghazals, tell stories, and weave emotions into every frame.
              </p>
              <p>
                This rare combination makes me not just a filmmaker or a developer, but a 
                <span className="text-foreground font-semibold"> complete creative force</span>.
              </p>
            </div>

            {/* Skills Icons */}
            <div className="flex gap-6 pt-6">
              {[
                { icon: Film, label: 'Cinematography' },
                { icon: Code, label: 'Development' },
                { icon: Mic, label: 'Storytelling' },
              ].map((skill) => (
                <div key={skill.label} className="text-center group">
                  <div className="w-14 h-14 rounded-sm bg-secondary flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors duration-300">
                    <skill.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <p className="font-display text-xs tracking-wider uppercase text-muted-foreground">
                    {skill.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

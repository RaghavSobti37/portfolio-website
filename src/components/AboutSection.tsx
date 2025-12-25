import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const timelineData = [
    {
      date: '2025',
      title: 'New York Film Academy Graduate',
      subtitle: '15 Week Cinematography Course Graduate',
      description: 'Completed an intensive 15-week course, honing skills in lighting, composition, and cinematic storytelling.',
    },
    {
      date: '2025',
      title: 'Director',
      subtitle: '"Ek Kamra" – Music Video',
      description: 'Directed and shot with a minimalist aesthetic and a strong emotional narrative.',
    },
    {
      date: '2024–2025',
      title: 'Videographer',
      subtitle: 'BoxoutFM & Premise',
      items: [
        'Covered live DJ set events & afterparties',
        'Captured underground electronic music culture',
        'Filmed interviews with Laksh Maheshwari, Smoke, Rebel7',
        'Shot BTS for The Sundog Project, Jahnvi, and more',
      ],
    },
    {
      date: '2023–2024',
      title: 'Assistant Director',
      subtitle: 'EBC Originals & ArtisteFirst',
      items: [
        '2nd AD in Riqqat Album launch',
        'Helped with scene setups and creative direction',
        'Worked in Ladakh for the musical film Rooh',
        'Assisted on MV projects like Khwaab, Dhamaal',
      ],
    },
    {
      date: '2022',
      title: 'Intern Assistant Director',
      subtitle: 'Classic Films',
      items: [
        'Pre-production, shot listing, and art direction',
        'Created 4 offline edits for NPS ads',
      ],
    },
  ];

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
        >
          {/* Header */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl md:text-7xl font-bold text-center mb-16 tracking-tight"
          >
            RAGHAV
          </motion.h1>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start mb-20">
            {/* Image Side */}
            <motion.div variants={itemVariants} className="relative order-2 md:order-1">
              <div className="aspect-square relative rounded-sm overflow-hidden bg-secondary">
                <img
                  src="/gallery/i25.jpg"
                  alt="Raghav at work"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
            </motion.div>

            {/* Text Side */}
            <motion.div variants={itemVariants} className="space-y-6 order-1 md:order-2">
              <div className="space-y-4 font-body text-muted-foreground leading-relaxed text-lg">
                <p>
                  A passionate and dedicated cinematographer with hands-on
                  experience, always eager to learn and contribute creative ideas.
                  Skilled in visual storytelling, I aim to bring my expertise to
                  dynamic filmmaking projects and deliver impactful visuals.
                </p>
                <p>
                  My journey in visual arts began with a curiosity about how images
                  can evoke emotions and tell stories. Over the years, I've
                  developed a distinctive style that blends technical precision with
                  artistic expression.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Work Experience Section */}
          <motion.div variants={itemVariants} className="mt-20">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 tracking-tight">
              WORK EXPERIENCE
            </h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-32 top-0 bottom-0 w-px bg-border" />

              <div className="space-y-8">
                {timelineData.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative flex flex-col md:flex-row gap-4 md:gap-8"
                  >
                    {/* Date */}
                    <div className="md:w-28 flex-shrink-0 text-right">
                      <span className="font-display text-sm tracking-wider text-primary font-semibold">
                        {item.date}
                      </span>
                    </div>

                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-32 top-1.5 w-3 h-3 -translate-x-1/2 rounded-full bg-primary border-2 border-background" />

                    {/* Content */}
                    <div className="pl-6 md:pl-8 pb-8 border-l md:border-l-0 border-border md:border-none">
                      <h3 className="font-display text-xl font-bold text-foreground">
                        {item.title}
                      </h3>
                      <h4 className="font-display text-base text-accent mb-2">
                        {item.subtitle}
                      </h4>
                      {item.description && (
                        <p className="font-body text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      )}
                      {item.items && (
                        <ul className="mt-2 space-y-1">
                          {item.items.map((listItem, i) => (
                            <li key={i} className="font-body text-muted-foreground leading-relaxed flex items-start gap-2">
                              <span className="text-primary mt-1.5">•</span>
                              {listItem}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

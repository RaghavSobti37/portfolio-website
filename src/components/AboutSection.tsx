import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const storyTimeline = [
  { year: '2022', line: 'Assistant Director' },
  { year: '2023', line: 'Production / Music Films' },
  { year: '2024', line: 'Artist Stories / Events' },
  { year: '2025', line: 'NYFA Cinematography + Director' },
  { year: '2026', line: 'Cinema × Code' },
];

const experience = [
  {
    date: '2025',
    title: 'Formally trained. Still experimenting.',
    subtitle: '15-week Cinematography — New York Film Academy',
    description:
      'Lighting, camera, storytelling, pacing, set practice, DaVinci Resolve, colour.',
  },
  {
    date: '2025',
    title: 'Director — Ek Kamra',
    subtitle: 'Music film',
    description: 'Minimalist visual study of intimacy, distance and emotional space.',
  },
  {
    date: '2024–25',
    title: 'Videographer & artist storyteller',
    subtitle: 'Live music, interviews, culture',
    description:
      'Jahnvi, Samarpan, Delhi Gate, concerts, festival recaps, short-form artist interviews.',
  },
  {
    date: '2023–24',
    title: 'Assistant direction & production',
    subtitle: 'EBC Originals, ArtisteFirst',
    description: 'RIQQAT, Rooh, Khwaab, Dhamaal, Aabruu — sets, coordination, creative support.',
  },
  {
    date: '2022',
    title: 'Intern AD — Classic Films',
    subtitle: 'NPS ads',
    description: 'Pre-production, shot listing, art direction, offline edits.',
  },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden border-t border-border">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono-meta text-primary mb-6">ABOUT</p>
          <h2 className="font-display text-[clamp(3rem,12vw,8rem)] font-bold tracking-tighter leading-[0.9] mb-8">
            I’M RAGHAV.
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mb-16 leading-relaxed">
            I work somewhere between cinema, technology and whatever interesting thing
            happens in between.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="polaroid-frame max-w-md rotate-[-1.5deg] relative">
              <div className="aspect-square overflow-hidden bg-secondary">
                <img
                  src="/gallery/i25.jpg"
                  alt="Raghav"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-2 px-1 font-mono text-[10px] text-ink/50">
                RAGHAV / BEHIND_CAMERA
              </p>
            </div>
          </motion.div>

          <div className="space-y-6 md:space-y-8">
            {storyTimeline.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-6 items-baseline border-b border-border pb-4"
              >
                <span className="font-mono text-accent text-sm w-12 shrink-0">{t.year}</span>
                <span className="font-display text-xl md:text-2xl font-semibold tracking-tight">
                  {t.line}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono-meta mb-3">PATH · SO FAR</p>
          <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-10">
            The fine print
          </h3>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
            {experience.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-border p-5 md:p-6 hover:border-primary/40 transition-colors"
              >
                <span className="font-mono text-xs text-accent">{item.date}</span>
                <h4 className="font-display text-lg font-semibold mt-2 mb-1">{item.title}</h4>
                <p className="font-mono text-[10px] tracking-wider uppercase text-primary mb-3">
                  {item.subtitle}
                </p>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

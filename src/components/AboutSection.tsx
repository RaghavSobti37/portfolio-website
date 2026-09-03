import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const storyTimeline = [
  { year: '2022', line: 'Assistant Director' },
  { year: '2023', line: 'Production / Music Films' },
  { year: '2024', line: 'Artist Stories / Events' },
  { year: '2025', line: 'NYFA Cinematography + Director' },
  { year: '2026', line: 'Cinema × Code' },
];

/** Vertical path — each step builds on the last */
const path = [
  {
    date: '2022',
    era: '01',
    title: 'Intern AD — Classic Films',
    subtitle: 'NPS ads',
    description: 'First set floors. Pre-pro, shot lists, art direction, offline cuts.',
    beat: 'Learn the floor',
  },
  {
    date: '2023–24',
    era: '02',
    title: 'Assistant direction & production',
    subtitle: 'EBC Originals · ArtisteFirst',
    description: 'RIQQAT, Rooh, Khwaab, Dhamaal, Aabruu — coordination that kept music films moving.',
    beat: 'Ship music films',
  },
  {
    date: '2024–25',
    era: '03',
    title: 'Videographer & artist storyteller',
    subtitle: 'Live music · interviews · culture',
    description: 'Jahnvi, Samarpan, Delhi Gate, festivals, short-form artist interviews — stories that travel.',
    beat: 'Own the frame',
  },
  {
    date: '2025',
    era: '04',
    title: 'Director — Ek Kamra',
    subtitle: 'Music film',
    description: 'Minimalist visual study of intimacy, distance, and emotional space.',
    beat: 'Call the shots',
  },
  {
    date: '2025',
    era: '05',
    title: 'Formally trained. Still experimenting.',
    subtitle: '15-week Cinematography — NYFA',
    description: 'Lighting, camera, pacing, set practice, DaVinci Resolve, colour — craft with grammar.',
    beat: 'Sharpen craft',
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
            I work somewhere between cinema, technology and whatever interesting thing happens in
            between.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start mb-28">
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
              <p className="mt-2 px-1 font-mono text-[10px] text-ink/50">RAGHAV / BEHIND_CAMERA</p>
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
          <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
            How I got here
          </h3>
          <p className="font-body text-muted-foreground max-w-xl mb-12 leading-relaxed">
            Read top → bottom. Each step is a role shift — from set support to calling shots.
          </p>

          <div className="relative max-w-3xl">
            {/* spine */}
            <div
              className="absolute left-[11px] md:left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-primary/50 to-border"
              aria-hidden
            />

            <ol className="space-y-0">
              {path.map((item, i) => (
                <motion.li
                  key={`${item.era}-${item.title}`}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.05 }}
                  className="relative pl-10 md:pl-14 pb-10 last:pb-0"
                >
                  <span
                    className="absolute left-0 top-1.5 w-[23px] h-[23px] md:w-[31px] md:h-[31px] rounded-full border-2 border-accent bg-background flex items-center justify-center"
                    aria-hidden
                  >
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent" />
                  </span>

                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent">
                      {item.era} · {item.date}
                    </span>
                    <span className="font-mono text-[10px] tracking-wider uppercase text-primary/80">
                      {item.beat}
                    </span>
                  </div>
                  <h4 className="font-display text-xl md:text-2xl font-bold tracking-tight mb-1">
                    {item.title}
                  </h4>
                  <p className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground mb-3">
                    {item.subtitle}
                  </p>
                  <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

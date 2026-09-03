import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const capabilities = [
  {
    num: '01',
    title: 'MAKE A FILM',
    items: 'Direction / Cinematography / Music Videos / Ads',
    cta: { label: 'SEE THE GRAM →', href: 'https://www.instagram.com/bluepolaroid05/', external: true },
  },
  {
    num: '02',
    title: 'CAPTURE A MOMENT',
    items: 'Events / Artists / BTS / Interviews',
    cta: {
      label: 'EMAIL ME →',
      href: `mailto:raghavsobti37@gmail.com?subject=${encodeURIComponent('Project inquiry')}`,
      external: false,
    },
  },
  {
    num: '03',
    title: 'BUILD A THING',
    items: 'Websites / Digital Products / Interactive Experiences',
    cta: { label: 'SEE THE BUILDS →', href: '/coding', external: false, route: true },
  },
  {
    num: '04',
    title: 'MAKE IT RUN',
    items: 'APIs / Automation / Workflows',
    cta: { label: 'GITHUB PROFILE →', href: 'https://github.com/RaghavSobti37', external: true },
  },
];

const done = [
  { num: '01', label: 'FILMS' },
  { num: '02', label: 'MUSIC VIDEOS' },
  { num: '03', label: 'LIVE EVENTS' },
  { num: '04', label: 'ARTIST STORIES' },
  { num: '05', label: 'DIGITAL PRODUCTS' },
  { num: '06', label: 'AUTOMATIONS' },
];

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 40, damping: 28, mass: 0.6 });
  const display = useTransform(spring, (v) =>
    Math.floor(v).toLocaleString('en-US')
  );

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  useEffect(() => {
    return display.on('change', (v) => {
      if (ref.current) ref.current.textContent = `${v}+`;
    });
  }, [display]);

  return (
    <span ref={ref} className="tabular-nums">
      0+
    </span>
  );
}

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="lab" className="py-24 md:py-32 relative border-t border-border" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="font-mono-meta text-primary mb-3">WHAT I CAN DO</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-16">
            How we can work together
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-border mb-28">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-background p-8 md:p-12 group hover:bg-secondary/40 transition-colors"
            >
              <span className="font-mono-meta text-accent mb-4 block">{cap.num}</span>
              <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors">
                {cap.title}
              </h3>
              <p className="font-body text-muted-foreground">{cap.items}</p>
              {cap.cta.route ? (
                <Link
                  to={cap.cta.href}
                  className="inline-block mt-6 font-mono-meta text-primary hover:text-accent"
                >
                  {cap.cta.label}
                </Link>
              ) : (
                <a
                  href={cap.cta.href}
                  {...(cap.cta.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="inline-block mt-6 font-mono-meta text-primary hover:text-accent"
                >
                  {cap.cta.label}
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mb-8">
          <p className="font-mono-meta text-primary mb-3">THINGS I’VE DONE</p>
          <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-12">
            Across the board
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 mb-20">
          {done.map((d, i) => (
            <motion.div
              key={d.num}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <span className="font-mono text-accent text-sm">{d.num}</span>
              <p className="font-display text-2xl md:text-4xl font-bold tracking-tight mt-1">
                {d.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-border pt-16 flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
          <p className="font-display text-[clamp(2.8rem,10vw,7rem)] font-bold tracking-tighter leading-none text-primary/90 shrink-0">
            {/* YT embeds ~14.77M + 40 IG reels × ~10k avg ≈ 15.17M → round */}
            <CountUp to={16_000_000} />
          </p>
          <p className="font-body text-muted-foreground max-w-md md:pb-3 text-base md:text-lg leading-relaxed">
            Combined audience across the films, interviews, and reels on this site — about 15.8M
            from YouTube projects plus Instagram archive reach. Rounded. That’s the scale of work already in circulation.
          </p>
        </div>

        {/* Camera ↔ Computer */}
        <div className="mt-28 relative overflow-hidden border border-border">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,hsl(var(--primary)/0.08)_50%,transparent_100%)]" />
          <div className="relative grid md:grid-cols-[1fr_auto_1fr] items-stretch">
            <div className="p-10 md:p-14 border-b md:border-b-0 md:border-r border-border">
              <p className="font-mono-meta mb-3">CAMERA</p>
              <h4 className="font-display text-2xl font-bold tracking-tight mb-3">
                Frames &amp; feeling
              </h4>
              <p className="font-body text-muted-foreground mb-6">
                Grain, light, people. Work that looks shot — not templated.
              </p>
              <a
                href="#work"
                className="font-display text-sm tracking-[0.15em] uppercase text-foreground border border-border px-5 py-3 inline-block hover:border-primary hover:text-primary transition-colors"
              >
                ← Back to the lens
              </a>
            </div>

            <div className="hidden md:flex items-center justify-center px-4 font-mono text-[10px] tracking-[0.3em] text-accent uppercase writing-mode-vertical">
              ↔
            </div>

            <div className="p-10 md:p-14 bg-secondary/30 border-t md:border-t-0 md:border-l border-border">
              <p className="font-mono-meta text-primary mb-3">COMPUTER</p>
              <h4 className="font-display text-2xl font-bold tracking-tight mb-3">
                Systems &amp; software
              </h4>
              <p className="font-body text-muted-foreground mb-6">
                Dark UI, blue grids, tools that ship. The other half of BluePolaroid.
              </p>
              <Link
                to="/coding"
                className="font-display text-sm tracking-[0.15em] uppercase text-primary border border-primary px-5 py-3 inline-block hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Enter the builds →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

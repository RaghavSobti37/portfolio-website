import { motion } from 'framer-motion';

const socialLinks = [
  { label: 'INSTAGRAM', href: 'https://www.instagram.com/bluepolaroid05/' },
  { label: 'YOUTUBE', href: 'https://www.youtube.com/@bluepolaroid05/videos' },
  { label: 'SPOTIFY', href: 'https://open.spotify.com/user/314i4j6nzrmctdy5xvhosa4iwvlu' },
  { label: 'GITHUB', href: 'https://github.com/RaghavSobti37' },
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/raghav-raj-sobti/' },
];

const MAIL = 'raghavsobti37@gmail.com';
const MAILTO = `mailto:${MAIL}?subject=${encodeURIComponent('Project inquiry')}`;

export const FooterSection = () => {
  return (
    <footer id="contact" className="relative py-24 md:py-32 border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono-meta text-accent mb-6">GOT AN IDEA?</p>
          <h2 className="font-display text-[clamp(2.5rem,8vw,5.5rem)] font-bold tracking-tighter leading-[0.95] mb-10 max-w-3xl">
            LET’S MAKE
            <br />
            SOMETHING WEIRD.
          </h2>

          <a
            href={MAILTO}
            className="font-display text-xl md:text-2xl text-primary hover:text-accent transition-colors break-all"
          >
            {MAIL}
          </a>

          <div className="flex flex-wrap gap-6 mt-10 mb-20">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="font-mono-meta text-muted-foreground hover:text-primary transition-colors"
              >
                {s.label} ↗
              </a>
            ))}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-t border-border pt-8">
            <p className="font-mono-meta">BLUEPOLAROID © {new Date().getFullYear()}</p>
            <p className="font-body text-sm text-muted-foreground">
              Designed, shot &amp; coded by Raghav.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

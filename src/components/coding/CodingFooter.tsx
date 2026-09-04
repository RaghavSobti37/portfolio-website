import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const socialLinks = [
  { label: 'GITHUB', href: 'https://github.com/RaghavSobti37' },
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/raghav-raj-sobti/' },
  { label: 'INSTAGRAM', href: 'https://www.instagram.com/bluepolaroid05/' },
];

const MAIL = 'raghavsobti37@gmail.com';
const MAILTO = `mailto:${MAIL}?subject=${encodeURIComponent('Project inquiry')}`;

export const CodingFooter = () => {
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
            LET’S BUILD
            <br />
            SOMETHING SOLID.
          </h2>

          <a
            href={MAILTO}
            className="font-display text-xl md:text-2xl text-primary hover:text-accent transition-colors break-all"
          >
            {MAIL}
          </a>

          <div className="flex flex-wrap items-center gap-6 mt-10 mb-20">
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
            <Link
              to="/"
              className="font-mono-meta text-accent hover:text-accent/80 transition-colors md:ml-auto w-fit shrink-0"
            >
              GO TO CREATIVE <span className="whitespace-nowrap">PORTFOLIO ↗</span>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-t border-border pt-8">
            <p className="font-mono-meta">RAGS.DEV © {new Date().getFullYear()}</p>
            <p className="font-body text-sm text-muted-foreground">
              Built with React, TypeScript &amp; systems thinking.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

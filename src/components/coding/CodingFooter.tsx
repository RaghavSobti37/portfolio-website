import { Link } from 'react-router-dom';
import { focusRing } from '@/components/coding/CodingHero';

const linkClass = `font-body text-muted-foreground hover:text-foreground transition-colors ${focusRing}`;

export const CodingFooter = () => (
  <footer id="contact" className="py-20 md:py-28 border-t border-border">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight max-w-2xl [text-wrap:balance]">
        Need a website or an internal tool built?
      </h2>
      <a
        href="mailto:raghavsobti37@gmail.com"
        className={`mt-8 inline-block font-display text-2xl md:text-3xl text-accent underline decoration-accent/40 underline-offset-8 hover:decoration-accent transition-colors break-all ${focusRing}`}
      >
        raghavsobti37@gmail.com
      </a>
      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
        <a href="https://github.com/RaghavSobti37" target="_blank" rel="noreferrer" className={linkClass}>GitHub</a>
        <a href="https://www.linkedin.com/in/raghav-raj-sobti/" target="_blank" rel="noreferrer" className={linkClass}>LinkedIn</a>
        <a href="/resumes/raghav-creative-technologist-resume.pdf" target="_blank" rel="noreferrer" className={linkClass}>Résumé (PDF)</a>
        <Link to="/" className={linkClass}>Film portfolio</Link>
      </div>
      <p className="mt-16 font-body text-sm text-muted-foreground">© {new Date().getFullYear()} Raghav Raj Sobti</p>
    </div>
  </footer>
);

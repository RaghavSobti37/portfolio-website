import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { focusRing } from '@/components/coding/CodingHero';

const navLinks = [
  { name: 'Builds', href: '#projects' },
  { name: 'Activity', href: '#activity' },
  { name: 'Stack', href: '#skills' },
  { name: 'Experience', href: '#experience' },
];

const linkClass = `font-body text-sm text-muted-foreground hover:text-foreground transition-colors ${focusRing}`;

export const CodingNavigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background" aria-label="Main">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <Link to="/coding" className={`font-display text-xl font-bold tracking-tight ${focusRing}`}>
          RAGS<span className="text-accent">.</span>DEV
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <a key={l.name} href={l.href} className={linkClass}>{l.name}</a>
          ))}
          <Link to="/" className={linkClass}>Film portfolio</Link>
          <a
            href="mailto:raghavsobti37@gmail.com"
            className={`inline-flex items-center h-9 px-4 bg-accent text-accent-foreground font-display text-sm font-medium hover:bg-accent/90 active:translate-y-px transition-colors ${focusRing}`}
          >
            Email me
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`md:hidden p-2 text-foreground ${focusRing}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a key={l.name} href={l.href} onClick={() => setOpen(false)} className="font-body text-base text-foreground">{l.name}</a>
            ))}
            <Link to="/" className="font-body text-base text-foreground">Film portfolio</Link>
            <a href="mailto:raghavsobti37@gmail.com" className="font-body text-base text-accent">Email me</a>
          </div>
        </div>
      )}
    </nav>
  );
};

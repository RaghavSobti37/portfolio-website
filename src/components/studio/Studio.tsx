import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '@fontsource-variable/archivo/wdth.css';
import '@/styles/studio.css';

export const EMAIL = 'raghavsobti37@gmail.com';
export const WHATSAPP = 'https://wa.me/918591499393?text=' + encodeURIComponent('Hi Raghav, I have a project: ');

/** Sticky header: name on the left, four places on the right (a full-screen menu on phones). */
export function StudioHeader() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  const goHomeSection = (id: string) => {
    setOpen(false);
    if (pathname === '/') document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    else navigate('/', { state: { scrollTo: `#${id}` } });
  };
  const toContact = () => {
    setOpen(false);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <header className={`st-head${open ? ' menu-open' : ''}`}>
      <Link to="/" className="st-name" onClick={() => window.scrollTo(0, 0)}>
        Raghav Raj Sobti<small>BluePolaroid</small>
      </Link>
      <button type="button" className="st-menu-btn" aria-expanded={open} onClick={() => setOpen(true)}>
        Menu
      </button>
      <nav className={`st-nav${open ? ' open' : ''}`} aria-label="Main">
        <button type="button" className="close" onClick={() => setOpen(false)}>
          Close
        </button>
        <Link to="/work" onClick={() => setOpen(false)} aria-current={pathname === '/work' ? 'page' : undefined}>
          Work
        </Link>
        <a href="/services">Services</a>
        <button type="button" onClick={() => goHomeSection('about')}>
          About
        </button>
        <button type="button" onClick={toContact}>
          Contact
        </button>
        <a className="mini" href={WHATSAPP}>
          WhatsApp +91 85914 99393
        </a>
      </nav>
    </header>
  );
}

/** Phone-only bar so starting a project is always one tap away. */
export function StudioCta() {
  return (
    <div className="st-cta">
      <a className="p" href={WHATSAPP}>
        WhatsApp me
      </a>
      <a href={`mailto:${EMAIL}?subject=${encodeURIComponent('Project enquiry')}`}>Email</a>
    </div>
  );
}

/** Closing block on every studio page. */
export function StudioContact() {
  return (
    <footer id="contact" className="st-contact">
      <p>Have a shoot, an edit or an AI film in mind? Send the date, place and what you need.</p>
      <a className="mail" href={`mailto:${EMAIL}?subject=${encodeURIComponent('Project enquiry')}`}>
        {EMAIL}
      </a>
      <div className="links">
        <a href={WHATSAPP}>WhatsApp +91 85914 99393</a>
        <a href="https://www.instagram.com/bluepolaroid05/" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://www.youtube.com/@bluepolaroid05" target="_blank" rel="noreferrer">YouTube</a>
        <a href="https://www.linkedin.com/in/raghav-raj-sobti/" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="/resumes/raghav-videographer-resume.pdf" target="_blank" rel="noreferrer">Resume</a>
        <Link to="/coding">Code portfolio</Link>
      </div>
      <small>Raghav Raj Sobti, BluePolaroid. Mumbai, India.</small>
    </footer>
  );
}

export type Playable = {
  title: string;
  sub?: string;
  url: string;
  platform: 'youtube' | 'instagram' | 'image';
};

const embed = (p: Playable) => {
  if (p.platform === 'youtube') {
    const id = p.url.match(/(?:embed\/|v=)([\w-]{11})/)?.[1];
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  }
  const m = p.url.match(/instagram\.com\/(reel|p)\/([^/?]+)/);
  return m ? `https://www.instagram.com/${m[1]}/${m[2]}/embed` : p.url;
};

const original = (p: Playable) => {
  if (p.platform !== 'youtube') return p.url;
  const id = p.url.match(/(?:embed\/|v=)([\w-]{11})/)?.[1];
  return `https://www.youtube.com/watch?v=${id}`;
};

/** Full-screen player for a film, reel or photo. Escape closes it. */
export function Lightbox({ item, onClose }: { item: Playable | null; onClose: () => void }) {
  useEffect(() => {
    if (!item) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', k);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);
  if (!item) return null;
  const vertical = item.platform === 'instagram';
  return (
    <div className="st-box" role="dialog" aria-modal="true" aria-label={item.title} onClick={onClose}>
      <button className="x" type="button" onClick={onClose}>Close</button>
      <div className="frame" onClick={(e) => e.stopPropagation()}>
        <div className={`media${vertical ? ' v' : ''}`}>
          {item.platform === 'image' ? (
            <img src={item.url} alt={item.title} />
          ) : (
            <iframe src={embed(item)} title={item.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
          )}
        </div>
        <div className="meta">
          <span>
            <b>{item.title}</b>
            {item.sub}
          </span>
          {item.platform !== 'image' && (
            <a href={original(item)} target="_blank" rel="noreferrer">
              Open on {item.platform === 'youtube' ? 'YouTube' : 'Instagram'}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

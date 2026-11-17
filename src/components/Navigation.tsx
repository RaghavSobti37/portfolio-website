import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

type NavItem = { name: string; to: string; kind: 'route' | 'page' | 'home-section' | 'section' };

/** Five places, no overlap: Work holds films, reels and photos; Services are static SEO pages. */
const navLinks: NavItem[] = [
  { name: 'Work', to: '/work', kind: 'route' },
  { name: 'Services', to: '/services', kind: 'page' },
  { name: 'About', to: '#about', kind: 'home-section' },
  { name: 'Contact', to: '#contact', kind: 'section' },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLinkClick = (item: NavItem) => {
    setIsMobileMenuOpen(false);
    if (item.kind === 'page') {
      window.location.href = item.to;
    } else if (item.kind === 'route') {
      navigate(item.to);
      window.scrollTo(0, 0);
    } else if (item.kind === 'home-section' && pathname !== '/') {
      navigate('/', { state: { scrollTo: item.to } });
    } else {
      document.querySelector(item.to)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" onClick={() => window.scrollTo(0, 0)} className="font-display text-xl md:text-2xl font-bold tracking-tight">
            BLUE<span className="text-primary">POLAROID</span>
          </Link>

          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => handleLinkClick(link)}
                  className="font-display text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
            <li>
              <Link
                to="/coding"
                onClick={() => window.scrollTo(0, 0)}
                className="font-display text-sm tracking-widest uppercase text-primary hover:text-accent transition-colors"
              >
                Dev <span className="whitespace-nowrap">Portfolio ↗</span>
              </Link>
            </li>
          </ul>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.28 }}
            className="fixed inset-y-0 right-0 w-3/4 max-w-sm z-50 glass"
          >
            <div className="flex flex-col items-start justify-center h-full gap-6 px-10">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                  onClick={() => handleLinkClick(link)}
                  className="font-display text-2xl tracking-tight"
                >
                  {link.name}
                </motion.button>
              ))}
              <Link
                to="/coding"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className="font-mono-meta text-primary mt-4"
              >
                Dev <span className="whitespace-nowrap">Portfolio ↗</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-background/80 z-40 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

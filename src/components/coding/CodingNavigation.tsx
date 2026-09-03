import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const navLinks = [
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const CodingNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const goCinema = () => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 min-w-0">
            <Link
              to="/"
              onClick={goCinema}
              className="hidden md:inline font-mono text-[10px] tracking-wider uppercase text-primary hover:text-accent transition-colors shrink-0"
            >
              Behind the camera
            </Link>
            <span className="font-display text-xl sm:text-2xl font-bold tracking-wider text-foreground truncate">
              RAGS<span className="text-accent">.</span>DEV
            </span>
          </div>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => handleLinkClick(link.href)}
                  className="font-display text-sm tracking-widest uppercase text-muted-foreground hover:text-accent transition-colors duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
            <div className="flex items-center gap-4 ml-4">
              <a
                href="https://www.linkedin.com/in/raghav-raj-sobti/"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/RaghavSobti37"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Github size={20} />
              </a>
            </div>
          </ul>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-3/4 max-w-sm z-50 glass"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 px-8">
              <Link
                to="/"
                onClick={goCinema}
                className="font-mono-meta text-primary text-center"
              >
                Behind the camera
              </Link>
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleLinkClick(link.href)}
                  className="font-display text-2xl tracking-widest uppercase text-foreground hover:text-accent transition-colors"
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="flex items-center gap-6 mt-8"
              >
                <a
                  href="https://www.linkedin.com/in/raghav-raj-sobti/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground hover:text-accent transition-colors"
                >
                  <Linkedin size={28} />
                </a>
                <a
                  href="https://github.com/RaghavSobti37"
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground hover:text-accent transition-colors"
                >
                  <Github size={28} />
                </a>
              </motion.div>
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

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUser, FiCamera, FiFilm, FiMail, FiMenu, FiX } from 'react-icons/fi';
import { FaInstagram, FaYoutube, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import '../styles/navbar.css';

const Navbar = () => {
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(true); // Start collapsed
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const hoverTimeoutRef = useRef(null);

  const handleMouseEnterDesktop = () => {
    clearTimeout(hoverTimeoutRef.current);
    setIsDesktopCollapsed(false);
  };

  const handleMouseLeaveDesktop = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsDesktopCollapsed(true);
    }, 200);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: '/', label: 'Home', icon: <FiHome /> },
    { path: '/about', label: 'About', icon: <FiUser /> },
    { path: '/gallery', label: 'Gallery', icon: <FiCamera /> },
    { path: '/projects', label: 'Projects', icon: <FiFilm /> },
    { path: '/contact', label: 'Contact', icon: <FiMail /> },
  ];

  // Effect to update content wrapper margin based on desktop navbar state
  // This assumes your App.js or a parent component can apply a class to the body or main app container
  useEffect(() => {
    const contentWrapper = document.querySelector('.content-wrapper');
    if (contentWrapper) {
      if (isDesktopCollapsed) {
        contentWrapper.style.marginLeft = 'var(--navbar-collapsed-width)';
      } else {
        contentWrapper.style.marginLeft = 'var(--navbar-width)';
      }
    }
    // On mobile, CSS will override this to 0
  }, [isDesktopCollapsed]);

  return (
    <>
      {/* Desktop Vertical Navbar */}
      <nav
        className={`vertical-navbar ${isDesktopCollapsed ? 'collapsed' : ''}`}
        onMouseEnter={handleMouseEnterDesktop}
        onMouseLeave={handleMouseLeaveDesktop}
      >
        <div className="nav-logo">
          <span className="logo-full">Bluepolaroid</span>
          <span className="logo-collapsed">B</span>
          <div className="social-links">
                        <a href="https://instagram.com/bluepolaroid05" target="_blank" rel="noopener noreferrer">
                          <FaInstagram className="social-icon" />
                        </a>
                        <a href="https://youtube.com/@bluepolaroid05" target="_blank" rel="noopener noreferrer">
                          <FaYoutube className="social-icon" />
                        </a>
                        <a href="https://wa.me/918591499393" target="_blank" rel="noopener noreferrer">
                          <FaWhatsapp className="social-icon" />
                        </a>
                        <a href="mailto:raghavsobti37@gmail.com">
                          <FaEnvelope className="social-icon" />
                        </a>
                      </div>
        </div>

        

        <ul className="nav-links">
          {navItems.map(item => (
            <li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
              <Link to={item.path}>
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-link-text">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-footer">
          <span className="nav-link-text">© {new Date().getFullYear()} Bluepolaroid</span>

        </div>
      </nav>

      {/* Mobile Top Navbar */}
      <div className="mobile-navbar">
        <Link to="/" className="mobile-nav-logo">Bluepolaroid</Link>
        <button className="mobile-hamburger" onClick={toggleMobileMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
        
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-dropdown-menu">
          <ul className="mobile-nav-links">
            {navItems.map(item => (
              <li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
                <Link to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="nav-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
 
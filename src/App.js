import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Projects from "./pages/Project";  
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import SEOHead from './components/SEOHead';
import "./styles/main.css";
import "./styles/responsive.css";
import "./styles/navbar.css";

// SEO data for different pages
const seoData = {
  '/': {
    title: 'Professional Videographer & Cinematographer | Gimbal Operator | Delhi',
    description: 'Professional videographer and cinematographer specializing in gimbal shots, reel shoots, music videos, and commercial photography in Delhi. Expert video production services.',
    keywords: 'videographer delhi, cinematographer, gimbal operator, professional shoot, reel shoot, music video production, commercial photographer'
  },
  '/about': {
    title: 'About - Professional Videographer & Cinematographer | Delhi',
    description: 'Learn about our professional videography and cinematography services. Expert in gimbal operations, music video production, and commercial photography.',
    keywords: 'about videographer, professional cinematographer delhi, gimbal operator experience, video production specialist'
  },
  '/gallery': {
    title: 'Photography Gallery - Professional Photographer | Portrait & Event Photography',
    description: 'Browse our professional photography gallery featuring portraits, events, and commercial photography. Expert photographer in Delhi.',
    keywords: 'photography gallery, professional photographer, portrait photography, event photography, commercial photography delhi'
  },
  '/projects': {
    title: 'Video Projects - Professional Videographer | Music Videos & Short Films',
    description: 'Explore our professional video projects including music videos, short films, commercials, and documentary work. Expert videographer and cinematographer.',
    keywords: 'video projects, music video production, short films, commercial videography, documentary filmmaker, professional videographer'
  },
  '/contact': {
    title: 'Contact - Professional Videographer & Photographer | Delhi',
    description: 'Contact professional videographer and photographer for your next project. Specializing in gimbal shots, music videos, and commercial photography.',
    keywords: 'contact videographer, hire professional cinematographer, video production services delhi, professional photographer contact'
  },
  '/services': {
    title: 'Services - Professional Videography & Photography | Gimbal Operations',
    description: 'Professional videography and photography services including gimbal operations, music video production, commercial shoots, and event coverage.',
    keywords: 'videography services, photography services, gimbal operator, music video production, commercial photography, event videographer'
  }
};

// Create a wrapper component to use useLocation inside Router context
const AppContent = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 150);
    return () => clearTimeout(timer);
  }, [location]);

  // Get SEO data for current page
  const currentSEO = seoData[location.pathname] || seoData['/'];

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255,255,255,0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
        </div>
      )}

      {!loading && (
        <div className="app-container">
          <SEOHead 
            title={currentSEO.title}
            description={currentSEO.description}
            keywords={currentSEO.keywords}
            url={`https://yourwebsite.com${location.pathname}`}
          />
          <Navbar />
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

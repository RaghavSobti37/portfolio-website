import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { PortfolioSection } from '@/components/PortfolioSection';
import { ArtistsMarqueeSection } from '@/components/ArtistsMarqueeSection';
import { ServicesSection } from '@/components/ServicesSection';
import { AboutSection } from '@/components/AboutSection';
import { TopTracksSection } from '@/components/TopTracksSection';
import { FooterSection } from '@/components/FooterSection';
import { Seo } from '@/components/Seo';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Index = () => {
  const location = useLocation();
  // Nav links like About land here from other pages with a section to scroll to.
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (target) setTimeout(() => document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' }), 400);
  }, [location.state]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Seo
        title="Raghav Raj Sobti | Cinematographer, Video Editor & AI Filmmaker in Mumbai | BluePolaroid"
        description="Raghav Raj Sobti (BluePolaroid) — Mumbai cinematographer, music video director, freelance video editor and AI filmmaker. Music videos, festival and concert films, brand reels and AI films across India."
        path="/"
        type="profile"
      />
      <Navigation />
      <main>
        <HeroSection />
        <ArtistsMarqueeSection />
        <PortfolioSection />
        <ServicesSection />
        <AboutSection />
        <TopTracksSection />
        <FooterSection />
      </main>
    </div>
  );
};

export default Index;

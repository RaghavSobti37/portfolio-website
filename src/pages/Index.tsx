import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { PortfolioSection } from '@/components/PortfolioSection';
import { ReelsArchiveSection } from '@/components/ReelsArchiveSection';
import { GallerySection } from '@/components/GallerySection';
import { ServicesSection } from '@/components/ServicesSection';
import { AboutSection } from '@/components/AboutSection';
import { TopTracksSection } from '@/components/TopTracksSection';
import { FooterSection } from '@/components/FooterSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <PortfolioSection />
        <ReelsArchiveSection />
        <GallerySection />
        <ServicesSection />
        <AboutSection />
        <TopTracksSection />
        <FooterSection />
      </main>
    </div>
  );
};

export default Index;

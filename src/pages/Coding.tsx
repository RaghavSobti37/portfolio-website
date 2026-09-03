import { CodingNavigation } from '@/components/coding/CodingNavigation';
import { CodingHero } from '@/components/coding/CodingHero';
import { CodingActivity } from '@/components/coding/CodingActivity';
import { CodingProjects } from '@/components/coding/CodingProjects';
import { CodingSkills } from '@/components/coding/CodingSkills';
import { CodingExperience } from '@/components/coding/CodingExperience';
import { CodingFooter } from '@/components/coding/CodingFooter';

const Coding = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <CodingNavigation />
      <main>
        <CodingHero />
        <CodingActivity />
        <CodingProjects />
        <CodingSkills />
        <CodingExperience />
        <CodingFooter />
      </main>
    </div>
  );
};

export default Coding;

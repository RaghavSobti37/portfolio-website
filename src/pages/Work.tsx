import { useSearchParams } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { ReelsArchiveSection } from '@/components/ReelsArchiveSection';
import { FooterSection } from '@/components/FooterSection';
import { Seo } from '@/components/Seo';
import Projects from '@/pages/Projects';
import Gallery from '@/pages/Gallery';
import { projects } from '@/data/projects';
import { allPhotos } from '@/data/photos';

const tabs = [
  { id: 'films', label: 'Films & videos', count: projects.length },
  { id: 'reels', label: 'Reels' },
  { id: 'photos', label: 'Photos', count: allPhotos.length },
] as const;

type TabId = (typeof tabs)[number]['id'];

const seo: Record<TabId, { title: string; description: string }> = {
  films: {
    title: 'Work | Raghav Raj Sobti (BluePolaroid) — Music Videos, Films, Events & AI Films',
    description:
      'All work by Raghav Raj Sobti (BluePolaroid), Mumbai — music videos, short films, AI films, festival and concert films, interviews, brand reels and photography.',
  },
  reels: {
    title: 'Reels | Raghav Raj Sobti (BluePolaroid) — Artist & Brand Reels',
    description: 'Client and artist reels by Raghav Raj Sobti (BluePolaroid) — Havells mYOUsic, TSC Academy, Weekly Beat and more.',
  },
  photos: {
    title: 'Photos | Raghav Raj Sobti (BluePolaroid) — Photography Archive',
    description: 'Photography archive of Raghav Raj Sobti (BluePolaroid) — stills from shoots, music films and live events.',
  },
};

/** One place for everything: films/videos, reels and photos as tabs. */
const Work = ({ defaultTab = 'films' }: { defaultTab?: TabId }) => {
  const [params, setParams] = useSearchParams();
  const fromUrl = params.get('tab') as TabId | null;
  const tab: TabId = fromUrl && tabs.some((t) => t.id === fromUrl) ? fromUrl : defaultTab;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Seo {...seo[tab]} path="/work" />
      <Navigation />

      <main className="pt-28 md:pt-36">
        <div className="container mx-auto px-6">
          <p className="font-mono-meta text-primary mb-3">WORK</p>
          <h1 className="font-display text-[clamp(2.75rem,9vw,6rem)] font-bold tracking-tighter leading-[0.9] mb-4">
            Everything I’ve made
          </h1>
          <p className="font-body text-muted-foreground max-w-xl mb-10">
            Music videos, short films, AI films, festivals, artist interviews, brand reels and stills — in one place.
          </p>

          <div role="tablist" aria-label="Work type" className="flex flex-wrap gap-2 border-b border-border mb-10">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setParams(t.id === 'films' ? {} : { tab: t.id }, { replace: true })}
                className={`font-display text-sm md:text-base tracking-widest uppercase px-4 py-3 -mb-px border-b-2 transition-colors ${
                  tab === t.id
                    ? 'border-accent text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-primary'
                }`}
              >
                {t.label}
                {'count' in t && <span className="ml-2 font-mono text-[10px] text-muted-foreground">{t.count}</span>}
              </button>
            ))}
          </div>
        </div>

        {tab === 'films' && <Projects embedded />}
        {tab === 'reels' && <ReelsArchiveSection />}
        {tab === 'photos' && <Gallery embedded />}
      </main>

      <FooterSection />
    </div>
  );
};

export default Work;

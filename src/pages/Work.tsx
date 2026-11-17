import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { StudioHeader, StudioContact, StudioCta, Lightbox, type Playable } from '@/components/studio/Studio';
import { projects, projectCategories } from '@/data/projects';
import { reels, reelSeries, reelViews, getReelShortcode } from '@/data/reels';
import { allPhotos } from '@/data/photos';

const tabs = [
  { id: 'films', label: 'Films and videos', count: projects.length },
  { id: 'reels', label: 'Reels', count: reels.length },
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

const PAGE = 24;

/** Reel thumbnails live in /reels or /thumbnails; hide the image if neither exists. */
function ReelImg({ url, alt }: { url: string; alt: string }) {
  const code = getReelShortcode(url);
  const [src, setSrc] = useState(`/reels/${code}.jpg`);
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => (src.startsWith('/reels/') ? setSrc(`/thumbnails/ig-${code}.jpg`) : setSrc(''))}
      style={src ? undefined : { visibility: 'hidden' }}
    />
  );
}

/** Everything in one place: films and videos, reels, photos. */
const Work = ({ defaultTab = 'films' }: { defaultTab?: TabId }) => {
  const [params, setParams] = useSearchParams();
  const fromUrl = params.get('tab') as TabId | null;
  const tab: TabId = fromUrl && tabs.some((t) => t.id === fromUrl) ? fromUrl : defaultTab;
  const [cat, setCat] = useState('all');
  const [series, setSeries] = useState('all');
  const [shown, setShown] = useState(PAGE);
  const [active, setActive] = useState<Playable | null>(null);

  const films = cat === 'all' ? projects : projects.filter((p) => p.category === cat);
  const reelList = useMemo(
    () =>
      [...(series === 'all' ? reels : reels.filter((r) => r.series === series))].sort(
        (a, b) => reelViews(b) - reelViews(a) || a.id.localeCompare(b.id)
      ),
    [series]
  );

  const switchTab = (id: TabId) => {
    setShown(PAGE);
    setParams(id === 'films' ? {} : { tab: id }, { replace: true });
  };

  return (
    <div className="st">
      <Seo {...seo[tab]} path="/work" />
      <StudioHeader />

      <main>
        <div className="st-page-title">
          <h1>Work</h1>
        </div>

        <div className="st-tabs" role="tablist" aria-label="Type of work">
          {tabs.map((t) => (
            <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => switchTab(t.id)}>
              {t.label}
              <sup>{t.count}</sup>
            </button>
          ))}
        </div>

        {tab === 'films' && (
          <>
            <div className="st-filters">
              {projectCategories.map((c) => (
                <button key={c.id} aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
                  {c.label}
                </button>
              ))}
            </div>
            <div className="st-grid">
              {films.map((p) => (
                <button
                  key={p.id}
                  className="st-card"
                  onClick={() => setActive({ title: p.title, sub: `${p.role}, ${p.year}`, url: p.videoUrl, platform: p.platform })}
                >
                  <div className="img">
                    <img src={p.image} alt={p.title} loading="lazy" />
                  </div>
                  <div className="t">{p.title}</div>
                  <div className="r">
                    {p.role}, {p.year}
                  </div>
                </button>
              ))}
            </div>
            {films.length === 0 && <p className="st-filters">Nothing in this category yet.</p>}
          </>
        )}

        {tab === 'reels' && (
          <>
            <div className="st-filters">
              {reelSeries.map((s) => (
                <button
                  key={s.id}
                  aria-pressed={series === s.id}
                  onClick={() => {
                    setSeries(s.id);
                    setShown(PAGE);
                  }}
                >
                  {s.label.replace(' · ', ', ')}
                </button>
              ))}
            </div>
            <div className="st-grid tall">
              {reelList.slice(0, shown).map((r) => (
                <button
                  key={r.id}
                  className="st-card"
                  onClick={() => setActive({ title: r.title, sub: `${r.role}, ${r.year}`, url: r.url, platform: 'instagram' })}
                >
                  <div className="img">
                    <ReelImg url={r.url} alt={r.title} />
                  </div>
                  <div className="t">{r.title}</div>
                  <div className="r">
                    {r.role}, {r.year}
                  </div>
                </button>
              ))}
            </div>
            {reelList.length > shown && (
              <button className="st-more" onClick={() => setShown((n) => n + PAGE)}>
                Show more reels
              </button>
            )}
          </>
        )}

        {tab === 'photos' && (
          <>
            <div className="st-photos">
              {allPhotos.slice(0, shown * 2).map((ph, i) => (
                <button key={ph.src} onClick={() => setActive({ title: `Still ${i + 1}`, url: ph.src, platform: 'image' })}>
                  <img src={ph.src} alt={`Still ${i + 1} from Raghav’s photo archive`} loading="lazy" />
                </button>
              ))}
            </div>
            {allPhotos.length > shown * 2 && (
              <button className="st-more" onClick={() => setShown((n) => n + PAGE)}>
                Show more photos
              </button>
            )}
          </>
        )}
      </main>

      <StudioContact />
      <StudioCta />
      <Lightbox item={active} onClose={() => setActive(null)} />
    </div>
  );
};

export default Work;

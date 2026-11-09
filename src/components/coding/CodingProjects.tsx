import { codingProjects, type CodingProject } from '@/data/codingProjects';
import { CommitSparkline } from '@/components/coding/CommitSparkline';
import { focusRing } from '@/components/coding/CodingHero';

const FEATURED = ['coreknot', 'shrim', 'balaji'];
const REST = ['tsc', 'ekors', 'destiny', 'kalla', 'auto-mailer', 'resume-gen', 'photo-cleaner', 'woteat'];

/** Where the work happened, only where the experience timeline backs it up. */
const CONTEXT: Record<string, string> = {
  coreknot: 'Built for The Shakti Collective',
  tsc: 'Creative Technologist at The Shakti Collective, 2025 to now',
  ekors: 'Project intern at EKORS, Mar to Jul 2025',
};

const byId = new Map(codingProjects.map((p) => [p.id, p]));
const pick = (ids: string[]) => ids.map((id) => byId.get(id)).filter(Boolean) as CodingProject[];

const linkClass = `font-body text-sm text-foreground underline decoration-border underline-offset-4 hover:decoration-accent transition-colors ${focusRing}`;

/** List-row images that differ from p.frame: TSC's frame is already the hero, EKORS has no public UI. */
const LIST_IMAGE: Record<string, { src: string; alt: string; contain?: boolean; caption?: string }> = {
  tsc: { src: '/project-frames/tsc-ecosystem.jpg', alt: 'The Shakti Collective website, ecosystem section' },
  ekors: {
    src: '/project-frames/ekors-architecture.png',
    alt: 'EKORS ERP request flow: auth middleware, controllers, models and MongoDB',
    contain: true,
    caption: 'Request flow from the repo. The app itself is private.',
  },
};

const Links = ({ p, stacked = false }: { p: CodingProject; stacked?: boolean }) => (
  <div className={stacked ? 'flex flex-wrap gap-x-6 gap-y-2 md:flex-col md:items-end' : 'flex flex-wrap gap-x-6 gap-y-2'}>
    {p.website && <a href={p.website} target="_blank" rel="noreferrer" className={linkClass}>Visit the live site</a>}
    {p.github && <a href={p.github} target="_blank" rel="noreferrer" className={linkClass}>Read the source</a>}
  </div>
);

const Stack = ({ p }: { p: CodingProject }) => (
  <p className="font-mono-meta normal-case tracking-normal text-[13px] text-muted-foreground">{p.tech.join(', ')}</p>
);

export const CodingProjects = () => (
  <section id="projects" className="py-20 md:py-28 border-t border-border scroll-mt-16">
    <div className="max-w-6xl mx-auto px-6">
      <div className="mb-12 md:mb-16 grid gap-4 md:grid-cols-2 md:items-end">
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Selected builds</h2>
        <p className="font-body text-muted-foreground max-w-md md:justify-self-end">
          Screens are from the live products. Each links to the site and, where public, the code.
        </p>
      </div>

      <div className="space-y-16 md:space-y-24">
        {pick(FEATURED).map((p) => (
          <article key={p.id} className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12 items-start">
            <a href={p.website ?? p.github} target="_blank" rel="noreferrer" className={`block border border-border hover:border-foreground/40 transition-colors ${focusRing}`}>
              <img src={p.frame} alt={`${p.title} live site`} className="w-full aspect-[16/9] object-cover object-top" loading="lazy" />
            </a>
            <div className="min-w-0 space-y-4">
              <h3 className="font-display text-3xl font-bold tracking-tight">{p.title}</h3>
              {CONTEXT[p.id] && <p className="font-body text-sm text-accent">{CONTEXT[p.id]}</p>}
              <p className="font-body text-foreground/90 leading-relaxed">{p.impact ?? p.description}</p>
              {p.impact && <p className="font-body text-sm text-muted-foreground leading-relaxed">{p.description}</p>}
              {p.highlights && (
                <ul className="font-body text-sm text-muted-foreground space-y-1.5 list-disc pl-5 marker:text-border">
                  {p.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
              )}
              <Stack p={p} />
              <Links p={p} />
              {p.github && <CommitSparkline repo={p.repo} weeks={26} />}
            </div>
          </article>
        ))}
      </div>

      <h3 className="mt-20 md:mt-28 mb-6 font-display text-2xl font-bold tracking-tight">More builds</h3>
      <ul className="border-t border-border">
        {pick(REST).map((p) => (
          <li key={p.id} className="grid gap-4 sm:grid-cols-[200px_minmax(0,1fr)] md:grid-cols-[240px_minmax(0,1fr)_minmax(0,14rem)] py-6 border-b border-border items-start">
            {LIST_IMAGE[p.id] ? (
              <figure className="m-0">
                <img
                  src={LIST_IMAGE[p.id].src}
                  alt={LIST_IMAGE[p.id].alt}
                  className={`w-full aspect-[16/9] border border-border ${LIST_IMAGE[p.id].contain ? 'object-contain bg-paper p-2' : 'object-cover object-top'}`}
                  loading="lazy"
                />
                {LIST_IMAGE[p.id].caption && (
                  <figcaption className="mt-2 font-body text-xs text-muted-foreground">{LIST_IMAGE[p.id].caption}</figcaption>
                )}
              </figure>
            ) : (
              <img src={p.frame} alt={`${p.title} live site`} className="w-full aspect-[16/9] object-cover object-top border border-border" loading="lazy" />
            )}
            <div className="min-w-0 space-y-2">
              <h4 className="font-display text-xl font-bold">{p.title}</h4>
              {CONTEXT[p.id] && <p className="font-body text-sm text-accent">{CONTEXT[p.id]}</p>}
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{p.description}</p>
              <Stack p={p} />
            </div>
            <div className="sm:col-start-2 md:col-start-auto md:justify-self-end">
              <Links p={p} stacked />
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

import { codingProjects } from '@/data/codingProjects';

export const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

const liveCount = codingProjects.filter((p) => p.website).length;

const facts = [
  { value: String(codingProjects.length), label: 'Projects on this page' },
  { value: String(liveCount), label: 'Live in production' },
  { value: 'B.Tech', label: 'Computer Science, BML Munjal University' },
];

export const CodingHero = () => (
  <section className="pt-28 md:pt-32 pb-16 md:pb-20">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 items-center">
        <div className="min-w-0">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] [text-wrap:balance]">
            I build the tools teams run on.
          </h1>
          <p className="mt-5 max-w-md font-body text-lg text-muted-foreground leading-relaxed">
            Full-stack developer. Ops dashboards, client websites and automation, shipped to real users.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className={`inline-flex items-center h-12 px-6 bg-accent text-accent-foreground font-display font-medium hover:bg-accent/90 active:translate-y-px transition-colors ${focusRing}`}
            >
              See the builds
            </a>
            <a
              href="/resumes/raghav-creative-technologist-resume.pdf"
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center h-12 px-6 border border-border text-foreground font-display font-medium hover:border-foreground/60 active:translate-y-px transition-colors ${focusRing}`}
            >
              Résumé (PDF)
            </a>
          </div>
        </div>

        <figure className="min-w-0 m-0">
          <img
            src="/project-frames/tsc.jpg"
            alt="The Shakti Collective website home page"
            {...{ fetchpriority: "high" }}
            className="w-full aspect-[16/9] object-cover object-top border border-border"
          />
          <figcaption className="mt-3 font-body text-sm text-muted-foreground">
            The Shakti Collective website, which I build and run as their Creative Technologist.
          </figcaption>
        </figure>
      </div>

      <dl className="mt-14 grid grid-cols-1 sm:grid-cols-3 border-t border-border">
        {facts.map((f) => (
          <div key={f.label} className="pt-5 pb-1 sm:pr-6 sm:[&:not(:first-child)]:pl-6 sm:[&:not(:first-child)]:border-l border-border">
            <dt className="sr-only">{f.label}</dt>
            <dd className="font-display text-3xl md:text-4xl font-bold tabular-nums">{f.value}</dd>
            <dd className="mt-1 font-body text-sm text-muted-foreground">{f.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

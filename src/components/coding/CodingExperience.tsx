const timeline = [
  {
    date: 'Mar 2025 to now',
    title: 'Creative Technologist, The Shakti Collective',
    description: 'Building the academy and artist platform, courses and brand systems. Shipping Next.js experiences for cultural storytelling and running CoreKnot for team ops.',
  },
  {
    date: 'Mar to Jul 2025',
    title: 'Project Intern, EKORS',
    description: 'Worked on internal tools, including an ERP with role-based access, token auth, quotations and ticket tracking.',
  },
  {
    date: 'Aug to Dec 2025',
    title: 'Cinematography Program, New York Film Academy',
    description: '15-week online program: lighting, camera, pacing, set practice and DaVinci Resolve colour.',
  },
  {
    date: 'Jun to Aug 2022',
    title: 'Intern, Fruture Studio',
    description: 'Set up Discord server infrastructure for a Web3 startup and managed technical assets for its social accounts.',
  },
  {
    date: '2021 to 2025',
    title: 'B.Tech, Computer Science, BML Munjal University',
    description: 'Computer science fundamentals, software engineering and web technologies.',
  },
];

const certifications = [
  { title: 'Google Cloud Computing Foundations', org: 'Google', date: 'Jan 2026' },
  { title: 'UI/UX Design Principles', org: 'Online course', date: 'Dec 2025' },
];

export const CodingExperience = () => (
  <section id="experience" className="py-20 md:py-28 border-t border-border scroll-mt-16">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-12">Experience</h2>
      <ol className="border-t border-border">
        {timeline.map((t) => (
          <li key={t.title} className="grid gap-2 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-8 py-6 border-b border-border">
            <p className="font-body text-sm text-muted-foreground tabular-nums">{t.date}</p>
            <div className="min-w-0">
              <h3 className="font-display text-xl font-bold">{t.title}</h3>
              <p className="mt-2 font-body text-muted-foreground leading-relaxed max-w-2xl">{t.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <h3 className="mt-16 mb-6 font-display text-2xl font-bold tracking-tight">Certifications</h3>
      <ul className="border-t border-border">
        {certifications.map((c) => (
          <li key={c.title} className="grid gap-1 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-8 py-4 border-b border-border">
            <p className="font-body text-sm text-muted-foreground tabular-nums">{c.date}</p>
            <p className="font-body text-foreground">
              {c.title} <span className="text-muted-foreground">({c.org})</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

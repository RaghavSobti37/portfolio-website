const stack = [
  { title: 'Web and backend', skills: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JavaScript (ES6)', 'HTML and CSS'] },
  { title: 'Systems', skills: ['RESTful APIs', 'Token-based authentication', 'Role-based access control', 'Google Cloud', 'IoT'] },
  { title: 'Design and discovery', skills: ['Figma (UI/UX)', 'SEO and AEO', 'Microsoft Clarity'] },
  { title: 'Tooling', skills: ['Git', 'Vercel', 'Render', 'Multi-agent workflows'] },
];

export const CodingSkills = () => (
  <section id="skills" className="py-20 md:py-28 border-t border-border scroll-mt-16">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-12">Stack</h2>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {stack.map((g) => (
          <div key={g.title} className="border-t border-border pt-5">
            <h3 className="font-display text-lg font-semibold mb-4">{g.title}</h3>
            <ul className="space-y-2 font-body text-muted-foreground">
              {g.skills.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

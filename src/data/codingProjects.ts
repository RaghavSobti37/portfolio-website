export interface CodingProject {
  id: string;
  title: string;
  repo: string;
  description: string;
  tech: string[];
  github: string;
  website?: string;
  language?: string;
  featured?: boolean;
}

export const GITHUB_USER = 'RaghavSobti37';

export const codingProjects: CodingProject[] = [
  {
    id: 'tsc',
    title: 'The Shakti Collective',
    repo: 'TSC-Website',
    description:
      'Next.js platform for cultural storytelling, course experiences and automation-supported operations.',
    tech: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind'],
    github: 'https://github.com/RaghavSobti37/TSC-Website',
    website: 'https://theshakticollective.in',
    language: 'TypeScript',
    featured: true,
  },
  {
    id: 'coreknot',
    title: 'CoreKnot',
    repo: 'Coreknot',
    description:
      'Productivity and task-management product connecting core business info, user actions and operational flows.',
    tech: ['React', 'Clerk', 'Product Systems'],
    github: 'https://github.com/RaghavSobti37/Coreknot',
    website: 'https://taskmaster-sand.vercel.app',
    language: 'HTML',
    featured: true,
  },
  {
    id: 'photo-cleaner',
    title: 'Photo Cleaner',
    repo: 'photo-cleaner-app',
    description:
      'Streamlit utility for cleaning and organizing large photo collections — AI-assisted media workflow tool.',
    tech: ['Python', 'Streamlit', 'Image Utilities'],
    github: 'https://github.com/RaghavSobti37/photo-cleaner-app',
    language: 'Python',
    featured: true,
  },
  {
    id: 'auto-mailer',
    title: 'Auto Mailer',
    repo: 'Auto-Mailer',
    description:
      'Automation for structured email outreach, repeated follow-ups and communication workflow efficiency.',
    tech: ['JavaScript', 'Email Systems', 'Automation'],
    github: 'https://github.com/RaghavSobti37/Auto-Mailer',
    website: 'https://auto-mailer-blue.vercel.app',
    language: 'JavaScript',
    featured: true,
  },
  {
    id: 'resume-gen',
    title: 'Resume Generator',
    repo: 'Resume-Generator',
    description:
      'Connects a GitHub account, imports projects and generates structured resumes with AI-assisted descriptions.',
    tech: ['React', 'GitHub API', 'AI Writing'],
    github: 'https://github.com/RaghavSobti37/Resume-Generator',
    website: 'https://resume-generator-sandy.vercel.app',
    language: 'JavaScript',
    featured: true,
  },
  {
    id: 'balaji',
    title: 'Balaji Infra',
    repo: 'balaji-infra',
    description:
      'Corporate site for a civil infrastructure contractor — services, lead-focused presentation.',
    tech: ['HTML', 'CSS', 'Vercel'],
    github: 'https://github.com/RaghavSobti37/balaji-infra',
    website: 'https://balaji-infra.vercel.app',
    language: 'HTML',
  },
  {
    id: 'shrim',
    title: 'Shrim Exports',
    repo: 'shrim-exports-website',
    description:
      'Responsive export-business website with product communication and modern presentation.',
    tech: ['React', 'TypeScript', 'Vercel'],
    github: 'https://github.com/RaghavSobti37/shrim-exports-website',
    website: 'https://shrim-exports-website.vercel.app',
    language: 'TypeScript',
  },
  {
    id: 'destiny',
    title: 'Destiny Global',
    repo: 'destiny-global',
    description:
      'Business website with service storytelling, lead capture and polished presentation.',
    tech: ['React', 'JavaScript', 'Lead Gen'],
    github: 'https://github.com/RaghavSobti37/destiny-global',
    website: 'https://destiny-global-alpha.vercel.app',
    language: 'JavaScript',
  },
  {
    id: 'kalla',
    title: 'House of Kalla',
    repo: 'House-Of-Kalla',
    description: 'Brand / product web experience — crafted interface and visual presentation.',
    tech: ['HTML', 'CSS', 'Vercel'],
    github: 'https://github.com/RaghavSobti37/House-Of-Kalla',
    website: 'https://house-of-kalla.vercel.app',
    language: 'HTML',
  },
  {
    id: 'ekors',
    title: 'Ekors ERP',
    repo: 'Ekors-ERP',
    description:
      'Full-stack ERP module for quotations, tickets and user admin — Node.js, MongoDB, REST.',
    tech: ['Node.js', 'MongoDB', 'REST API'],
    github: 'https://github.com/RaghavSobti37/Ekors-ERP',
    language: 'JavaScript',
  },
  {
    id: 'cine-clock',
    title: 'Cine Clock',
    repo: 'cine_clock',
    description:
      'Timezone utility for NYFA classmates to track class timing across locations.',
    tech: ['JavaScript', 'NYFA', 'Utility'],
    github: 'https://github.com/RaghavSobti37/cine_clock',
    website: 'https://cine-clock.vercel.app',
    language: 'JavaScript',
  },
  {
    id: 'woteat',
    title: 'woTeaT',
    repo: 'woTeaT',
    description:
      'Food decision app — recommends what to eat from preferences, randomness and light interaction.',
    tech: ['JavaScript', 'Vercel', 'Web App'],
    github: 'https://github.com/RaghavSobti37/woTeaT',
    website: 'https://woteat.vercel.app',
    language: 'JavaScript',
  },
];

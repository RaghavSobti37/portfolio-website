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
  /** Optional real site frame (best crop). Falls back to design mock. */
  frame?: string;
  /** Design tokens for generated preview when no frame */
  preview: ProjectPreviewTheme;
}

export interface ProjectPreviewTheme {
  bg: string;
  accent: string;
  text: string;
  muted: string;
  eyebrow: string;
  headline: string;
  sub: string;
  /** mock UI variant */
  layout: 'editorial' | 'dashboard' | 'corp' | 'utility' | 'app' | 'erp';
}

export const GITHUB_USER = 'RaghavSobti37';

/** GitHub linguist-style language colors */
export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'Node.js': '#339933',
  Shell: '#89e051',
};

export function languageColor(lang?: string): string {
  if (!lang) return '#8b949e';
  return LANGUAGE_COLORS[lang] ?? '#8b949e';
}

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
    frame: '/project-frames/tsc.jpg',
    preview: {
      bg: '#0a0606',
      accent: '#b64d26',
      text: '#ffecd1',
      muted: '#8a6a55',
      eyebrow: 'ARTIST DEVELOPMENT · ACADEMY',
      headline: 'Culture-first\nIP & learning',
      sub: 'Courses · storytelling · community',
      layout: 'editorial',
    },
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
    language: 'JavaScript',
    featured: true,
    frame: '/project-frames/coreknot.png',
    preview: {
      bg: '#0c1210',
      accent: '#126d5e',
      text: '#e8f5f1',
      muted: '#6a8f85',
      eyebrow: 'PRODUCTIVITY · OPS',
      headline: 'Tasks that\ntie the core',
      sub: 'Boards · flows · business context',
      layout: 'dashboard',
    },
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
    preview: {
      bg: '#111318',
      accent: '#ff4b4b',
      text: '#fafafa',
      muted: '#8b919a',
      eyebrow: 'STREAMLIT · MEDIA',
      headline: 'Clean photo\nlibraries fast',
      sub: 'Dedupe · sort · AI assist',
      layout: 'utility',
    },
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
    frame: '/project-frames/auto-mailer.jpg',
    preview: {
      bg: '#0b0f1a',
      accent: '#3b82f6',
      text: '#eef2ff',
      muted: '#7c8db5',
      eyebrow: 'OUTREACH · AUTOMATION',
      headline: 'Mail that\nruns itself',
      sub: 'Sequences · status · follow-ups',
      layout: 'dashboard',
    },
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
    preview: {
      bg: '#f4f1ea',
      accent: '#111111',
      text: '#111111',
      muted: '#6b6560',
      eyebrow: 'GITHUB → RESUME',
      headline: 'AI resume\nfrom your repos',
      sub: 'Import · rewrite · export',
      layout: 'app',
    },
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
    frame: '/project-frames/balaji.jpg',
    preview: {
      bg: '#1a1c1e',
      accent: '#c4a35a',
      text: '#f5f2eb',
      muted: '#9a958c',
      eyebrow: 'HEAVY CIVIL · NASHIK',
      headline: 'Infrastructure\nthat lasts',
      sub: 'Roads · engineering · leads',
      layout: 'corp',
    },
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
    frame: '/project-frames/shrim.jpg',
    preview: {
      bg: '#0e1621',
      accent: '#1e90ff',
      text: '#f0f6ff',
      muted: '#7a8fa8',
      eyebrow: 'EXPORTS · TRADE',
      headline: 'Global products.\nClear story.',
      sub: 'Catalog · trust · contact',
      layout: 'corp',
    },
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
    frame: '/project-frames/destiny.jpg',
    preview: {
      bg: '#0a1628',
      accent: '#fcb040',
      text: '#ffffff',
      muted: '#8aa0bf',
      eyebrow: 'SERVICES · LEADS',
      headline: 'Grow with\nDestiny Global',
      sub: 'Story · services · capture',
      layout: 'corp',
    },
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
    frame: '/project-frames/kalla.jpg',
    preview: {
      bg: '#1c1410',
      accent: '#d4a574',
      text: '#f7efe6',
      muted: '#a89078',
      eyebrow: 'CRAFT · HOME',
      headline: 'Where craft\nbecomes home',
      sub: 'Objects · ritual · space',
      layout: 'editorial',
    },
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
    preview: {
      bg: '#0f1419',
      accent: '#22c55e',
      text: '#ecfdf5',
      muted: '#6b7f74',
      eyebrow: 'ERP · QUOTES · TICKETS',
      headline: 'Ops console\nfor the team',
      sub: 'Admin · REST · MongoDB',
      layout: 'erp',
    },
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
    frame: '/project-frames/woteat.jpg',
    preview: {
      bg: '#14110f',
      accent: '#ef4444',
      text: '#fff7ed',
      muted: '#a8a29e',
      eyebrow: 'PWA · FOOD',
      headline: 'What should\nwe eat?',
      sub: 'Prefs · random · decide',
      layout: 'app',
    },
  },
];

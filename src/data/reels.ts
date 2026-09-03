// Social / client reels shot or produced by Raghav

export interface Reel {
  id: string;
  title: string;
  series: string;
  role: string;
  year: string;
  url: string;
  note?: string;
  /** Exact play count when known; else treat as 10k avg */
  views?: number;
}

/** Avg 10k when exact IG views unavailable */
export const DEFAULT_REEL_VIEWS = 10_000;

export function reelViews(reel: Reel): number {
  return reel.views ?? DEFAULT_REEL_VIEWS;
}

/** Deterministic shuffle so SSR/hydration stay in sync */
export function shuffleReels<T extends { id: string }>(items: T[], seed = 42): T[] {
  const arr = [...items];
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const reelSeries = [
  { id: 'all', label: 'All' },
  { id: 'rohith-informative', label: 'Rohith · Informative' },
  { id: 'rohith-fun', label: 'Rohith · Fun' },
  { id: 'havells-dumka', label: 'Havells · Dumka' },
  { id: 'havells-noida', label: 'Havells · Noida' },
  { id: 'havells-other', label: 'Havells · Other' },
  { id: 'weekly-beat', label: 'Weekly Beat' },
  { id: 'tsc', label: 'TSC Academy' },
  { id: 'harshaduhita', label: 'HarshaDuhita' },
] as const;

export const reels: Reel[] = [
  // Rohith Sobti — informative
  {
    id: 'r1',
    title: 'Rohith · Informative 01',
    series: 'rohith-informative',
    role: 'Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/DcTZRIyTTr0/',
  },
  {
    id: 'r2',
    title: 'Rohith · Informative 02',
    series: 'rohith-informative',
    role: 'Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/DbahAptzMEi/',
  },
  {
    id: 'r3',
    title: 'Rohith · Informative 03',
    series: 'rohith-informative',
    role: 'Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/DX_0CQBT-AL/',
  },
  // Rohith Sobti — fun
  {
    id: 'r4',
    title: 'Rohith · Fun 01',
    series: 'rohith-fun',
    role: 'Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/DcOMJeJzBC6/',
  },
  {
    id: 'r5',
    title: 'Rohith · Fun 02',
    series: 'rohith-fun',
    role: 'Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/Db5pzr-u-Al/',
  },
  // Havells mYOUsic — Dumka
  {
    id: 'r6',
    title: 'Havells mYOUsic · Dumka',
    series: 'havells-dumka',
    role: 'Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/DaiBYwqT1Lh/',
  },
  // Havells mYOUsic — Noida
  {
    id: 'r7',
    title: 'Havells · Noida 01',
    series: 'havells-noida',
    role: 'Shot only',
    year: '2025',
    url: 'https://www.instagram.com/reel/DWgnjKasxWs/',
  },
  {
    id: 'r8',
    title: 'Havells · Noida 02',
    series: 'havells-noida',
    role: 'Shot only',
    year: '2025',
    url: 'https://www.instagram.com/reel/DWgWqwbMphD/',
  },
  {
    id: 'r9',
    title: 'Havells · w/ Vishal Chaturvedi',
    series: 'havells-noida',
    role: 'Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/DWgf_uRzg1i/',
    note: 'With Vishal Chaturvedi (Director of Hanuman Ansh)',
  },
  {
    id: 'r10',
    title: 'Havells · Noida 03',
    series: 'havells-noida',
    role: 'Shot only',
    year: '2025',
    url: 'https://www.instagram.com/reel/DVvlTvgDHwQ/',
  },
  {
    id: 'r11',
    title: 'Havells · Noida 04',
    series: 'havells-noida',
    role: 'Shot only',
    year: '2025',
    url: 'https://www.instagram.com/reel/DVgVyi-DEKn/',
  },
  {
    id: 'r12',
    title: 'Havells · Noida 05',
    series: 'havells-noida',
    role: 'Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/DVV9IO5k6vP/',
  },
  // Havells other
  {
    id: 'r13',
    title: 'Havells · All About Music',
    series: 'havells-other',
    role: 'Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/DV01WfoDGhT/',
  },
  {
    id: 'r14',
    title: 'Havells · Shiva Story',
    series: 'havells-other',
    role: 'Edit only',
    year: '2025',
    url: 'https://www.instagram.com/reel/DUDYwD2jFMB/',
  },
  {
    id: 'r15',
    title: 'Havells · Ad AI Reel',
    series: 'havells-other',
    role: 'Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/DThzOgVDHkG/',
  },
  // Weekly Beat
  {
    id: 'r16',
    title: 'Weekly Beat 01',
    series: 'weekly-beat',
    role: 'Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/DZo-WI1OLwk/',
  },
  {
    id: 'r17',
    title: 'Weekly Beat 02',
    series: 'weekly-beat',
    role: 'Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/DZKqpX_MJb0/',
  },
  {
    id: 'r18',
    title: 'Weekly Beat 03',
    series: 'weekly-beat',
    role: 'Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/DY7Gpx0uWFs/',
  },
  // TSC Academy
  {
    id: 'r19',
    title: 'TSC Academy 01',
    series: 'tsc',
    role: 'Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/DVLNWSCESAV/',
  },
  {
    id: 'r20',
    title: 'TSC Academy 02',
    series: 'tsc',
    role: 'Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/DSpUdd2DC_D/',
  },
  {
    id: 'r21',
    title: 'TSC Academy · BTS 01',
    series: 'tsc',
    role: 'BTS',
    year: '2025',
    url: 'https://www.instagram.com/reel/DSw0McBjMRZ/',
  },
  {
    id: 'r22',
    title: 'TSC Academy · BTS 02',
    series: 'tsc',
    role: 'BTS',
    year: '2025',
    url: 'https://www.instagram.com/reel/DSj9jhNDH3t/',
  },
  {
    id: 'r23',
    title: 'TSC Academy · BTS 03',
    series: 'tsc',
    role: 'BTS',
    year: '2025',
    url: 'https://www.instagram.com/reel/DSUTK7GDLn-/',
  },
  {
    id: 'r24',
    title: 'TSC Academy · Shot',
    series: 'tsc',
    role: 'Shot only',
    year: '2025',
    url: 'https://www.instagram.com/reel/DSKjrVljKCH/',
  },
  // HarshaDuhita Collective — social media 60 days
  {
    id: 'r25',
    title: 'HarshaDuhita 01',
    series: 'harshaduhita',
    role: 'Social / Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/DbQasuPvK90/',
  },
  {
    id: 'r26',
    title: 'HarshaDuhita 02',
    series: 'harshaduhita',
    role: 'Social / Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/DbNuT0sv8Cw/',
  },
  {
    id: 'r27',
    title: 'HarshaDuhita 03',
    series: 'harshaduhita',
    role: 'Social / Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/DbLXEmXPf1n/',
  },
  {
    id: 'r28',
    title: 'HarshaDuhita 04',
    series: 'harshaduhita',
    role: 'Social / Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/DbDsjDRvOMD/',
  },
  {
    id: 'r29',
    title: 'HarshaDuhita 05',
    series: 'harshaduhita',
    role: 'Social / Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/DbBFkDnPtc_/',
  },
  {
    id: 'r30',
    title: 'HarshaDuhita 06',
    series: 'harshaduhita',
    role: 'Social / Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/Da5OADFvSg2/',
  },
  {
    id: 'r31',
    title: 'HarshaDuhita 07',
    series: 'harshaduhita',
    role: 'Shot only',
    year: '2025',
    url: 'https://www.instagram.com/reel/Da0H3gny1_a/',
  },
  {
    id: 'r32',
    title: 'HarshaDuhita 08',
    series: 'harshaduhita',
    role: 'Social / Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/Daxgidbvtla/',
  },
  {
    id: 'r33',
    title: 'HarshaDuhita 09',
    series: 'harshaduhita',
    role: 'Social / Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/DanWzd8PRxx/',
  },
  {
    id: 'r34',
    title: 'HarshaDuhita 10',
    series: 'harshaduhita',
    role: 'Social / Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/DakpAn2vRPy/',
  },
  {
    id: 'r35',
    title: 'HarshaDuhita 11',
    series: 'harshaduhita',
    role: 'Social / Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/DadDX8HPmov/',
  },
  {
    id: 'r36',
    title: 'HarshaDuhita 12',
    series: 'harshaduhita',
    role: 'Social / Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/Daad0jMvf9N/',
  },
  {
    id: 'r37',
    title: 'HarshaDuhita 13',
    series: 'harshaduhita',
    role: 'Social / Shot',
    year: '2025',
    url: 'https://www.instagram.com/reel/DaX1JR0PkTt/',
  },
  {
    id: 'r38',
    title: 'HarshaDuhita 14',
    series: 'harshaduhita',
    role: 'Shot only',
    year: '2025',
    url: 'https://www.instagram.com/reel/DaQIVtBPEaH/',
  },
  {
    id: 'r39',
    title: 'HarshaDuhita 15',
    series: 'harshaduhita',
    role: 'Shot only',
    year: '2025',
    url: 'https://www.instagram.com/reel/DZhoZTlB-Ow/',
  },
  {
    id: 'r40',
    title: 'HarshaDuhita 16',
    series: 'harshaduhita',
    role: 'Shot only',
    year: '2025',
    url: 'https://www.instagram.com/reel/DZICyqUhtRI/',
  },
  {
    id: 'r41',
    title: 'HarshaDuhita · Post',
    series: 'harshaduhita',
    role: 'Social',
    year: '2025',
    url: 'https://www.instagram.com/p/DYzV7c8j7x1/',
  },
];

export const getReelShortcode = (url: string): string | null => {
  const match = url.match(/instagram\.com\/(?:reel|p)\/([^/?]+)/);
  return match?.[1] ?? null;
};

export const getReelEmbedUrl = (url: string): string => {
  const code = getReelShortcode(url);
  if (!code) return url;
  const kind = url.includes('/p/') ? 'p' : 'reel';
  return `https://www.instagram.com/${kind}/${code}/embed`;
};

/** Public Instagram media redirect → proxied for <img> preview */
export const getReelThumbnailUrl = (url: string): string | null => {
  const code = getReelShortcode(url);
  if (!code) return null;
  const media = `https://www.instagram.com/p/${code}/media/?size=l`;
  return `https://wsrv.nl/?url=${encodeURIComponent(media)}&w=720&h=1280&fit=cover&output=webp`;
};

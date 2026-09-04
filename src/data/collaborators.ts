/** Artists from portfolio work — Spotify photos + monthly listeners (live og scrape). */

export interface CollaboratorProject {
  title: string;
  year: string;
  role: string;
}

export interface Collaborator {
  id: string;
  name: string;
  image: string;
  spotifyUrl: string;
  /**
   * Spotify monthly listeners from artist page og:description
   * (fetched 4 September 2026 — not estimated).
   */
  monthlyListeners: number;
  /** Exact string Spotify showed in og, e.g. "19.4M" */
  monthlyListenersLabel: string;
  genres: string[];
  bio: string;
  projects: CollaboratorProject[];
}

/** When monthlyListeners were last scraped from Spotify public pages. */
export const LISTENERS_UPDATED_LABEL = '4 September 2026';

export function formatListeners(n: number, label?: string): string {
  if (label) return label;
  if (n >= 1_000_000) {
    const v = n / 1_000_000;
    return `${v % 1 === 0 ? v.toFixed(0) : v.toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (n >= 1_000) {
    const v = n / 1_000;
    return `${v % 1 === 0 ? v.toFixed(0) : v.toFixed(1).replace(/\.0$/, '')}K`;
  }
  return String(n);
}

const faheemArslanFilms: CollaboratorProject[] = [
  { title: 'Fanna Fillah', year: '2024', role: '2nd Assistant Director' },
  { title: 'Mora Piya', year: '2024', role: '2nd Assistant Director' },
  { title: 'Rooh Music Film', year: '2024', role: '2nd Assistant Director' },
  { title: 'Rooh 2.0', year: '2024', role: '2nd Assistant Director' },
  { title: 'Dhamaal', year: '2025', role: '2nd Assistant Director' },
  { title: 'Aabruu', year: '2024', role: "1st Director's Assistant" },
  { title: 'Making of Rooh', year: '2024', role: '2nd Assistant Director' },
  { title: 'Making of Dhamaal', year: '2025', role: '2nd Assistant Director' },
  { title: 'Making of Aabruu', year: '2024', role: "1st Director's Assistant" },
  { title: 'RIQQAT The Decode', year: '2024', role: '2nd Assistant Director' },
  { title: 'RIQQAT The Decode EP-2', year: '2024', role: '2nd Assistant Director' },
  { title: 'RIQQAT The Decode EP-3', year: '2024', role: '2nd Assistant Director' },
];

export const collaborators: Collaborator[] = [
  {
    id: '05etL4pzWd6TSv1x5WrlG3',
    name: 'Faheem Abdullah',
    image: 'https://image-cdn-fa.spotifycdn.com/image/ab67616100005174c3342f506f238d63c9dee119',
    spotifyUrl: 'https://open.spotify.com/artist/05etL4pzWd6TSv1x5WrlG3',
    monthlyListeners: 19_400_000,
    monthlyListenersLabel: '19.4M',
    genres: ['Kashmiri indie', 'Sufi rock', 'Playback'],
    bio: 'Srinagar singer-songwriter — Ishq, Lost;Found, Saiyaara, and ArtisteFirst music films.',
    projects: faheemArslanFilms,
  },
  {
    id: '5yzqUq3vXrMkmfcOwMY203',
    name: 'Arslan Nizami',
    image: 'https://image-cdn-ak.spotifycdn.com/image/ab676161000051748879897346d27ccfd576e33e',
    spotifyUrl: 'https://open.spotify.com/artist/5yzqUq3vXrMkmfcOwMY203',
    monthlyListeners: 10_000_000,
    monthlyListenersLabel: '10M',
    genres: ['Composer', 'I-Pop', 'Film'],
    bio: 'Composer & collaborator — Fanna Fillah, Mora Piya, Rooh, Dhamaal, Aabruu with Faheem.',
    projects: faheemArslanFilms,
  },
  {
    id: '5tIV3euFi728RORoQYZeei',
    name: 'AK$HAR',
    image: 'https://image-cdn-fa.spotifycdn.com/image/ab67616100005174b5c03511e6b9d9c13a7705f8',
    spotifyUrl: 'https://open.spotify.com/artist/5tIV3euFi728RORoQYZeei',
    monthlyListeners: 34,
    monthlyListenersLabel: '34',
    genres: ['Desi hip-hop', 'Indie'],
    bio: 'Akshat Rawat / AK$HAR — voice behind Ek Kamra (official music video).',
    projects: [
      { title: 'Ek Kamra', year: '2025', role: 'Director and Cinematographer' },
    ],
  },
  {
    id: '68BDWvc511MC0b6eAmH7gW',
    name: 'Aditya Gadhvi',
    image: 'https://image-cdn-fa.spotifycdn.com/image/ab67616100005174fc1881fb574137373b147890',
    spotifyUrl: 'https://open.spotify.com/artist/68BDWvc511MC0b6eAmH7gW',
    monthlyListeners: 2_300_000,
    monthlyListenersLabel: '2.3M',
    genres: ['Gujarati folk', 'Playback'],
    bio: 'Folk & playback voice taking Kach and Gujarati sound to a global stage.',
    projects: [
      { title: '90 Seconds with Aditya Gadhvi', year: '2026', role: 'Videographer' },
    ],
  },
  {
    id: '2sjFmfxifbUo2A25xuQOp0',
    name: 'gini',
    image: 'https://image-cdn-ak.spotifycdn.com/image/ab676161000051742567e4002ed6da6a68155755',
    spotifyUrl: 'https://open.spotify.com/artist/2sjFmfxifbUo2A25xuQOp0',
    monthlyListeners: 563_800,
    monthlyListenersLabel: '563.8K',
    genres: ['Indie pop', 'Singer-songwriter'],
    bio: 'Dehradun-bred indie songwriter — warm, hopeful, and unapologetically personal.',
    projects: [
      { title: '90 Seconds with Gini', year: '2026', role: 'Videographer' },
      { title: 'NH7 Weekender · Aashiqana', year: '2026', role: 'Creative Director' },
    ],
  },
  {
    id: '7FvX2e6CgYllzgZ9uempWF',
    name: 'Karun',
    image: 'https://image-cdn-fa.spotifycdn.com/image/ab6761610000517448720e127cb5c883bfe995ee',
    spotifyUrl: 'https://open.spotify.com/artist/7FvX2e6CgYllzgZ9uempWF',
    monthlyListeners: 681_800,
    monthlyListenersLabel: '681.8K',
    genres: ['Alt hip-hop', 'R&B'],
    bio: 'Delhi baritone fusing alt hip-hop, R&B, and classical textures — Maharani and beyond.',
    projects: [
      { title: "Karun's Confession", year: '2025', role: 'Videographer' },
    ],
  },
  {
    id: '3lRhKw5gfTNnpnPFFE7TfQ',
    name: 'Maan Panu',
    image: 'https://image-cdn-fa.spotifycdn.com/image/ab676161000051747cfc55315d06d54da27c6b72',
    spotifyUrl: 'https://open.spotify.com/artist/3lRhKw5gfTNnpnPFFE7TfQ',
    monthlyListeners: 3_700_000,
    monthlyListenersLabel: '3.7M',
    genres: ['Indie pop', 'I-Pop'],
    bio: 'Uttarakhand indie-pop force — confessional hits with chart-level pull.',
    projects: [
      { title: '90 Seconds with Maan Panu', year: '2026', role: 'Videographer' },
    ],
  },
  {
    id: '1ciT67XXpG2HOVsLQjKdv6',
    name: 'Ankur Tewari',
    image: 'https://image-cdn-ak.spotifycdn.com/image/ab67616100005174bf69b54de2dbd476c2959f70',
    spotifyUrl: 'https://open.spotify.com/artist/1ciT67XXpG2HOVsLQjKdv6',
    monthlyListeners: 486_400,
    monthlyListenersLabel: '486.4K',
    genres: ['Indie', 'Film music'],
    bio: 'Independent songwriter & music supervisor — Gully Boy to Coke Studio Bharat.',
    projects: [
      { title: '90 Seconds with Ankur Tiwari', year: '2025', role: 'Videographer' },
    ],
  },
  {
    id: '5GVa1G7mCOCbnrRlOFnNea',
    name: 'Raiez Khan',
    image: 'https://image-cdn-fa.spotifycdn.com/image/ab67616100005174ae23c469f5d939e63675e31b',
    spotifyUrl: 'https://open.spotify.com/artist/5GVa1G7mCOCbnrRlOFnNea',
    monthlyListeners: 11_500,
    monthlyListenersLabel: '11.5K',
    genres: ['Sufi', 'Indie'],
    bio: 'Kashmir-rooted Sufi ambient & indie — poetry, faith, and contemporary stage sound.',
    projects: [
      { title: '90 Seconds with Raiez Khan', year: '2026', role: 'Videographer' },
    ],
  },
  {
    id: '1NOuodJ2U1hMvKYXFJPw5P',
    name: 'SINASH',
    image: 'https://image-cdn-fa.spotifycdn.com/image/ab676161000051742b33cea66539aeed1098765f',
    spotifyUrl: 'https://open.spotify.com/artist/1NOuodJ2U1hMvKYXFJPw5P',
    monthlyListeners: 223_400,
    monthlyListenersLabel: '223.4K',
    genres: ['Indie pop', 'Mood'],
    bio: 'Jaipur new-gen artist — melody-forward pop from SIN to Zamana.',
    projects: [
      { title: '90 Seconds with Sinash', year: '2025', role: 'Videographer' },
    ],
  },
  {
    id: '6pYc4P7IWYwWttTPzYkDV4',
    name: 'Garvit - Priyansh',
    image: 'https://image-cdn-fa.spotifycdn.com/image/ab67616100005174be65e8bec0f0615d01a71ecb',
    spotifyUrl: 'https://open.spotify.com/artist/6pYc4P7IWYwWttTPzYkDV4',
    monthlyListeners: 4_000_000,
    monthlyListenersLabel: '4M',
    genres: ['Classical-pop', 'Indie'],
    bio: 'Duo blending Indian classical with contemporary folk — Sanware to Kaahe Mose.',
    projects: [
      { title: '90 Seconds with Garvit x Priyansh', year: '2026', role: 'Videographer' },
    ],
  },
  {
    id: '0Xbdgzdm7k9BJ5gUgmAkpy',
    name: 'Indian Ocean',
    image: 'https://image-cdn-fa.spotifycdn.com/image/ab67616100005174b88a60dcc0f865443db91194',
    spotifyUrl: 'https://open.spotify.com/artist/0Xbdgzdm7k9BJ5gUgmAkpy',
    monthlyListeners: 518_000,
    monthlyListenersLabel: '518K',
    genres: ['Folk fusion', 'Rock'],
    bio: "India's pioneering folk-fusion band — Kandisa to NH7 stages.",
    projects: [
      { title: 'NH7 Weekender · Aashiqana', year: '2026', role: 'Creative Director' },
    ],
  },
  {
    id: '1SsKMEMRgHuQynL97rmQbi',
    name: 'JAHNVI',
    image: 'https://image-cdn-fa.spotifycdn.com/image/ab676161000051742f22d1ff9f2bc0d239f9cc02',
    spotifyUrl: 'https://open.spotify.com/artist/1SsKMEMRgHuQynL97rmQbi',
    monthlyListeners: 40,
    monthlyListenersLabel: '40',
    genres: ['Rock', 'Metal', 'Hip-hop'],
    bio: 'Delhi confessional rock — raw live sets and emotionally damaged anthems.',
    projects: [
      { title: 'Jahnvi @ Hard Rock cafe', year: '2025', role: 'Videographer' },
      { title: 'Jahnvi Interview', year: '2025', role: 'Videographer' },
    ],
  },
  {
    id: '5xTLmNPHu4MLab87y8ZOKh',
    name: 'Nikamma',
    image: 'https://image-cdn-fa.spotifycdn.com/image/ab67616100005174e7c3dd7de8c664ceafa42396',
    spotifyUrl: 'https://open.spotify.com/artist/5xTLmNPHu4MLab87y8ZOKh',
    monthlyListeners: 322,
    monthlyListenersLabel: '322',
    genres: ['Indie pop', 'Teen pop'],
    bio: 'Delhi bedroom-pop songwriter — Ahana, Kho Jaana, 3 AM companion energy.',
    projects: [
      { title: '90 Seconds with nikamma', year: '2025', role: 'Videographer' },
    ],
  },
  {
    id: '596Jw47L2zLSVaRWVUIye5',
    name: 'vichaar',
    image: 'https://image-cdn-fa.spotifycdn.com/image/ab6761610000517444a311c6810087eef739f1b4',
    spotifyUrl: 'https://open.spotify.com/artist/596Jw47L2zLSVaRWVUIye5',
    monthlyListeners: 374_900,
    monthlyListenersLabel: '374.9K',
    genres: ['Hip-hop', 'Rap'],
    bio: 'Doon city rapper — 3 Drags, belief, and Mass Appeal-stage presence.',
    projects: [
      { title: '90 Seconds with Vichaar', year: '2026', role: 'Videographer' },
    ],
  },
  {
    id: '19trpXQWUc00d2UEGLZQVB',
    name: 'Muzzle',
    image: 'https://image-cdn-fa.spotifycdn.com/image/ab6761610000517460f0b94c0a538fa5350d6b95',
    spotifyUrl: 'https://open.spotify.com/artist/19trpXQWUc00d2UEGLZQVB',
    monthlyListeners: 40_500,
    monthlyListenersLabel: '40.5K',
    genres: ['Punjabi R&B', 'Hip-hop'],
    bio: 'Punjabi hip-hop / R&B — whispered hooks, Mirza heat, Boy Drama energy.',
    projects: [
      { title: '90 Seconds with Muzzle', year: '2025', role: 'Videographer' },
    ],
  },
];

/** Split into two rows for the marquee (even / odd). */
export function splitCollaboratorRows(list: Collaborator[] = collaborators): {
  top: Collaborator[];
  bottom: Collaborator[];
} {
  const top: Collaborator[] = [];
  const bottom: Collaborator[] = [];
  list.forEach((c, i) => (i % 2 === 0 ? top : bottom).push(c));
  return { top, bottom };
}

/** Highest Spotify monthly listeners first. */
export function sortCollaboratorsByListeners(
  list: Collaborator[] = collaborators
): Collaborator[] {
  return [...list].sort((a, b) => b.monthlyListeners - a.monthlyListeners);
}

export const LIST_PAGE_SIZE = 10;

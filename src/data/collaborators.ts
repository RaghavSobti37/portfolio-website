/** Artists from portfolio work — Spotify photos + monthly listeners (public og). */

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
  /** Spotify monthly listeners (public profile metric) */
  monthlyListeners: number;
  genres: string[];
  bio: string;
  projects: CollaboratorProject[];
}

export function formatListeners(n: number): string {
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

export const collaborators: Collaborator[] = [
  {
    id: '68BDWvc511MC0b6eAmH7gW',
    name: 'Aditya Gadhvi',
    image: 'https://image-cdn-ak.spotifycdn.com/image/ab67616100005174fc1881fb574137373b147890',
    spotifyUrl: 'https://open.spotify.com/artist/68BDWvc511MC0b6eAmH7gW',
    monthlyListeners: 2_300_000,
    genres: ['Gujarati folk', 'Playback'],
    bio: 'Folk & playback voice taking Kach and Gujarati sound to a global stage.',
    projects: [
      { title: '90 Seconds with Aditya Gadhvi', year: '2026', role: 'Videographer' },
    ],
  },
  {
    id: '2sjFmfxifbUo2A25xuQOp0',
    name: 'gini',
    image: 'https://image-cdn-fa.spotifycdn.com/image/ab676161000051742567e4002ed6da6a68155755',
    spotifyUrl: 'https://open.spotify.com/artist/2sjFmfxifbUo2A25xuQOp0',
    monthlyListeners: 563_800,
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
    genres: ['Indie', 'Film music'],
    bio: 'Independent songwriter & music supervisor — Gully Boy to Coke Studio Bharat.',
    projects: [
      { title: '90 Seconds with Ankur Tiwari', year: '2025', role: 'Videographer' },
    ],
  },
  {
    id: '2n4q8jLM4WLwlva1sZ2WRx',
    name: 'Chaar Diwaari',
    image: 'https://image-cdn-ak.spotifycdn.com/image/ab676161000051747893d3d72cd3b06791652580',
    spotifyUrl: 'https://open.spotify.com/artist/2n4q8jLM4WLwlva1sZ2WRx',
    monthlyListeners: 1_500_000,
    genres: ['Hip-hop', 'Experimental'],
    bio: 'Genre-fluid Delhi artist — Parvana, Farebi, and festival-stage heat.',
    projects: [
      { title: 'NH7 Weekender · Aashiqana', year: '2026', role: 'Creative Director' },
    ],
  },
  {
    id: '5GVa1G7mCOCbnrRlOFnNea',
    name: 'Raiez Khan',
    image: 'https://image-cdn-fa.spotifycdn.com/image/ab67616100005174ae23c469f5d939e63675e31b',
    spotifyUrl: 'https://open.spotify.com/artist/5GVa1G7mCOCbnrRlOFnNea',
    monthlyListeners: 11_500,
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

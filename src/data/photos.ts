// Gallery stills — numbered labels only (no categories)
import { IG_FILES } from './igPhotos';

export interface Photo {
  id: number;
  src: string;
}

/** File ids present in /public/gallery (gaps skipped: 56, 63) */
const GALLERY_IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
  26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
  49, 50, 51, 52, 53, 54, 55, 57, 58, 59, 60, 61, 62, 64, 65, 66,
] as const;

export const photos: Photo[] = GALLERY_IDS.map((id) => ({
  id,
  src: `/gallery/${id}.jpg`,
}));

/** Extra stills used elsewhere on the site (about section portraits). */
const SITE_EXTRA_FILES = ['about.jpg', 'about-bts.jpg', 'about-shoot.jpg', 'about-silhouette.jpg', 'i25.jpg'];

/** Everything for the /gallery page: site archive + about stills + Instagram pulls. */
export const allPhotos: Photo[] = [
  ...photos,
  ...SITE_EXTRA_FILES.map((file, i) => ({ id: 1000 + i, src: `/gallery/${file}` })),
  ...IG_FILES.map((file, i) => ({ id: 2000 + i, src: `/gallery/instagram/${file}` })),
];

export function photoLabel(index: number): string {
  return String(index + 1).padStart(3, '0');
}

/** YouTube view counts (Return YouTube Dislike API, Sep 2026) */
export const YT_VIEWS: Record<string, number> = {
  '28Mb1cIooGw': 367,
  bp633hDo9us: 15,
  '79ooo0YE5fY': 52,
  Uzu819p0hL8: 14,
  CVIGswYIsUM: 19,
  xjacCCS0Y9Q: 24,
  BxU_oYhwwNs: 98,
  UC8VuiWBDPw: 1,
  oLjqyQlZ75U: 212,
  'BZL_kGt-zRQ': 150,
  '7WAAMXyT4l8': 287,
  qguwlDHest0: 284,
  EWIay_vyFMk: 12_505_171,
  Gt7_LUqnldo: 219_130,
  y0g1uj3OE_Y: 45_421,
  mm48gpsJ9bQ: 1_474_766,
  'EKET-n4cBHI': 132_984,
  GQn3vTTKo9g: 12_027,
  xk1qELGYnDQ: 90_001,
  dBUTXHooqF0: 8_857,
  nFQTEXzwFqI: 5_029,
  'K2_L5On8N-M': 31_852,
  'D8HXMxND-aY': 1_356,
  ngeMq67_3sM: 24,
  TdHVE9_9iHA: 3_079,
  '8d9tcK27H0I': 212_570,
  N2_sGRTLaIs: 6_050,
  prEhLOAk3GI: 2_717,
  RRUdEIQ9vH8: 4_477,
  s6P4pilPNwQ: 201,
  oSzBcfMb564: 65,
};

/**
 * Instagram play counts are hidden on these posts.
 * Sort proxy: likes × 40 (~2.5% like rate).
 */
export const IG_LIKE_TO_VIEWS = 40;

export const IG_LIKES: Record<string, number> = {
  DWY8k8Jj79k: 116,
  DXKAjwUk1N9: 215,
  DYZpxenwlot: 11_551,
  DZ7pI89Pun1: 1_426,
  'DaS166SBKj-': 3_720,
  'Dbs-xEOJh_j': 340,
  'DbiexjeO0l-': 3_503,
  DcgVDvltpxP: 3_453,
  DNk66ZzyVMw: 198,
  DNLZmU2T5bZ: 567,
  DJPJWiMTcIl: 418,
  DHdxbxSTuAu: 192,
  'DHdF3gyorF-': 3,
  DGsNRvwtlX4: 2_362,
  DIzAjRGIOOU: 3,
  DELCubty0cN: 173,
  'C_lEzIZvEU4': 108,
  C5DY3hsSJWO: 3,
  C4DcH0WSkiY: 3,
  DE7hrOqP8Tu: 237,
  DEmePaCsQ0R: 128,
  DLrW2bxSK37: 64,
  DK4jBv5zNV_: 200,
  DKkIxRyzc0H: 180,
  DKH4RVozCiU: 128,
  DMXy444xFMx: 709,
  DM0AVz2TRmw: 475,
  'DO1n0CCE_q-': 3,
  DcTZRIyTTr0: 54,
  DbahAptzMEi: 3,
  'DX_0CQBT-AL': 108,
  DcOMJeJzBC6: 67,
  'Db5pzr-u-Al': 71,
  DaiBYwqT1Lh: 311,
  DWgnjKasxWs: 1_028,
  DWgWqwbMphD: 83,
  DWgf_uRzg1i: 104,
  DVvlTvgDHwQ: 54,
  'DVgVyi-DEKn': 78,
  DVV9IO5k6vP: 84,
  DV01WfoDGhT: 71,
  DUDYwD2jFMB: 19,
  DThzOgVDHkG: 502,
  'DZo-WI1OLwk': 125,
  DZKqpX_MJb0: 119,
  DY7Gpx0uWFs: 236,
  DVLNWSCESAV: 64,
  DSpUdd2DC_D: 66,
  DSw0McBjMRZ: 48,
  DSj9jhNDH3t: 131,
  'DSUTK7GDLn-': 81,
  DSKjrVljKCH: 70,
  DbQasuPvK90: 224,
  DbNuT0sv8Cw: 448,
  DbLXEmXPf1n: 616,
  DbDsjDRvOMD: 373,
  DbBFkDnPtc_: 772,
  Da5OADFvSg2: 681,
  Da0H3gny1_a: 727,
  Daxgidbvtla: 463,
  DanWzd8PRxx: 498,
  DakpAn2vRPy: 699,
  DadDX8HPmov: 806,
  Daad0jMvf9N: 2_284,
  DaX1JR0PkTt: 1_237,
  DaQIVtBPEaH: 161,
  'DZhoZTlB-Ow': 1_112,
  DZICyqUhtRI: 428,
};

export function youtubeId(url: string): string | null {
  const m = url.match(/(?:embed\/|watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m?.[1] ?? null;
}

export function instagramCode(url: string): string | null {
  const m = url.match(/instagram\.com\/(?:reel|reels|p)\/([^/?]+)/);
  return m?.[1] ?? null;
}

export function youtubeViews(url: string): number {
  const id = youtubeId(url);
  return id ? (YT_VIEWS[id] ?? 0) : 0;
}

export function instagramViews(url: string, fallback = 10_000): number {
  const code = instagramCode(url);
  if (!code) return fallback;
  const likes = IG_LIKES[code];
  if (likes == null) return fallback;
  return likes * IG_LIKE_TO_VIEWS;
}

export function mediaViews(url: string, platform: 'youtube' | 'instagram'): number {
  return platform === 'youtube' ? youtubeViews(url) : instagramViews(url);
}

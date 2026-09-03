import Clarity from '@microsoft/clarity';

const projectId = import.meta.env.VITE_CLARITY_PROJECT_ID?.trim();

let started = false;

/** Init Microsoft Clarity once (no-op without VITE_CLARITY_PROJECT_ID). */
export function initClarity() {
  if (started || !projectId || typeof window === 'undefined') return;
  Clarity.init(projectId);
  started = true;
}

/** Tag SPA navigations so recordings filter by route. */
export function clarityRoute(path: string) {
  if (!started || !projectId) return;
  Clarity.setTag('route', path);
  Clarity.setTag('site', 'bluepolaroid');
}

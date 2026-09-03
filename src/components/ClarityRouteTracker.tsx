import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { clarityRoute } from '@/lib/clarity';

/** Keeps Clarity tags in sync with React Router. */
export function ClarityRouteTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    clarityRoute(pathname);
  }, [pathname]);

  return null;
}

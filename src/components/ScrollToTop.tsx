import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Always land on hero when switching routes (cinema ↔ coding). */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

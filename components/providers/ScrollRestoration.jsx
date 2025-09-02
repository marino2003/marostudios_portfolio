'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLenis } from './LenisProvider';

export function ScrollRestoration() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    // Scroll to top when pathname changes using Lenis
    const scrollToTop = () => {
      if (lenis) {
        // Use Lenis scrollTo with immediate flag to jump to top without animation
        lenis.scrollTo(0, { immediate: true });
      } else {
        // Fallback to window.scrollTo if Lenis is not available
        window.scrollTo(0, 0);
      }
    };

    // Scroll to top after a small delay to ensure content is rendered
    const timer = setTimeout(scrollToTop, 0);
    
    return () => clearTimeout(timer);
  }, [pathname, lenis]);

  return null;
}
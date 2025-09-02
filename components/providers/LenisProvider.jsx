'use client';

import { useEffect, createContext, useContext } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext();

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }) {
  useEffect(() => {
    // Create a new Lenis instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // RAF for Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup function
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={null}>
      {children}
    </LenisContext.Provider>
  );
}
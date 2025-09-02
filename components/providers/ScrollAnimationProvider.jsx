'use client';

import { createContext, useContext, useEffect, useRef } from 'react';
import { useLenis } from '../providers/LenisProvider';

const ScrollAnimationContext = createContext();

export function useScrollAnimation() {
  return useContext(ScrollAnimationContext);
}

export function ScrollAnimationProvider({ children }) {
  const lenis = useLenis();
  const scrollY = useRef(0);

  // Sync scroll position with Lenis
  useEffect(() => {
    if (!lenis) return;
    
    const updateScroll = (time) => {
      scrollY.current = time;
    };
    
    lenis.on('scroll', updateScroll);
    
    return () => {
      lenis.off('scroll', updateScroll);
    };
  }, [lenis]);

  return (
    <ScrollAnimationContext.Provider value={{ scrollY }}>
      {children}
    </ScrollAnimationContext.Provider>
  );
}
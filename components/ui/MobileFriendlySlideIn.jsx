'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function MobileFriendlySlideIn({ 
  children, 
  className,
  direction = 'up',
  delay = 0,
  distance = 30,
  ...props 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px 0px -50px 0px' });

  // For mobile, we'll always slide up from bottom
  // For desktop, we'll use the specified direction
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  const getInitialPosition = () => {
    if (isMobile) {
      // Always slide up from bottom on mobile
      return { opacity: 0, y: distance };
    } else {
      // Use specified direction on desktop
      switch (direction) {
        case 'up': return { opacity: 0, y: distance };
        case 'down': return { opacity: 0, y: -distance };
        case 'left': return { opacity: 0, x: distance };
        case 'right': return { opacity: 0, x: -distance };
        default: return { opacity: 0, y: distance };
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : getInitialPosition()}
      transition={{ 
        duration: 0.7, 
        delay, 
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
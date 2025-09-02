'use client';

import { motion, useInView, useAnimation } from 'motion/react';
import { useEffect, useRef } from 'react';

export function ScrollAnimation({ 
  children, 
  className,
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.6, ease: 'easeOut' },
  threshold = 0.1,
  once = true,
  ...props 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once, 
    threshold,
    margin: '-100px 0px -100px 0px' // Trigger a bit earlier
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start(animate);
    } else {
      controls.start(initial);
    }
  }, [isInView, controls, initial, animate]);

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={controls}
      transition={transition}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
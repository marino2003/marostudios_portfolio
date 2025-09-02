'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function FadeIn({ 
  children, 
  className,
  delay = 0,
  ...props 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px 0px -50px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.1, 0.25, 1] // Custom easing for smoother animation
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({ 
  children, 
  className,
  direction = 'up',
  delay = 0,
  distance = 30,
  ...props 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px 0px -50px 0px' });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: distance };
      case 'down': return { opacity: 0, y: -distance };
      case 'left': return { opacity: 0, x: distance };
      case 'right': return { opacity: 0, x: -distance };
      default: return { opacity: 0, y: distance };
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
        ease: [0.25, 0.1, 0.25, 1] // Custom easing for smoother animation
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggeredFadeIn({ 
  children, 
  className,
  staggerDelay = 0.1,
  ...props 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px 0px -50px 0px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggeredItem({ 
  children, 
  className,
  ...props 
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ 
        duration: 0.5, 
        ease: [0.25, 0.1, 0.25, 1] // Custom easing for smoother animation
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// New animation component for content sections
export function ContentSectionAnimation({ 
  children, 
  className,
  delay = 0,
  ...props 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px 0px -30px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.7, 
        delay,
        ease: [0.25, 0.1, 0.25, 1] // Custom easing for smoother animation
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
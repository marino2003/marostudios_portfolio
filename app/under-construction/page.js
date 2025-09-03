'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

export default function UnderConstruction() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white font-inter uppercase mb-6 sm:mb-8 relative inline-block group">
            <span className="relative z-10">Under Construction</span>
            <span className="absolute bottom-0 left-0 w-0 h-1.5 bg-[#C7EA46] rounded-full animate-draw-line group-hover:w-full transition-all duration-500"></span>
          </h1>
        </motion.div>

        <motion.p 
          className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto font-inter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Deze website wordt momenteel geüpdatet. Kom snel terug voor het volledige portfolio.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link 
            href="/portfolio" 
            className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-500 font-inter font-bold group"
          >
            <span className="border-b-2 border-white group-hover:border-transparent transition-all duration-300">
              Terug naar Portfolio
            </span>
            <svg 
              className="ml-2 w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Lightbox({ images, currentIndex, onClose, onNext, onPrev }) {
  const [isLoading, setIsLoading] = useState(true);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowRight') {
      onNext();
    } else if (e.key === 'ArrowLeft') {
      onPrev();
    }
  }, [onClose, onNext, onPrev]);

  // Add keyboard event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore body scroll when lightbox is closed
      document.body.style.overflow = 'auto';
    };
  }, [handleKeyDown]);

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close button */}
        <button 
          className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <svg 
            className="w-8 h-8 md:w-10 md:h-10" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image counter */}
        <div className="absolute top-6 left-6 text-white font-inter text-sm md:text-base">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Main image area */}
        <div 
          className="flex items-center justify-center h-full w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}

          <motion.img
            key={currentImage}
            src={currentImage}
            alt={`Gallery image ${currentIndex + 1}`}
            className={`max-h-[90vh] max-w-[90vw] object-contain ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button 
                className="absolute left-4 md:left-8 text-white hover:text-gray-300 transition-colors z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                aria-label="Previous image"
              >
                <svg 
                  className="w-10 h-10 md:w-12 md:h-12" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button 
                className="absolute right-4 md:right-8 text-white hover:text-gray-300 transition-colors z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                aria-label="Next image"
              >
                <svg 
                  className="w-10 h-10 md:w-12 md:h-12" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Thumbnails strip at bottom */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-[90vw] overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                className={`w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex ? 'border-white' : 'border-white/30 hover:border-white/60'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  // We would need to implement thumbnail navigation
                }}
                aria-label={`Go to image ${index + 1}`}
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
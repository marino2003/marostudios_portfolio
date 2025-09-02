'use client';

import { useState } from 'react';
import { Lightbox } from '@/components/ui/Lightbox';

export function ProjectGallery({ images, title }) {
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Lightbox functions
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prevIndex) => (prevIndex + 1) % (images?.length || 1));
  };

  const prevImage = () => {
    setLightboxIndex((prevIndex) => (prevIndex - 1 + (images?.length || 1)) % (images?.length || 1));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <div 
              key={index} 
              className="relative h-52 sm:h-72 md:h-96 lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <img 
                src={image} 
                alt={`${title} - Gallery Image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay with expand icon */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg 
                    className="w-8 h-8 sm:w-10 sm:h-10 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Fallback placeholder images if no gallery images are provided
          <>
            <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden">
              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400 text-sm sm:text-base">Gallery Image 1</span>
              </div>
            </div>
            <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden">
              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400 text-sm sm:text-base">Gallery Image 2</span>
              </div>
            </div>
            <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden">
              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400 text-sm sm:text-base">Gallery Image 3</span>
              </div>
            </div>
            <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden">
              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400 text-sm sm:text-base">Gallery Image 4</span>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Lightbox Modal */}
      {isLightboxOpen && images && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </>
  );
}
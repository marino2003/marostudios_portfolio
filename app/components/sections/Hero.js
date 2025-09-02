import Image from 'next/image';
import Link from 'next/link';
import PixelTrail from "@/components/fancy/background/pixel-trail";
import { FadeIn, SlideIn } from '@/components/ui/ScrollAnimations';

export default function Hero() {
  return (
    <section className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
      {/* Container voor gecentreerde content */}
      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
        {/* Profile Picture */}
        <SlideIn direction="up">
          <div className="flex justify-center relative">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <Image
                src="/img/hero_image.png"
                alt=""
                fill
                className="object-cover rounded-3xl"
                priority
                aria-hidden="true"
              />
            </div>
          </div>
        </SlideIn>

        {/* Text content - met negatieve margin om over de afbeelding te lopen */}
        <FadeIn delay={0.3}>
          <div className="text-center -mt-12 sm:-mt-16 md:-mt-18 relative z-10">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-white mb-6 sm:mb-8 leading-tight">
              MARIJN PIEPER
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Webdesigner, developer en branding-liefhebber. Altijd nieuwsgierig, altijd op zoek naar slimme oplossingen die ideeën tot leven brengen.
            </p>
            
            <Link 
              href="/portfolio" 
              className="inline-flex items-center text-base sm:text-lg md:text-xl text-white hover:text-gray-300 transition-colors font-bold group"
            >
              <span className="border-b-2 border-white group-hover:border-transparent transition-all duration-300">
                Portfolio
              </span>
              <svg 
                className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:-rotate-12 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </FadeIn>
      </div>
      
      {/* PixelTrail overlay - covers entire section but allows pointer events through - hidden on mobile */}
      <div className="absolute inset-0 w-full h-150 z-20 pointer-events-none hidden sm:block">
        <div className="w-full h-150 pointer-events-none">
          <PixelTrail 
            pixelSize={20}
            fadeDuration={1000}
            className="w-full h-150"
            pixelClassName="bg-[#C7EA46]"
          />
        </div>
      </div>
    </section>
  );
}

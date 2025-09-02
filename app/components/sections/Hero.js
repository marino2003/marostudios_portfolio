import Image from 'next/image';
import Link from 'next/link';
import PixelTrail from "@/components/fancy/background/pixel-trail";

export default function Hero() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Container voor gecentreerde content */}
      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
        {/* Profile Picture */}
        <div className="flex justify-center relative">
          <div className="relative w-80 h-80 lg:w-96 lg:h-96">
            <Image
              src="/img/hero_image.png"
              alt=""
              fill
              className="object-cover rounded-lg"
              priority
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Text content - met negatieve margin om over de afbeelding te lopen */}
        <div className="text-center -mt-18 relative z-10">
          <h1 className="text-6xl lg:text-9xl font-bold text-white mb-8 leading-tight">
            MARIJN PIEPER
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Webdesigner, developer en branding-liefhebber. Altijd nieuwsgierig, altijd op zoek naar slimme oplossingen die ideeën tot leven brengen.
          </p>
          
          <Link 
            href="/portfolio" 
            className="inline-flex items-center text-white hover:text-gray-300 transition-colors text-lg font-bold group"
          >
            <span className="border-b-2 border-white group-hover:border-transparent transition-all duration-300">
              Portfolio
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
        </div>
      </div>
      
      {/* PixelTrail overlay - covers entire section but allows pointer events through */}
      <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
        <div className="w-full h-full pointer-events-none">
          <PixelTrail 
            pixelSize={20}
            fadeDuration={1000}
            className="w-full h-170"
            pixelClassName="bg-[#C7EA46]"
          />
        </div>
      </div>
    </section>
  );
}

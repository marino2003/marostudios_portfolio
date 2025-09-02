import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="py-20">
      {/* Container voor gecentreerde content */}
      <div className="max-w-6xl mx-auto flex flex-col items-center">
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
            className="inline-flex items-center text-white hover:text-gray-300 transition-colors text-lg font-medium"
          >
            Portfolio →
          </Link>
        </div>
      </div>
    </section>
  );
}

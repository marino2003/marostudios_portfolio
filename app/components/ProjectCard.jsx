import Link from 'next/link';

export default function ProjectCard({ project, fullWidth = true }) {
  return (
    <Link href={`/projects/${project.slug}`} className={`bg-[#1C1C1C] rounded-3xl overflow-hidden block ${fullWidth ? 'w-full' : 'w-full md:w-[calc(50%-1rem)]'} group/card`} style={{ contain: 'layout style' }}>
      {/* Featured image with rounded corners on all sides and hover effect */}
      {project.featuredImage && (
        <div className="relative w-full h-40 sm:h-48 md:h-80 lg:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden">
          <img 
            src={project.featuredImage} 
            alt={project.title}
            className="w-full h-full object-cover rounded-2xl sm:rounded-3xl transition-transform duration-700 group-hover/card:scale-105"
          />
          {/* Overlay that fades out on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
        </div>
      )}
      
      {/* Information section with two columns */}
      <div className="p-4 sm:p-6 md:p-8">
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Left side: Project title and tags */}
          <div className="flex-1">
            <h3 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-regular text-white mb-2 sm:mb-3 font-inter">
              {project.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {/* Categorie tag - hide on mobile, show on tablet and desktop */}
              {project.categorie && project.categorie.length > 0 && (
                <span className="hidden sm:inline-block px-3 py-1 sm:px-4 sm:py-2 border border-white text-white rounded-full text-sm sm:text-base font-inter">
                  {project.categorie[0]}
                </span>
              )}
              {/* Role tag - hide on mobile, show on tablet and desktop */}
              {project.rol && project.rol.length > 0 && (
                <span className="hidden sm:inline-block px-3 py-1 sm:px-4 sm:py-2 border border-white text-white rounded-full text-sm sm:text-base font-inter">
                  {project.rol[0]}
                </span>
              )}
            </div>
          </div>
          
          {/* Right side: Arrow button with rounded rectangle style */}
          <div className="flex-shrink-0 self-end">
            <div className="block px-4 py-2 sm:px-5 sm:py-3 border-2 border-white rounded-full transition-colors duration-300 group-hover/card:bg-white" style={{ willChange: 'background-color, color' }}>
              <svg 
                className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-colors duration-300 group-hover/card:text-black group-hover/card:-rotate-12 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
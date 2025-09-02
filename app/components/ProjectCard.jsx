import Link from 'next/link';

export default function ProjectCard({ project, fullWidth = true }) {
  return (
    <Link href={`/projects/${project.slug}`} className={`bg-[#1C1C1C] rounded-3xl overflow-hidden block ${fullWidth ? 'w-full' : 'w-full md:w-[calc(50%-1rem)]'} group/card`}>
      {/* Featured image with rounded corners on all sides and hover effect */}
      {project.featuredImage && (
        <div className="relative w-full h-[600px] rounded-3xl overflow-hidden">
          <img 
            src={project.featuredImage} 
            alt={project.title}
            className="w-full h-full object-cover rounded-3xl transition-transform duration-700 group-hover/card:scale-105"
          />
          {/* Overlay that fades out on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
        </div>
      )}
      
      {/* Information section with two columns */}
      <div className="p-8">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Left side: Project title and tags */}
          <div className="flex-1">
            <h3 className="text-2xl font-regular text-white mb-3 font-inter">
              {project.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {/* Categorie tag */}
              {project.categorie && project.categorie.length > 0 && (
                <span className="px-4 py-2 border border-white text-white rounded-full text-base font-inter">
                  {project.categorie[0]}
                </span>
              )}
              {/* Role tag */}
              {project.rol && project.rol.length > 0 && (
                <span className="px-4 py-2 border border-white text-white rounded-full text-base font-inter">
                  {project.rol[0]}
                </span>
              )}
            </div>
          </div>
          
          {/* Right side: Arrow button with rounded rectangle style */}
          <div className="flex-shrink-0 self-end">
            <div className="block px-5 py-3 border-2 border-white rounded-full transition-colors duration-300 group-hover/card:bg-white">
              <svg 
                className="w-6 h-6 text-white transition-colors duration-300 group-hover/card:text-black group-hover/card:-rotate-12 transition-transform duration-300" 
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
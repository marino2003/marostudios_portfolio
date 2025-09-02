import { getProjectBySlug, getAllProjects } from '@/lib/projects';
import Link from 'next/link';
import ProjectCard from '@/app/components/ProjectCard';
import { FadeIn, SlideIn } from '@/components/ui/ScrollAnimations';
import { ProjectGallery } from '@/app/components/ProjectGallery';

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  
  const project = getProjectBySlug(slug, [
    'title',
    'subtitle',
    'date',
    'featuredImage',
    'tech',
    'content',
    'slug',
    'description',
    'gallery',
    'categorie',
    'rol',
    'datum',
    'tools'
  ]);
  
  const moreProjects = getAllProjects([
    'title',
    'slug',
    'description',
    'featuredImage'
  ]).filter(p => p.slug !== slug).slice(0, 3); // Get 3 other projects

  // Simple function to extract sections from content
  const extractSections = (content) => {
    if (!content) return [];
    
    const sections = [];
    const lines = content.split('\n');
    let currentSection = null;
    
    for (const line of lines) {
      if (line.startsWith('# ')) {
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          title: line.substring(2),
          content: ''
        };
      } else if (currentSection) {
        if (line.trim() !== '') {
          currentSection.content += line + '\n';
        }
      }
    }
    
    if (currentSection) {
      sections.push(currentSection);
    }
    
    return sections;
  };

  const sections = extractSections(project.content);

  return (
    <>
      <div className="min-h-screen py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header with titles - updated styling */}
          <div>
            <SlideIn direction="up" distance={30} margin="-50px 0px -50px 0px">
              <header className="mb-16 sm:mb-24 md:mb-32 text-center flex flex-col items-center">
                <h1 className="text-5xl md:text-7xl lg:text-[140px] font-bold text-white font-inter uppercase mb-6 sm:mb-8 md:mb-10 relative inline-block group">
                  {project.title}
                  <span className="absolute bottom-0 left-0 w-0 h-1.5 bg-[#C7EA46] rounded-full animate-draw-line group-hover:w-full transition-all duration-500"></span>
                </h1>
                {project.subtitle && (
                  <p className="text-sm sm:text-base md:text-lg font-regular text-white mb-6 sm:mb-8 md:mb-12 max-w-4xl mx-auto font-inter leading-relaxed">
                    {project.subtitle}
                  </p>
                )}
              </header>
            </SlideIn>
            
            {/* Featured image with relative positioning, 1fr width, and 800px height */}
            {project.featuredImage && (
              <SlideIn direction="up" distance={50} delay={0.2} margin="-50px 0px -50px 0px">
                <div className="relative w-full h-64 sm:h-96 md:h-[800px] rounded-3xl overflow-hidden mb-32">
                  <img 
                    src={project.featuredImage} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SlideIn>
            )}
          </div>
          
          {/* Two-column layout: tags on left, content on right */}
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12 mb-12 sm:mb-20 md:mb-32">
            {/* Left column: Tags with Details title */}
            <SlideIn direction="left" className="lg:w-1/3">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 md:mb-8 text-left font-inter relative pl-4">
                <span className="relative z-10">Details</span>
                <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 md:h-10 bg-[#C7EA46] rounded-full"></span>
              </h2>
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                {/* Categorie tags */}
                {project.categorie && project.categorie.length > 0 && (
                  <div className="font-inter">
                    <span className="text-white font-inter text-base sm:text-lg font-regular mr-1 sm:mr-2">Categorie:</span>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-1 sm:mt-2">
                      {project.categorie.map((cat, index) => (
                        <span 
                          key={index} 
                          className="px-2.5 py-1 sm:px-3 sm:py-1.5 border border-white text-white rounded-full text-sm sm:text-base font-regular mr-1 sm:mr-1.5 mb-1 inline-block"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Rol tags */}
                {project.rol && project.rol.length > 0 && (
                  <div className="font-inter">
                    <span className="text-white font-inter text-base sm:text-lg font-regular mr-1 sm:mr-2">Rol:</span>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-1 sm:mt-2">
                      {project.rol.map((role, index) => (
                        <span 
                          key={index} 
                          className="px-2.5 py-1 sm:px-3 sm:py-1.5 border border-white text-white rounded-full text-sm sm:text-base font-regular mr-1 sm:mr-1.5 mb-1 inline-block"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Tools tags */}
                {project.tools && project.tools.length > 0 && (
                  <div className="font-inter">
                    <span className="text-white font-inter text-base sm:text-lg font-regular mr-1 sm:mr-2">Tools:</span>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-1 sm:mt-2">
                      {project.tools.map((tool, index) => (
                        <span 
                          key={index} 
                          className="px-2.5 py-1 sm:px-3 sm:py-1.5 border border-white text-white rounded-full text-sm sm:text-base font-regular mr-1 sm:mr-1.5 mb-1 inline-block"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Datum tags */}
                {project.datum && project.datum.length > 0 && (
                  <div className="font-inter">
                    <span className="text-white font-inter text-base sm:text-lg font-regular mr-1 sm:mr-2">Datum:</span>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-1 sm:mt-2">
                      {project.datum.map((date, index) => (
                        <span 
                          key={index} 
                          className="px-2.5 py-1 sm:px-3 sm:py-1.5 border border-white text-white rounded-full text-sm sm:text-base font-regular mr-1 sm:mr-1.5 mb-1 inline-block"
                        >
                          {date}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </SlideIn>
            
            {/* Right column: Content sections */}
            <SlideIn direction="right" className="lg:w-2/3">
              {/* Content sections - applying new styling with Inter font, white body text, and padded section titles */}
              <div className="space-y-16 sm:space-y-24 md:space-y-32">
                {sections.map((section, index) => (
                  <FadeIn key={index} delay={index * 0.1}>
                    <section className="mb-8 sm:mb-12 md:mb-16">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-left font-inter relative pl-4">
                        <span className="relative z-10">{section.title}</span>
                        <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 md:h-10 bg-[#C7EA46] rounded-full"></span>
                      </h2>
                      <div className="text-white max-w-4xl text-base md:text-lg font-inter">
                        {section.content.split('\n').filter(line => line.trim() !== '').map((paragraph, pIndex) => {
                          // Handle bold text (marked with *text*)
                          const boldFormatted = paragraph.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
                          
                          // Handle list items (marked with - )
                          if (paragraph.trim().startsWith('- ')) {
                            return (
                              <li 
                                key={pIndex} 
                                className="ml-4 sm:ml-6 mb-2 sm:mb-3 leading-relaxed list-disc"
                                dangerouslySetInnerHTML={{ __html: boldFormatted.substring(2) }}
                              />
                            );
                          }
                          
                          // Handle regular paragraphs
                          return (
                            <p key={pIndex} className="mb-3 sm:mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: boldFormatted }} />
                          );
                        })}
                      </div>
                    </section>
                  </FadeIn>
                ))}
              </div>
            </SlideIn>
          </div>
          
          {/* Gallery section - displaying actual gallery images */}
          <FadeIn>
            <div className="mt-16 md:mt-32 mb-16 md:mb-32">
              <ProjectGallery images={project.gallery} title={project.title} />
            </div>
          </FadeIn>
          
          {/* More Projects Section - using the same element as homepage */}
          {moreProjects && moreProjects.length > 0 && (
            <FadeIn>
              <div className="mt-16 md:mt-32 pb-16 md:pb-32">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-16">
                  <h2 className="text-lg font-bold text-white mb-4 md:mb-0 font-inter text-left">
                    <span className="md:hidden">Andere Projecten</span>
                    <span className="hidden md:inline">More Projects</span>
                  </h2>
                  <Link 
                    href="/portfolio" 
                    className="hidden md:inline-flex items-center text-white hover:text-gray-300 transition-colors text-lg font-bold group"
                  >
                    <span className="border-b-2 border-white group-hover:border-transparent transition-all duration-300">
                      Meer Projecten
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {moreProjects.map((proj, index) => (
                    <FadeIn key={proj.slug} delay={index * 0.1}>
                      <ProjectCard 
                        project={proj}
                        fullWidth={true}
                      />
                    </FadeIn>
                  ))}
                </div>
                {/* "Meer Projecten" button - shown under project cards on mobile/tablet only */}
                <div className="mt-8 flex justify-start md:hidden">
                  <Link 
                    href="/portfolio" 
                    className="inline-flex items-center text-white hover:text-gray-300 transition-colors text-lg font-bold group"
                  >
                    <span className="border-b-2 border-white group-hover:border-transparent transition-all duration-300">
                      Meer Projecten
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
            </FadeIn>
          )}
        </div>
      </div>
    </>
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug, ['title', 'description']);
  
  return {
    title: project.title,
    description: project.description,
  };
}

export async function generateStaticParams() {
  const projects = getAllProjects(['slug']);
  
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
import { getProjectBySlug, getAllProjects } from '@/lib/projects';
import Link from 'next/link';

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
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with titles - updated styling */}
        <header className="mb-32 text-center">
          <h1 className="text-[140px] font-bold text-white  font-inter text-transform: uppercase">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-lg font-regular text-white mb-32 max-w-4xl mx-auto font-inter">
              {project.subtitle}
            </p>
          )}
          
          {/* Featured image with relative positioning, 1fr width, and 800px height */}
          {project.featuredImage && (
            <div className="relative w-full h-[800px] rounded-3xl overflow-hidden mb-32">
              <img 
                src={project.featuredImage} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </header>
        
        {/* Two-column layout: tags on left, content on right */}
        <div className="flex flex-col lg:flex-row gap-16 mb-32">
          {/* Left column: Tags with Details title */}
          <div className="lg:w-1/3">
            <h2 className="text-lg font-normal text-white mb-8 text-left font-inter pl-4">Details</h2>
            <div className="space-y-6">
              {/* Categorie tags */}
              {project.categorie && project.categorie.length > 0 && (
                <div className="font-inter">
                  <span className="text-white font-inter text-lg font-regular mr-2">Categorie:</span>
                  {project.categorie.map((cat, index) => (
                    <span 
                      key={index} 
                      className="px-4 py-2 border border-white text-white rounded-full text-lg font-regular mr-2"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Rol tags */}
              {project.rol && project.rol.length > 0 && (
                <div className="font-inter">
                  <span className="text-white font-inter text-lg font-regular mr-2">Rol:</span>
                  {project.rol.map((role, index) => (
                    <span 
                      key={index} 
                      className="px-4 py-2 border border-white text-white rounded-full text-lg font-regular mr-2"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Tools tags */}
              {project.tools && project.tools.length > 0 && (
                <div className="font-inter">
                  <span className="text-white font-inter text-lg font-regular mr-2">Tools:</span>
                  {project.tools.map((tool, index) => (
                    <span 
                      key={index} 
                      className="px-4 py-2 border border-white text-white rounded-full text-lg font-regular mr-2"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Datum tags */}
              {project.datum && project.datum.length > 0 && (
                <div className="font-inter">
                  <span className="text-white font-inter text-lg font-regular mr-2">Datum:</span>
                  {project.datum.map((date, index) => (
                    <span 
                      key={index} 
                      className="px-4 py-2 border border-white text-white rounded-full text-lg font-regular mr-2"
                    >
                      {date}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Right column: Content sections */}
          <div className="lg:w-2/3">
            {/* Content sections - applying new styling with Inter font, white body text, and padded section titles */}
            <div className="space-y-32">
              {sections.map((section, index) => (
                <section key={index} className="mb-16">
                  <h2 className="text-lg font-normal text-white mb-8 text-left font-inter pl-4">
                    {section.title}
                  </h2>
                  <div className="text-white max-w-4xl text-lg font-inter">
                    {section.content.split('\n').filter(line => line.trim() !== '').map((paragraph, pIndex) => {
                      // Handle bold text (marked with *text*)
                      const boldFormatted = paragraph.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
                      
                      // Handle list items (marked with - )
                      if (paragraph.trim().startsWith('- ')) {
                        return (
                          <li 
                            key={pIndex} 
                            className="ml-6 mb-2 leading-relaxed list-disc"
                            dangerouslySetInnerHTML={{ __html: boldFormatted.substring(2) }}
                          />
                        );
                      }
                      
                      // Handle regular paragraphs
                      return (
                        <p key={pIndex} className="mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: boldFormatted }} />
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
        
        {/* Gallery section - displaying actual gallery images */}
        <div className="mt-32 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {project.gallery && project.gallery.length > 0 ? (
              project.gallery.map((image, index) => (
                <div key={index} className="relative h-96 rounded-3xl overflow-hidden">
                  <img 
                    src={image} 
                    alt={`${project.title} - Gallery Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            ) : (
              // Fallback placeholder images if no gallery images are provided
              <>
                <div className="relative h-96 rounded-3xl overflow-hidden">
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400">Gallery Image 1</span>
                  </div>
                </div>
                <div className="relative h-96 rounded-3xl overflow-hidden">
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400">Gallery Image 2</span>
                  </div>
                </div>
                <div className="relative h-96 rounded-3xl overflow-hidden">
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400">Gallery Image 3</span>
                  </div>
                </div>
                <div className="relative h-96 rounded-3xl overflow-hidden">
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400">Gallery Image 4</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* More Projects Section - applying new styling with Inter font, white body text, and padded section titles */}
        {moreProjects && moreProjects.length > 0 && (
          <div className="mt-32 pb-32">
            <h3 className="text-lg font-normal text-white mb-16 text-left font-inter pl-4">More Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {moreProjects.map((proj) => (
                <div key={proj.slug} className="bg-gray-800 rounded-2xl overflow-hidden hover:bg-gray-700 transition-colors">
                  <div className="p-8">
                    <h4 className="text-xl font-bold text-white mb-4 font-inter">{proj.title}</h4>
                    <p className="text-white mb-6 font-inter text-lg">{proj.description}</p>
                    <Link 
                      href={`/projects/${proj.slug}`}
                      className="text-[#C7EA46] hover:text-[#b0d830] transition-colors font-bold font-inter"
                    >
                      View Project →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
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
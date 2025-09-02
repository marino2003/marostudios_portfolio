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
    'gallery'
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
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with titles - updated styling */}
        <header className="mb-30 text-center">
          <h1 className="text-[140px] font-bold text-white  font-inter text-transform: uppercase">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-lg font-regular text-white mb-30 max-w-4xl mx-auto font-inter">
              {project.subtitle}
            </p>
          )}
          
          {/* Featured image with relative positioning, 1fr width, and 800px height */}
          {project.featuredImage && (
            <div className="relative w-full h-[800px] rounded-3xl overflow-hidden mb-16">
              <img 
                src={project.featuredImage} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Tech tags with white border */}
          {project.tech && (
            <div className="flex flex-wrap justify-center gap-3 mb-20">
              {project.tech.map((tech, index) => (
                <span 
                  key={index} 
                  className="px-4 py-2 border border-white text-white rounded-full text-sm font-bold"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </header>
        
        {/* Content sections - applying new styling with Inter font, white body text, and padded section titles */}
        <div className="space-y-28">
          {sections.map((section, index) => (
            <section key={index} className="mb-16">
              <h2 className="text-lg font-normal text-white mb-6 text-left font-inter pl-4">
                {section.title}
              </h2>
              <div className="text-white max-w-4xl text-lg font-inter">
                {section.content.split('\n').filter(line => line.trim() !== '').map((paragraph, pIndex) => (
                  <p key={pIndex} className="mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
        
        {/* Gallery section - displaying actual gallery images */}
        <div className="mt-28 mb-28">
          <h3 className="text-lg font-normal text-white mb-8 text-left font-inter pl-4">Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          <div className="mt-32">
            <h3 className="text-lg font-normal text-white mb-12 text-left font-inter pl-4">More Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {moreProjects.map((proj) => (
                <div key={proj.slug} className="bg-gray-800 rounded-2xl overflow-hidden hover:bg-gray-700 transition-colors">
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-white mb-2 font-inter">{proj.title}</h4>
                    <p className="text-white mb-4 font-inter text-lg">{proj.description}</p>
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
import Container from './components/ui/Container';
import Hero from './components/sections/Hero';
import Link from 'next/link';
import { getFeaturedProjects } from '@/lib/projects';

export default function HomePage() {
  const featuredProjects = getFeaturedProjects([
    'title',
    'slug',
    'description',
    'featuredImage'
  ]);

  return (
    <Container>
      <Hero />
      
      {/* Projects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Check out some of my recent work and projects I'm proud of.
            </p>
          </div>
          
          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <Link 
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="block group"
                >
                  <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    {project.featuredImage && (
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={project.featuredImage} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#C7EA46] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-300">
                        {project.description}
                      </p>
                      <div className="mt-4 text-[#C7EA46] font-medium group-hover:text-[#b0d830] transition-colors">
                        View Project →
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-xl">
                No featured projects yet. Add some projects with <code className="bg-gray-800 px-2 py-1 rounded">featured: true</code> in the frontmatter.
              </p>
            </div>
          )}
        </div>
      </section>
    </Container>
  );
}

import Container from './components/ui/Container';
import Hero from './components/sections/Hero';
import Link from 'next/link';
import { getFeaturedProjects } from '@/lib/projects';
import ProjectCard from './components/ProjectCard';
import { FadeIn } from '@/components/ui/ScrollAnimations';
import { ProjectCardAnimation } from '@/components/ui/ProjectCardAnimation';

export default function HomePage() {
  // Get only the first 3 featured projects
  const featuredProjects = getFeaturedProjects([
    'title',
    'slug',
    'description',
    'featuredImage',
    'categorie',
    'rol'
  ]).slice(0, 3);

  return (
    <Container>
      <Hero />
      
      {/* Projects Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-lg font-normal text-white mb-4 md:mb-0 font-inter text-left">Projecten</h2>
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
            {/* "Meer Projecten" button - shown under project cards on mobile/tablet only */}
            <div className="mt-8 sm:mt-12 md:mt-16 md:hidden flex justify-start">
            </div>
          </FadeIn>
          
          {featuredProjects.length > 0 ? (
            <div className="space-y-6 sm:space-y-8">
              {featuredProjects.map((project, index) => (
                <ProjectCardAnimation key={project.slug} delay={index * 0.1} direction="up" distance={30}>
                  <ProjectCard 
                    project={project}
                    fullWidth={true}
                  />
                </ProjectCardAnimation>
              ))}
            </div>
          ) : (
            <FadeIn>
              <div className="text-center py-12">
                <p className="text-gray-400 text-xl">
                  No featured projects yet. Add some projects with <code className="bg-gray-800 px-2 py-1 rounded">featured: true</code> in the frontmatter.
                </p>
              </div>
            </FadeIn>
          )}
          
          {/* "Meer Projecten" button - shown under project cards on mobile/tablet only */}
          <div className="mt-8 sm:mt-12 md:mt-16 md:hidden flex justify-start">
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
      </section>
    </Container>
  );
}

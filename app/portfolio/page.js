import Container from '../components/ui/Container';
import { getAllProjects } from '@/lib/projects';
import ProjectCard from '../components/ProjectCard';

export default function PortfolioPage() {
  const allProjects = getAllProjects([
    'title',
    'slug',
    'description',
    'featuredImage',
    'categorie',
    'rol'
  ]);

  return (
    <Container>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">Portfolio</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore all of my projects and see the work I'm passionate about.
            </p>
          </div>
          
          {allProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              {allProjects.map((project) => (
                <ProjectCard 
                  key={project.slug}
                  project={project}
                  fullWidth={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-xl">
                No projects available yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </Container>
  );
}
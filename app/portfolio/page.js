import Container from '../components/ui/Container';
import { getAllProjects } from '@/lib/projects';
import ProjectCard from '../components/ProjectCard';
import { FadeIn, StaggeredFadeIn, StaggeredItem } from '@/components/ui/ScrollAnimations';

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
      <section className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-32">
              <h1 className="text-[140px] font-bold text-white font-inter text-transform: uppercase mb-6">
                Portfolio
              </h1>
              <p className="text-lg font-regular text-white max-w-4xl mx-auto font-inter">
                Bekijk al mijn projecten en ontdek het werk waar ik echt passie voor heb.
              </p>
            </div>
          </FadeIn>
          
          {allProjects.length > 0 ? (
            <StaggeredFadeIn>
              <div className="grid grid-cols-1 gap-16">
                {allProjects.map((project) => (
                  <StaggeredItem key={project.slug}>
                    <ProjectCard 
                      project={project}
                      fullWidth={true}
                    />
                  </StaggeredItem>
                ))}
              </div>
            </StaggeredFadeIn>
          ) : (
            <FadeIn>
              <div className="text-center py-12">
                <p className="text-gray-400 text-xl">
                  No projects available yet.
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </Container>
  );
}
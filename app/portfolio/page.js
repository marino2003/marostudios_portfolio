import Container from '../components/ui/Container';
import { getAllProjects } from '@/lib/projects';
import ProjectCard from '../components/ProjectCard';
import { FadeIn } from '@/components/ui/ScrollAnimations';
import { ProjectCardAnimation } from '@/components/ui/ProjectCardAnimation';

export default function PortfolioPage() {
  const allProjects = getAllProjects([
    'title',
    'slug',
    'description',
    'featuredImage',
    'categorie',
    'rol',
    'order'  // Make sure we include the order field for proper sorting
  ]);

  return (
    <Container>
      <section className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-32">
              <h1 className="text-5xl md:text-7xl lg:text-[140px] font-bold text-white font-inter uppercase mb-6 relative inline-block group">
                Portfolio
                <span className="absolute bottom-0 left-0 w-0 h-1.5 bg-[#C7EA46] rounded-full animate-draw-line group-hover:w-full transition-all duration-500"></span>
              </h1>
              <p className="text-lg font-regular text-white max-w-4xl mx-auto font-inter">
                Bekijk al mijn projecten en ontdek het werk waar ik echt passie voor heb.
              </p>
            </div>
          </FadeIn>
          
          {allProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
              {allProjects.map((project, index) => (
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
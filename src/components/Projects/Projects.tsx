import type { Project } from '../../types';
import { SectionWrapper } from '../shared';
import { ProjectCard } from './ProjectCard';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <SectionWrapper id="projects" title="Key Projects">
      <div className="space-y-6 md:space-y-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
}

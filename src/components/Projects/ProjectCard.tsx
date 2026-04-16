import type { Project } from '../../types';
import { TechTag } from '../shared';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="bg-surface-secondary border border-border-default rounded-xl p-6">
      <h3 className="text-lg font-bold text-text-primary mb-2">{project.title}</h3>
      <p className="text-sm text-text-tertiary leading-relaxed mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <TechTag key={tech} label={tech} />
        ))}
      </div>
    </article>
  );
}

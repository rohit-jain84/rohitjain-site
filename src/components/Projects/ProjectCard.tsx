import type { Project } from '../../types';
import { TechTag } from '../shared';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="bg-gray-50 border border-gray-200 rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
        <h3 className="text-xl font-semibold text-gray-900">
          {project.title}
        </h3>
        <span className="text-sm text-gray-500 flex-shrink-0">
          {project.source}
        </span>
      </div>

      <div className="space-y-4 text-gray-700">
        <div>
          <span className="font-medium text-gray-900">Context: </span>
          {project.context}
        </div>
        <div>
          <span className="font-medium text-gray-900">Approach: </span>
          {project.approach}
        </div>
        <div>
          <span className="font-medium text-gray-900">Outcome: </span>
          {project.outcome}
        </div>
      </div>

      <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r">
        <p className="text-sm text-gray-700">
          <span className="font-medium text-gray-900">Architectural Insight: </span>
          {project.architecturalInsight}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <TechTag key={tech} label={tech} />
        ))}
      </div>
    </article>
  );
}

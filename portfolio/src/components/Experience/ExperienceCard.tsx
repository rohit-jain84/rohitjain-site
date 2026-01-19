import type { Role } from '../../types';
import { TechTag } from '../shared';

interface ExperienceCardProps {
  role: Role;
}

export function ExperienceCard({ role }: ExperienceCardProps) {
  return (
    <article className="border-l-4 border-gray-300 pl-6 py-2">
      <h3 className="text-xl font-semibold text-gray-900">
        {role.title}
      </h3>
      <p className="text-gray-600 mt-1">
        {role.company} · {role.location}
      </p>
      <p className="text-sm text-gray-500 mt-1">
        {role.startDate} – {role.endDate}
      </p>
      {role.note && (
        <p className="text-sm text-gray-500 italic mt-1">
          {role.note}
        </p>
      )}

      <ul className="mt-4 space-y-3">
        {role.bullets.map((bullet, index) => (
          <li key={index} className="text-gray-700 leading-relaxed">
            <span className="text-gray-400 mr-2">•</span>
            {bullet}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-2">
        {role.techStack.map((tech) => (
          <TechTag key={tech} label={tech} />
        ))}
      </div>
    </article>
  );
}

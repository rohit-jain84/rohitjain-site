import type { Role } from '../../types';
import { SectionWrapper } from '../shared';
import { ExperienceCard } from './ExperienceCard';

interface ExperienceProps {
  roles: Role[];
}

export function Experience({ roles }: ExperienceProps) {
  return (
    <SectionWrapper id="experience" title="Experience">
      <div className="space-y-8 md:space-y-10">
        {roles.map((role) => (
          <ExperienceCard key={role.id} role={role} />
        ))}
      </div>
    </SectionWrapper>
  );
}

import type { SkillCategory } from '../../types';
import { SectionWrapper } from '../shared';
import { SkillCategoryCard } from './SkillCategoryCard';

interface SkillsProps {
  categories: SkillCategory[];
}

export function Skills({ categories }: SkillsProps) {
  return (
    <SectionWrapper id="skills" title="Technical Skills">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <SkillCategoryCard key={category.id} category={category} />
        ))}
      </div>
    </SectionWrapper>
  );
}

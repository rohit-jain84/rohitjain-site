import type { SkillCategory } from '../../types';
import { TechTag } from '../shared';

interface SkillCategoryCardProps {
  category: SkillCategory;
}

export function SkillCategoryCard({ category }: SkillCategoryCardProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <h3 className="font-semibold text-lg text-gray-900 mb-3">
        {category.name}
      </h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <TechTag key={skill} label={skill} />
        ))}
      </div>
    </div>
  );
}

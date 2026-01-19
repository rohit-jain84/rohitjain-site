import type { EducationData } from '../../types';
import { SectionWrapper } from '../shared';

interface EducationProps {
  data: EducationData;
}

export function Education({ data }: EducationProps) {
  return (
    <SectionWrapper id="education" title="Education">
      <div className="border-l-4 border-gray-300 pl-6 py-2">
        <h3 className="text-lg font-semibold text-gray-900">
          {data.degree} in {data.field}
        </h3>
        <p className="text-gray-600 mt-1">
          {data.institution}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {data.years}
        </p>
      </div>
    </SectionWrapper>
  );
}

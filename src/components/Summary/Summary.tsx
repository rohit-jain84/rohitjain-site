import type { SummaryData } from '../../types';

interface SummaryProps {
  data: SummaryData;
}

export function Summary({ data }: SummaryProps) {
  return (
    <section className="py-12 border-t border-gray-200">
      <div className="space-y-4 max-w-3xl">
        {data.paragraphs.map((paragraph, index) => (
          <p key={index} className="text-gray-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

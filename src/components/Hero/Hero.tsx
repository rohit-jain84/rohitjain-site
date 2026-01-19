import type { HeroData } from '../../types';

interface HeroProps {
  data: HeroData;
}

export function Hero({ data }: HeroProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={data.photoUrl}
            alt={data.name}
            className="w-full h-full object-cover object-top scale-110"
          />
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            {data.name}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mt-2">
            {data.title}
          </p>
          <p className="text-gray-500 mt-3 max-w-xl">
            {data.headline}
          </p>
        </div>
      </div>
    </section>
  );
}

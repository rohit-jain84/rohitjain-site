interface SectionWrapperProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export function SectionWrapper({ id, title, children }: SectionWrapperProps) {
  return (
    <section id={id} className="py-16 md:py-24">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8 md:mb-12">
        {title}
      </h2>
      {children}
    </section>
  );
}

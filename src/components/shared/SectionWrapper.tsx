interface SectionWrapperProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function SectionWrapper({ id, title, subtitle, children }: SectionWrapperProps) {
  return (
    <section id={id} className="py-16 md:py-24">
      <h2 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-tertiary mb-8 md:mb-12 max-w-2xl">{subtitle}</p>
      )}
      {!subtitle && <div className="mb-8 md:mb-12" />}
      {children}
    </section>
  );
}

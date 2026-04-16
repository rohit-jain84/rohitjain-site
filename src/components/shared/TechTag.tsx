interface TechTagProps {
  label: string;
  variant?: 'default' | 'brand' | 'accent';
}

export function TechTag({ label, variant = 'default' }: TechTagProps) {
  const base = 'inline-block text-xs font-medium px-2.5 py-1 rounded-full border transition-colors duration-150';
  const variants = {
    default: 'bg-surface-tertiary text-text-secondary border-border-default hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary-subtle',
    brand: 'bg-brand-primary-subtle text-brand-primary border-transparent',
    accent: 'bg-brand-accent-subtle text-brand-accent border-transparent',
  };

  return (
    <span className={`${base} ${variants[variant]}`}>
      {label}
    </span>
  );
}

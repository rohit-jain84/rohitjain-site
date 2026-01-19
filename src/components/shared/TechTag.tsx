interface TechTagProps {
  label: string;
}

export function TechTag({ label }: TechTagProps) {
  return (
    <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded">
      {label}
    </span>
  );
}

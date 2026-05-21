'use client';

interface SectionHeaderProps {
  title: string;
  description: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">{title}</p>
      <p className="text-lg font-semibold text-slate-900 sm:text-xl">{description}</p>
    </div>
  );
}

'use client';

interface ProgressBarProps {
  value: number;
  max: number;
}

export function ProgressBar({ value, max }: ProgressBarProps) {
  const ratio = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className="rounded-full bg-slate-100/70 p-1">
      <div className="overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-sky-500 via-slate-700 to-violet-500 transition-all duration-300"
          style={{ width: `${ratio}%` }}
        />
      </div>
      <div className="mt-2 text-right text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {ratio}% complete
      </div>
    </div>
  );
}

'use client';

import { useMemo } from 'react';
import { Star, Smile, Meh, Frown } from 'lucide-react';

interface RatingStarsProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

type RatingValue = 1 | 2 | 3 | 4 | 5;

const feedbackMap: Record<RatingValue, { label: string; icon: typeof Frown; tone: string }> = {
  1: { label: 'Needs improvement', icon: Frown, tone: 'text-rose-500' },
  2: { label: 'Below average', icon: Meh, tone: 'text-amber-500' },
  3: { label: 'Solid', icon: Smile, tone: 'text-sky-500' },
  4: { label: 'Very good', icon: Smile, tone: 'text-slate-700' },
  5: { label: 'Excellent', icon: Smile, tone: 'text-slate-900' },
};

export function RatingStars({ label, value, onChange }: RatingStarsProps) {
  const feedback = useMemo(() => {
    if (value >= 1 && value <= 5) {
      return feedbackMap[value as RatingValue];
    }
    return { label: 'Not rated yet', icon: Meh, tone: 'text-slate-400' };
  }, [value]);
  const Icon = feedback.icon;

  return (
    <div className="space-y-3 rounded-[1.75rem] border border-slate-200 bg-white/90 p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">{label}</p>
          <p className="text-xs text-slate-500">Choose a rating out of 5</p>
        </div>
        <div className="flex items-center gap-1 text-slate-700">
          <Icon size={18} className={feedback.tone} />
          <span className="font-semibold">{value > 0 ? `${value}.0` : '0.0'}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`rounded-full p-2 transition ${value >= star ? 'bg-[#1a73e8] text-white hover:bg-[#1669d1]' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
          >
            <Star size={18} />
          </button>
        ))}
      </div>
      <p className="text-sm text-slate-600">{feedback.label}</p>
    </div>
  );
}

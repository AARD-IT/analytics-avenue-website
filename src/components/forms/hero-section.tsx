'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, BadgeCheck, Clock3 } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  description: string;
  details?: string;
  illustration?: React.ReactNode;
  compact?: boolean;
}

const badges = [
  { label: 'Secure Submission', icon: ShieldCheck },
  { label: 'Confidential Data', icon: BadgeCheck },
  { label: 'Professional Support', icon: Sparkles },
  { label: 'Fast Response', icon: Clock3 },
];

export function HeroSection({ title, description, details, illustration, compact }: HeroSectionProps) {
  return (
    <section className="rounded-[2rem] overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50 to-violet-50 shadow-[0_40px_120px_-70px_rgba(59,130,246,0.35)] border border-white/80">
      <div className="aa-container px-4 py-8 lg:px-8 lg:py-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid gap-8 max-w-5xl"
        >
          <div className="flex flex-col gap-4 rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-sm backdrop-blur-xl sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
                  <img src="/assets/logo/logo.svg" alt="Analytics Avenue" className="h-12 w-12 object-contain" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Analytics Avenue Portal</p>
                  <p className="text-2xl font-semibold tracking-tight text-slate-900 lg:text-3xl">Analytics Avenue</p>
                </div>
              </div>
              <p className="text-xs uppercase tracking-[0.32em] text-sky-700">Corporate intake workflow</p>
            </div>

            <div className="space-y-5">
              <p className="max-w-3xl text-sm leading-7 text-slate-600">
                Analytics Avenue delivers modern enterprise workflows, onboarding systems, analytics solutions, and operational platforms designed for scalable business processes and professional client experiences.
              </p>
              <div className="space-y-4">
                <h1 className="aa-title text-slate-900">{title}</h1>
                <p className="aa-subtitle max-w-3xl text-slate-600">{description}</p>
              </div>
            </div>

            {details ? <p className="max-w-3xl text-sm leading-7 text-slate-500">{details}</p> : null}

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {badges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div key={badge.label} className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-slate-700 shadow-sm">
                      <Icon size={18} />
                    </span>
                    <p className="text-sm font-semibold text-slate-700">{badge.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FormCardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function FormCard({ children, title, subtitle }: FormCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="rounded-[2rem] border border-slate-200/90 bg-white/95 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:p-8"
    >
      {(title || subtitle) && (
        <div className="mb-6 space-y-2">
          {title ? <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2> : null}
          {subtitle ? <p className="text-sm leading-6 text-slate-600">{subtitle}</p> : null}
        </div>
      )}
      <div className="space-y-8">{children}</div>
    </motion.section>
  );
}

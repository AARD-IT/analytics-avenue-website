'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Footer } from './footer';

interface FormLayoutProps {
  children: ReactNode;
  breadcrumbs?: ReactNode;
}

export function FormLayout({ children, breadcrumbs }: FormLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="aa-container px-4 py-8 lg:px-6 lg:py-12">
        {breadcrumbs}
        <div className="space-y-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}

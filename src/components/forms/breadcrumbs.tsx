'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  items: Array<{ label: string; href: string }>; 
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
      {items.map((item, index) => (
        <div key={item.href} className="inline-flex items-center gap-2">
          <Link href={item.href} className="transition hover:text-slate-900">
            {item.label}
          </Link>
          {index < items.length - 1 ? <ChevronRight size={14} /> : null}
        </div>
      ))}
    </nav>
  );
}

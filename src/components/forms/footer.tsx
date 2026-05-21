'use client';

import { Mail, Globe, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/90 py-8">
      <div className="aa-container grid gap-6 px-6 text-slate-700 lg:grid-cols-[1fr] lg:px-10">
        <div className="space-y-3 text-sm leading-7 text-slate-700">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Notice</p>
          <p>Check your email calendar and acknowledge the invite in next 24 hrs.</p>
          <p>Email Support: <span className="font-semibold text-slate-900">placements@analyticsavenue.in</span></p>
          <p>Whatsapp Support: <span className="font-semibold text-slate-900">+91 75502 79838</span></p>
          <p>Website: <a href="https://analyticsavenue.in/" className="font-semibold text-slate-900 hover:text-sky-600">https://analyticsavenue.in/</a></p>
          <p className="text-slate-400">© 2025 Analytics Avenue. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '@/lib/supabase';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function verifySession() {
      const { data } = await getSession();
      if (!mounted) return;
      if (!data.session) {
        router.replace('/forms/admin/login');
        return;
      }
      setReady(true);
    }

    verifySession();

    return () => {
      mounted = false;
    };
  }, [router]);

  if (!ready) {
    return <div className="min-h-screen bg-slate-50 p-10 text-slate-600">Checking admin access…</div>;
  }

  return <>{children}</>;
}

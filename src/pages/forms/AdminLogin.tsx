'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession, signInWithPassword } from '@/lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      const { data } = await getSession();
      if (mounted && data.session) router.replace('/forms/admin');
    }

    checkSession();
    return () => {
      mounted = false;
    };
  }, [router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError('');

    const { data, error } = await signInWithPassword(email, password);

    if (error) {
      setError(error.message || 'Invalid email or password.');
      setPending(false);
      return;
    }

    if (data.session) {
      router.replace('/forms/admin');
      return;
    }

    setPending(false);
    setError('Unable to sign in. Please try again.');
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto flex max-w-md flex-col rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.35)]">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700">Admin access</p>
        <h1 className="mt-3 text-3xl font-semibold">Sign in to manage forms</h1>
        <p className="mt-2 text-sm text-slate-600">Only authenticated administrators can use the form management dashboard.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="space-y-1 text-sm text-slate-700">
            <span>Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-400 focus:bg-white" />
          </label>
          <label className="space-y-1 text-sm text-slate-700">
            <span>Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-400 focus:bg-white" />
          </label>

          {error ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

          <button type="submit" disabled={pending} className="w-full rounded-full bg-[var(--aa-primary)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--aa-primary-hover)] disabled:cursor-not-allowed disabled:opacity-70">{pending ? 'Signing in…' : 'Sign in'}</button>
        </form>
      </div>
    </main>
  );
}

'use client';

import { useEffect, useMemo, useState } from 'react';
import type { FormDraft, FormRecord } from '@/types/forms';

const blankForm = (): FormDraft => ({
  title: '',
  description: '',
  category: '',
  google_form_url: '',
  display_order: 0,
  is_active: true,
});

export function FormModal({
  open,
  mode,
  form,
  nextDisplayOrder = 1,
  onClose,
  onSubmit,
}: {
  open: boolean;
  mode: 'create' | 'edit';
  form?: FormRecord | null;
  nextDisplayOrder?: number;
  onClose: () => void;
  onSubmit: (payload: FormDraft) => Promise<void>;
}) {
  const [draft, setDraft] = useState<FormDraft>(blankForm());
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (open) {
      if (form) {
        setDraft({
          title: form.title ?? '',
          description: form.description ?? '',
          category: form.category ?? '',
          google_form_url: form.google_form_url ?? '',
          display_order: form.display_order ?? 0,
          is_active: form.is_active ?? true,
        });
      } else {
        setDraft({
          ...blankForm(),
          display_order: nextDisplayOrder,
        });
      }
      setError('');
    }
  }, [open, form, nextDisplayOrder]);

  const isUrlValid = useMemo(() => {
    if (!draft.google_form_url.trim()) return false;
    try {
      new URL(draft.google_form_url);
      return true;
    } catch {
      return false;
    }
  }, [draft.google_form_url]);

  if (!open) return null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!draft.title.trim()) {
      setError('Title is required.');
      return;
    }

    if (!draft.google_form_url.trim()) {
      setError('Google Form URL is required.');
      return;
    }

    if (!isUrlValid) {
      setError('Please provide a valid URL.');
      return;
    }

    setPending(true);
    setError('');

    try {
      await onSubmit(draft);
      onClose();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to save this form.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4" role="presentation">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700">{mode === 'create' ? 'Add form' : 'Edit form'}</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">{mode === 'create' ? 'Create a new form' : 'Update this form'}</h3>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 hover:bg-slate-50">Close</button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1 text-sm text-slate-700">
              <span>Form Title</span>
              <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-400 focus:bg-white" />
            </label>
            <label className="space-y-1 text-sm text-slate-700">
              <span>Category</span>
              <input value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-400 focus:bg-white" />
            </label>
          </div>

          <label className="space-y-1 text-sm text-slate-700">
            <span>Description</span>
            <textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} rows={3} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-400 focus:bg-white" />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1 text-sm text-slate-700">
              <span>Google Form URL</span>
              <input value={draft.google_form_url} onChange={(e) => setDraft({ ...draft, google_form_url: e.target.value })} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-400 focus:bg-white" />
            </label>
            <label className="space-y-1 text-sm text-slate-700">
              <span>Display Order</span>
              <input type="number" value={draft.display_order} onChange={(e) => setDraft({ ...draft, display_order: Number(e.target.value) || 0 })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-400 focus:bg-white" />
            </label>
          </div>

          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <input type="checkbox" checked={draft.is_active} onChange={(e) => setDraft({ ...draft, is_active: e.target.checked })} className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
            Active status
          </label>

          {error ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
            <button type="submit" disabled={pending} className="rounded-full bg-[var(--aa-primary)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--aa-primary-hover)] disabled:cursor-not-allowed disabled:opacity-70">{pending ? 'Saving…' : mode === 'create' ? 'Create form' : 'Save changes'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ProtectedRoute } from '@/components/forms/ProtectedRoute';
import { FormModal } from '@/components/forms/FormModal';
import { DeleteConfirmDialog } from '@/components/forms/DeleteConfirmDialog';
import { createForm, deleteForm, getAllForms, updateForm } from '@/lib/forms';
import { signOutUser } from '@/lib/supabase';
import type { FormDraft, FormRecord } from '@/types/forms';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [forms, setForms] = useState<FormRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const nextDisplayOrder = forms.reduce((max, form) => Math.max(max, form.display_order ?? 0), 0) + 1;
  const [modalOpen, setModalOpen] = useState(false);
  const [editingForm, setEditingForm] = useState<FormRecord | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<FormRecord | null>(null);

  async function loadForms() {
    setLoading(true);
    const { data, error } = await getAllForms();
    if (error) {
      toast.error(error.message || 'Unable to load forms.');
    } else {
      setForms(data ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadForms();
  }, []);

  async function handleSubmit(payload: FormDraft) {
    if (editingForm) {
      const { error } = await updateForm(editingForm.id, payload);
      if (error) throw error;
      toast.success('Form updated successfully.');
    } else {
      const { error } = await createForm(payload);
      if (error) throw error;
      toast.success('Form created successfully.');
    }
    setEditingForm(null);
    await loadForms();
  }

  async function handleDelete() {
    if (!deleteTarget) return;

    const { error } = await deleteForm(deleteTarget.id);
    if (error) {
      toast.error(error.message || 'Unable to delete this form.');
      return;
    }

    toast.success('Form deleted successfully.');
    setDeleteTarget(null);
    await loadForms();
  }

  async function handleSignOut() {
    await signOutUser();
    router.replace('/forms/admin/login');
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <div className="flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.35)] lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700">Admin dashboard</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Forms management</h1>
              <p className="mt-2 text-sm text-slate-600">Add, edit, and remove public forms without exposing these controls to visitors.</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => { setEditingForm(null); setModalOpen(true); }} className="rounded-full bg-[var(--aa-primary)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--aa-primary-hover)]">+ Add Form</button>
              <button onClick={handleSignOut} className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">Sign out</button>
            </div>
          </div>

          <section className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Total Forms</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{forms.length}</p>
            </article>
            <article className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Active Forms</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{forms.filter((item) => item.is_active).length}</p>
            </article>
          </section>

          <section className="mt-6 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Order</th>
                    <th className="px-4 py-3 font-semibold">Title</th>
                    <th className="px-4 py-3 font-semibold">Category</th>
                    <th className="px-4 py-3 font-semibold">Google Form URL</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {loading ? (
                    <tr><td colSpan={6} className="px-4 py-6 text-slate-500">Loading forms…</td></tr>
                  ) : forms.length === 0 ? (
                    <tr><td colSpan={6} className="px-4 py-6 text-slate-500">No forms yet. Add one to get started.</td></tr>
                  ) : forms.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80">
                      <td className="px-4 py-4">{item.display_order}</td>
                      <td className="px-4 py-4">{item.title}</td>
                      <td className="px-4 py-4">{item.category || '—'}</td>
                      <td className="px-4 py-4 max-w-xs truncate"><a href={item.google_form_url} target="_blank" rel="noreferrer" className="text-sky-700 hover:underline">{item.google_form_url}</a></td>
                      <td className="px-4 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{item.is_active ? 'Active' : 'Inactive'}</span></td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => { setEditingForm(item); setModalOpen(true); }} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">Edit</button>
                          <button onClick={() => setDeleteTarget(item)} className="rounded-full border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <FormModal
          open={modalOpen}
          mode={editingForm ? 'edit' : 'create'}
          form={editingForm}
          nextDisplayOrder={nextDisplayOrder}
          onClose={() => {
            setModalOpen(false);
            setEditingForm(null);
          }}
          onSubmit={handleSubmit}
        />

        <DeleteConfirmDialog
          open={Boolean(deleteTarget)}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      </main>
    </ProtectedRoute>
  );
}

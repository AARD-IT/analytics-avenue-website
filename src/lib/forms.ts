import { supabase } from './supabase';
import type { FormDraft, FormRecord } from '@/types/forms';

export async function getActiveForms(): Promise<{ data: FormRecord[] | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('forms')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  return { data, error: error ? new Error(error.message) : null };
}

export async function getAllForms(): Promise<{ data: FormRecord[] | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('forms')
    .select('*')
    .order('display_order', { ascending: true });

  return { data, error: error ? new Error(error.message) : null };
}

export async function createForm(input: FormDraft) {
  return supabase.from('forms').insert([input]).select('*').single();
}

export async function updateForm(id: string, input: FormDraft) {
  return supabase.from('forms').update({ ...input, updated_at: new Date().toISOString() }).eq('id', id).select('*').single();
}

export async function deleteForm(id: string) {
  return supabase.from('forms').delete().eq('id', id);
}

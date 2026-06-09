export type FormRecord = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  google_form_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type FormDraft = {
  title: string;
  description: string;
  category: string;
  google_form_url: string;
  display_order: number;
  is_active: boolean;
};

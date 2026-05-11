"use client";

import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { submitToGoogleAppsScript } from "@/lib/google-script";

/**
 * Contact form fields aligned with analyticsavenuerd.in/contact.
 * Submits to Google Apps Script Web App (`CONTACT_LEADS` sheet).
 */
export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;
    const data = new FormData(form);

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitToGoogleAppsScript({
        formType: "contact",
        name: String(data.get("name") ?? "").trim(),
        email: String(data.get("email") ?? "").trim(),
        phone: String(data.get("phone") ?? "").trim(),
        organization: String(data.get("organization") ?? "").trim(),
        designation: String(data.get("designation") ?? "").trim(),
        message: String(data.get("message") ?? "").trim(),
      });
      toast.success("Message sent successfully");
      setSubmitted(true);
      form.reset();
    } catch {
      const msg = "Error submitting form. Please try again.";
      setSubmitError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  if (submitted) {
    return (
      <div
        className="aa-card rounded-[var(--aa-radius-2xl)] border border-emerald-200/80 bg-emerald-50/90 p-8 text-center shadow-[var(--aa-shadow-md)]"
        role="status"
      >
        <p className="font-[family-name:var(--font-heading)] text-lg font-bold text-emerald-900">
          Message sent successfully!
        </p>
        <p className="mt-2 text-sm text-emerald-800/90">
          Thank you for reaching out. Our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="aa-card space-y-6 rounded-[var(--aa-radius-2xl)] border border-[var(--aa-border)] bg-white p-6 shadow-[var(--aa-shadow-md)] sm:p-8 lg:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Name
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-[var(--aa-primary)] focus:ring-2 focus:ring-[var(--aa-primary)]/25"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Email
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-[var(--aa-primary)] focus:ring-2 focus:ring-[var(--aa-primary)]/25"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Phone
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-[var(--aa-primary)] focus:ring-2 focus:ring-[var(--aa-primary)]/25"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Organization
          <input
            name="organization"
            type="text"
            autoComplete="organization"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-[var(--aa-primary)] focus:ring-2 focus:ring-[var(--aa-primary)]/25"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
          Designation
          <input
            name="designation"
            type="text"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-[var(--aa-primary)] focus:ring-2 focus:ring-[var(--aa-primary)]/25"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
          Message
          <textarea
            name="message"
            rows={5}
            required
            className="mt-1.5 w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-[var(--aa-primary)] focus:ring-2 focus:ring-[var(--aa-primary)]/25"
          />
        </label>
      </div>

      <div className="pt-2">
        {submitError && (
          <p className="mb-3 text-sm text-rose-600" role="alert">
            {submitError}
          </p>
        )}
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="w-full px-6 py-3 text-sm sm:w-auto"
        >
          {isSubmitting ? "Submitting..." : "Send Message"}
        </Button>
      </div>
    </form>
  );
}

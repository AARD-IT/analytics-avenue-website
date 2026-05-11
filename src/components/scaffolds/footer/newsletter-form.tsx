"use client";

import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { submitToGoogleAppsScript } from "@/lib/google-script";

const fontBody = "font-[family-name:var(--font-body)]";

export default function NewsletterForm() {
  const [showThanks, setShowThanks] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!showThanks) return;
    const t = window.setTimeout(() => setShowThanks(false), 5000);
    return () => window.clearTimeout(t);
  }, [showThanks]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const normalizedEmail = email.trim();
    if (!normalizedEmail) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitToGoogleAppsScript({
        formType: "cta",
        email: normalizedEmail,
      });
      toast.success("Subscribed successfully");
      setShowThanks(true);
      setName("");
      setEmail("");
    } catch {
      setShowThanks(false);
      const msg = "Subscription failed. Please try again.";
      setSubmitError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto mt-7 w-full max-w-lg">
      <p className={`${fontBody} mb-3 text-sm text-white/90`}>
        Subscribe to our newsletter for product updates, learning tips, and data
        insights.
      </p>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-2"
      >
        <label htmlFor="footer-newsletter-name" className="sr-only">
          Name
        </label>
        <input
          id="footer-newsletter-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          className={`${fontBody} min-h-[2.75rem] w-full min-w-0 flex-1 rounded-xl border border-white/40 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/55 focus:border-white/70 focus:outline-none focus:ring-2 focus:ring-white/40`}
        />
        <label htmlFor="footer-newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          className={`${fontBody} min-h-[2.75rem] w-full flex-1 rounded-xl border border-white/40 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/55 focus:border-white/70 focus:outline-none focus:ring-2 focus:ring-white/40`}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${fontBody} aa-btn-inverse shrink-0 transition hover:-translate-y-0.5`}
        >
          {isSubmitting ? "Submitting..." : "Subscribe"}
        </button>
      </form>
      {submitError && (
        <p className={`${fontBody} mt-3 text-sm text-rose-200`} role="alert">
          {submitError}
        </p>
      )}
      {showThanks && (
        <p className={`${fontBody} mt-3 text-sm text-white/90`} role="status">
          Thanks — you&apos;re on the list.
        </p>
      )}
      <p className={`${fontBody} mt-3 text-xs text-white/65`}>
        We respect your inbox. Unsubscribe anytime.
      </p>
    </div>
  );
}

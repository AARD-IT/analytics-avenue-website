"use client";

import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { postToGoogleScript } from "@/lib/google-script";
import {
  CAREER_PATHS,
  CAREERS_APPLICATION_SECTION_IDS,
  isCareersDataAnalyticsRole,
} from "../data";

const S = CAREERS_APPLICATION_SECTION_IDS;

type CareersApplicationFormProps = {
  /** Notifies parent (e.g. to collapse TOC) after a successful client-side submit. */
  onSubmitted?: () => void;
  /** Fired when the selected role changes (for TOC / conditional sections in the parent). */
  onRoleChange?: (role: string) => void;
};

/**
 * Client-side application form mirroring analyticsavenuerd.in/careers fields.
 * Submits are acknowledged locally until a backend endpoint is wired.
 */
export default function CareersApplicationForm({ onSubmitted, onRoleChange }: CareersApplicationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const showDataAnalyticsBlock = isCareersDataAnalyticsRole(selectedRole);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isSubmitting) return;

      const form = e.currentTarget;
      const data = new FormData(form);
      const role = String(data.get("role") ?? "").trim();
      const isDataRole = isCareersDataAnalyticsRole(role);

      setIsSubmitting(true);
      setSubmitError(null);
      try {
        await postToGoogleScript({
          type: "career",
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          phone: String(data.get("phone") ?? "").trim(),
          location: String(data.get("location") ?? "").trim(),
          qualification: String(data.get("qualification") ?? "").trim(),
          status: String(data.get("applicationStatus") ?? "").trim(),
          experience: String(data.get("experience") ?? "").trim(),
          ctc: String(data.get("currentCtc") ?? "").trim(),
          takeHome: String(data.get("takeHome") ?? "").trim(),
          immediateJoiner: String(data.get("immediateJoiner") ?? "").trim(),
          noticePeriod: String(data.get("noticePeriod") ?? "").trim(),
          role,
          resume: String(data.get("resumeLink") ?? "").trim(),
          profile: String(data.get("profileDetail") ?? "").trim(),
          workSamples: String(data.get("workSamples") ?? "").trim(),
          extraProjects: isDataRole
            ? {
                timeSeries: String(data.get("projTimeSeries") ?? "").trim(),
                classification: String(data.get("projClassification") ?? "").trim(),
                genAI: String(data.get("projGenAi") ?? "").trim(),
                openCV: String(data.get("projOpenCv") ?? "").trim(),
              }
            : {},
          extraSectors: isDataRole
            ? {
                automobile: String(data.get("sector_automobile") ?? "").trim(),
                logistics: String(data.get("sector_logistics") ?? "").trim(),
                healthcare: String(data.get("sector_healthcare") ?? "").trim(),
                finance: String(data.get("sector_finance") ?? "").trim(),
                supplyChain: String(data.get("sector_supply_chain") ?? "").trim(),
              }
            : {},
        });
        setSubmitted(true);
        onSubmitted?.();
        form.reset();
      } catch {
        setSubmitError("Submission failed. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, onSubmitted],
  );

  if (submitted) {
    return (
      <div
        className="aa-card rounded-[var(--aa-radius-2xl)] border border-[var(--aa-border)] bg-[var(--aa-surface-soft)] p-8 text-center shadow-[var(--aa-shadow-md)]"
        role="status"
      >
        <p className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--aa-text-strong)]">
          Thank you for your interest.
        </p>
        <p className="mt-2 text-sm text-[var(--aa-text-muted)]">
          Your application details have been recorded in this preview. Connect your form to your ATS
          or email workflow when ready.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="aa-card space-y-10 rounded-[var(--aa-radius-2xl)] border border-[var(--aa-border)] bg-white p-6 shadow-[var(--aa-shadow-md)] sm:p-8 lg:p-10"
    >
      <section id={S.basic} className="scroll-mt-28" aria-labelledby={`${S.basic}-heading`}>
        <h3
          id={`${S.basic}-heading`}
          className="font-[family-name:var(--font-heading)] text-xl font-bold text-slate-900"
        >
          Basic Details
        </h3>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            Email <span className="text-red-600">*</span>
            <input
              name="email"
              type="email"
              required
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 outline-none ring-[var(--aa-primary)]/0 transition focus:border-[var(--aa-primary)] focus:ring-2 focus:ring-[var(--aa-primary)]/25"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Name <span className="text-red-600">*</span>
            <input
              name="name"
              type="text"
              required
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-[var(--aa-primary)] focus:ring-2 focus:ring-[var(--aa-primary)]/25"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Phone Number <span className="text-red-600">*</span>
            <input
              name="phone"
              type="tel"
              required
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-[var(--aa-primary)] focus:ring-2 focus:ring-[var(--aa-primary)]/25"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Location <span className="text-red-600">*</span>
            <input
              name="location"
              type="text"
              required
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-[var(--aa-primary)] focus:ring-2 focus:ring-[var(--aa-primary)]/25"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
            Qualification <span className="text-red-600">*</span>
            <input
              name="qualification"
              type="text"
              required
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-[var(--aa-primary)] focus:ring-2 focus:ring-[var(--aa-primary)]/25"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
            Application Status <span className="text-red-600">*</span>
            <select
              name="applicationStatus"
              required
              defaultValue=""
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-[var(--aa-primary)] focus:ring-2 focus:ring-[var(--aa-primary)]/25"
            >
              <option value="" disabled>
                Choose Intern Experienced Fresher
              </option>
              <option value="intern">Intern</option>
              <option value="experienced">Experienced</option>
              <option value="fresher">Fresher</option>
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Experience
            <input
              name="experience"
              type="text"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-[var(--aa-primary)] focus:ring-2 focus:ring-[var(--aa-primary)]/25"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Current CTC
            <input
              name="currentCtc"
              type="text"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-[var(--aa-primary)] focus:ring-2 focus:ring-[var(--aa-primary)]/25"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
            Current Take Home per Month
            <input
              name="takeHome"
              type="text"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-[var(--aa-primary)] focus:ring-2 focus:ring-[var(--aa-primary)]/25"
            />
          </label>
          <fieldset className="sm:col-span-2">
            <legend className="text-sm font-medium text-slate-700">
              Immediate Joiner <span className="text-red-600">*</span>
            </legend>
            <div className="mt-2 flex flex-wrap gap-6">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input type="radio" name="immediateJoiner" value="yes" required className="text-[var(--aa-primary)]" />
                Yes
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input type="radio" name="immediateJoiner" value="no" className="text-[var(--aa-primary)]" />
                No
              </label>
            </div>
          </fieldset>
          <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
            Notice Period (in days)
            <input
              name="noticePeriod"
              type="number"
              min={0}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-[var(--aa-primary)] focus:ring-2 focus:ring-[var(--aa-primary)]/25"
            />
          </label>
        </div>
      </section>

      <section id={S.roles} className="scroll-mt-28" aria-labelledby={`${S.roles}-heading`}>
        <h3
          id={`${S.roles}-heading`}
          className="font-[family-name:var(--font-heading)] text-xl font-bold text-slate-900"
        >
          Role you apply
        </h3>
        <p className="mt-1 text-sm text-[var(--aa-text-muted)]">
          Select the one role you are applying for. Extra project questions appear for GenAI, Data Scientist, or Data
          Analytics.
        </p>
        <fieldset className="mt-4 min-w-0 border-0 p-0">
          <legend className="sr-only">Role you apply</legend>
          <ul className="grid gap-3 sm:grid-cols-2">
            {CAREER_PATHS.map((roleTitle, index) => (
              <li key={roleTitle}>
                <label
                  className={[
                    "flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2.5 text-sm transition",
                    selectedRole === roleTitle
                      ? "border-[var(--aa-primary)] bg-[color-mix(in_srgb,var(--aa-primary)_8%,white)] text-slate-900 shadow-[0_4px_14px_-8px_rgba(26,115,232,0.45)]"
                      : "border-slate-200 bg-[var(--aa-surface-soft)] text-slate-700 hover:border-[var(--aa-primary)]/35",
                  ].join(" ")}
                >
                  <input
                    type="radio"
                    name="role"
                    value={roleTitle}
                    required={index === 0}
                    checked={selectedRole === roleTitle}
                    onChange={() => {
                      setSelectedRole(roleTitle);
                      onRoleChange?.(roleTitle);
                    }}
                    className="mt-0.5 text-[var(--aa-primary)]"
                  />
                  <span>{roleTitle}</span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
      </section>

      <section id={S.documents} className="scroll-mt-28" aria-labelledby={`${S.documents}-heading`}>
        <h3
          id={`${S.documents}-heading`}
          className="font-[family-name:var(--font-heading)] text-xl font-bold text-slate-900"
        >
          Resume & portfolio
        </h3>
        <p className="mt-1 text-sm text-[var(--aa-text-muted)]">
          Share a viewable link to your resume (e.g. Google Drive with “Anyone with the link”), plus your profile and work samples.
        </p>
        <div className="mt-6 grid gap-5">
        <label className="block text-sm font-medium text-slate-700">
          Resume link <span className="text-red-600">*</span>
          <input
            name="resumeLink"
            type="url"
            required
            placeholder="https://drive.google.com/..."
            autoComplete="url"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-[var(--aa-primary)] focus:ring-2 focus:ring-[var(--aa-primary)]/25"
          />
          <span className="mt-1.5 block text-xs text-[var(--aa-text-muted)]">
            Paste a Google Drive, Dropbox, or other cloud link — ensure the file is accessible to anyone with the link.
          </span>
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Write in detail about your profile <span className="text-red-600">*</span>
          <textarea
            name="profileDetail"
            required
            rows={5}
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-[var(--aa-primary)] focus:ring-2 focus:ring-[var(--aa-primary)]/25"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Some work samples link <span className="text-red-600">*</span>
          <input
            name="workSamples"
            type="url"
            required
            placeholder="https://"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-[var(--aa-primary)] focus:ring-2 focus:ring-[var(--aa-primary)]/25"
          />
        </label>
        </div>
      </section>

      {showDataAnalyticsBlock && (
        <section id={S.dataAnalytics} className="scroll-mt-28" aria-labelledby={`${S.dataAnalytics}-heading`}>
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-5 sm:p-6">
            <h3
              id={`${S.dataAnalytics}-heading`}
              className="font-[family-name:var(--font-heading)] text-lg font-bold text-slate-900"
            >
              Only Data analytics professionals fill the below area
            </h3>

            <h4 className="mt-6 text-sm font-semibold text-slate-900">
              Models Based Evaluation: Specify the number of Projects
            </h4>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-slate-700">
                Time Series Modeling (ex: 2)
                <input
                  name="projTimeSeries"
                  type="number"
                  min={0}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900"
                />
              </label>
              <label className="text-sm text-slate-700">
                Classification Modeling
                <input
                  name="projClassification"
                  type="number"
                  min={0}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900"
                />
              </label>
              <label className="text-sm text-slate-700">
                Gen AI / LLM
                <input
                  name="projGenAi"
                  type="number"
                  min={0}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900"
                />
              </label>
              <label className="text-sm text-slate-700">
                Open CV
                <input
                  name="projOpenCv"
                  type="number"
                  min={0}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900"
                />
              </label>
            </div>

            <h4 className="mt-8 text-sm font-semibold text-slate-900">
              Sectors Based Experience: Mark the number of projects worked
            </h4>
            <ol className="mt-3 grid gap-4 sm:grid-cols-2">
              {[
                "Automobile",
                "Logistics",
                "Healthcare",
                "Finance",
                "Supply chain",
              ].map((label, i) => (
                <li key={label}>
                  <label className="text-sm text-slate-700">
                    {i + 1}. {label}
                    <input
                      name={`sector_${label.replace(/\s+/g, "_").toLowerCase()}`}
                      type="number"
                      min={0}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900"
                    />
                  </label>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <div id={S.submit} className="scroll-mt-28 flex justify-center sm:justify-start">
        <div>
          {submitError && (
            <p className="mb-3 text-sm text-rose-600" role="alert">
              {submitError}
            </p>
          )}
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="min-h-[3rem] px-8 text-base"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </div>
      </div>
    </form>
  );
}

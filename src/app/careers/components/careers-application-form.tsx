"use client";

import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";
import { submitToGoogleAppsScript } from "@/lib/google-script";
import {
  readFileAsBase64,
  resumeMimeFromFile,
  validateResumeFile,
} from "@/lib/resume-file";
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
 * Submits JSON (including Base64 resume) to Google Apps Script Web App (`JOB_APPLICATIONS` sheet).
 */
export default function CareersApplicationForm({ onSubmitted, onRoleChange }: CareersApplicationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
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
        const resumeErr = resumeFile ? validateResumeFile(resumeFile) : "Please upload resume";
        if (resumeErr) {
          setSubmitError(resumeErr);
          toast.error(resumeErr);
          return;
        }
        const file = resumeFile as File;
        const base64File = await readFileAsBase64(file);
        const fileType = resumeMimeFromFile(file);

        const emptyIfNotData = (field: string) =>
          isDataRole ? String(data.get(field) ?? "").trim() : "";

        await submitToGoogleAppsScript({
          formType: "job_application",
          email: String(data.get("email") ?? "").trim(),
          name: String(data.get("name") ?? "").trim(),
          phone: String(data.get("phone") ?? "").trim(),
          location: String(data.get("location") ?? "").trim(),
          qualification: String(data.get("qualification") ?? "").trim(),
          applicationStatus: String(data.get("applicationStatus") ?? "").trim(),
          experience: String(data.get("experience") ?? "").trim(),
          currentCTC: String(data.get("currentCtc") ?? "").trim(),
          takeHomeSalary: String(data.get("takeHome") ?? "").trim(),
          immediateJoiner: String(data.get("immediateJoiner") ?? "").trim(),
          noticePeriod: String(data.get("noticePeriod") ?? "").trim(),
          appliedRole: role,
          profileDescription: String(data.get("profileDetail") ?? "").trim(),
          portfolioLink: String(data.get("workSamples") ?? "").trim(),
          timeSeriesProjects: emptyIfNotData("projTimeSeries"),
          classificationProjects: emptyIfNotData("projClassification"),
          genAIProjects: emptyIfNotData("projGenAi"),
          openCVProjects: emptyIfNotData("projOpenCv"),
          automobileProjects: emptyIfNotData("sector_automobile"),
          logisticsProjects: emptyIfNotData("sector_logistics"),
          healthcareProjects: emptyIfNotData("sector_healthcare"),
          financeProjects: emptyIfNotData("sector_finance"),
          supplyChainProjects: emptyIfNotData("sector_supply_chain"),
          resumeBase64: base64File,
          resumeFileName: file.name,
          resumeMimeType: fileType,
        });

        toast.success("Application submitted successfully");
        setSubmitted(true);
        onSubmitted?.();
        setResumeFileName(null);
        setResumeFile(null);
        setSelectedRole("");
        onRoleChange?.("");
        form.reset();
      } catch (err) {
        const msg =
          err instanceof Error && err.message ? err.message : "Submission failed. Please try again.";
        setSubmitError(msg);
        toast.error(msg);
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, onRoleChange, onSubmitted, resumeFile],
  );

  if (submitted) {
    return (
      <div
        className="aa-card rounded-[var(--aa-radius-2xl)] border border-[var(--aa-border)] bg-[var(--aa-surface-soft)] p-8 text-center shadow-[var(--aa-shadow-md)]"
        role="status"
      >
        <p className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--aa-text-strong)]">
          Thank you for submitting your application.
        </p>
        <p className="mt-3 text-base font-medium leading-relaxed text-[var(--aa-text-muted)]">
          Our HR team will contact you shortly. For further assistance, feel free to connect with us on
          WhatsApp.
        </p>
        <div className="mt-6 flex justify-center">
          <a
            href="https://wa.me/917550279838"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp: 75502 79838"
            className="bg-[#25D366] text-white rounded-xl inline-flex min-h-[3rem] items-center justify-center gap-2.5 px-8 text-base font-semibold transition hover:opacity-95"
          >
            <SiWhatsapp className="size-6 shrink-0" aria-hidden />
            WhatsApp
          </a>
        </div>
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
          Upload your resume as a file, describe your profile in detail, and add a link to work samples.
        </p>
        <div className="mt-6 grid gap-5">
        <div className="block text-sm font-medium text-slate-700">
          <span>
            Resume file <span className="text-red-600">*</span>
          </span>
          <input
            type="file"
            required
            accept=".pdf,.doc,.docx"
            onChange={(ev) => {
              const f = ev.target.files?.[0] ?? null;
              setResumeFile(f);
              setResumeFileName(f?.name ?? null);
            }}
            className="mt-1.5 block w-full max-w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-[var(--aa-primary)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white outline-none focus-within:border-[var(--aa-primary)] focus-within:ring-2 focus-within:ring-[var(--aa-primary)]/25"
          />
          <span className="mt-1.5 block text-xs text-[var(--aa-text-muted)]">
            PDF or Word (.pdf, .doc, .docx), up to 5 MB.
          </span>
          {resumeFileName && (
            <span className="mt-1.5 block text-xs font-medium text-slate-600" aria-live="polite">
              Selected: {resumeFileName}
            </span>
          )}
        </div>
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
          Some work samples link
          <input
            name="workSamples"
            type="url"
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

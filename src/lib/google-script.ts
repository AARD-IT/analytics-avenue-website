/**
 * Client-side Google Apps Script Web App integration.
 * POST with `Content-Type: text/plain` and a JSON body avoids common CORS issues with `application/json`.
 */

export type CtaFormPayload = {
  formType: "cta";
  email: string;
};

export type ContactFormPayload = {
  formType: "contact";
  name: string;
  email: string;
  phone: string;
  organization: string;
  designation: string;
  message: string;
};

export type JobApplicationFormPayload = {
  formType: "job_application";
  email: string;
  name: string;
  phone: string;
  location: string;
  qualification: string;
  applicationStatus: string;
  experience: string;
  currentCTC: string;
  takeHomeSalary: string;
  immediateJoiner: string;
  noticePeriod: string;
  appliedRole: string;
  profileDescription: string;
  portfolioLink: string;
  timeSeriesProjects: string;
  classificationProjects: string;
  genAIProjects: string;
  openCVProjects: string;
  automobileProjects: string;
  logisticsProjects: string;
  healthcareProjects: string;
  financeProjects: string;
  supplyChainProjects: string;
  resumeBase64: string;
  resumeFileName: string;
  resumeMimeType: string;
};

export type AnalyticsAvenueFormPayload = {
  formType: 'pre-onboarding' | 'feedback' | 'placement' | 'monthly-review';
  data: Record<string, unknown>;
};

export type GoogleAppsScriptFormPayload =
  | CtaFormPayload
  | ContactFormPayload
  | JobApplicationFormPayload
  | AnalyticsAvenueFormPayload;

export type GoogleAppsScriptResult = {
  success?: boolean;
  message?: string;
};

function getGoogleScriptUrl(): string {
  const url = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
  if (!url || !String(url).trim()) {
    throw new Error("NEXT_PUBLIC_GOOGLE_SCRIPT_URL is not configured.");
  }
  return String(url).trim();
}

function getAnalyticsAvenueScriptUrl(): string {
  const publicUrl = process.env.NEXT_PUBLIC_ANALYTICS_AVENUE_SCRIPT_URL;
  const viteUrl = process.env.VITE_ANALYTICS_AVENUE_SCRIPT_URL;
  const url = publicUrl && String(publicUrl).trim() ? publicUrl : viteUrl && String(viteUrl).trim() ? viteUrl : undefined;

  if (!url || !String(url).trim()) {
    throw new Error("NEXT_PUBLIC_ANALYTICS_AVENUE_SCRIPT_URL or VITE_ANALYTICS_AVENUE_SCRIPT_URL is not configured.");
  }

  return String(url).trim();
}

async function parseJsonObject(text: string): Promise<Record<string, unknown>> {
  try {
    const parsed: unknown = JSON.parse(text);
    return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : {};
  } catch {
    throw new Error("Invalid response from server.");
  }
}

function messageFromBody(body: Record<string, unknown>, fallback: string): string {
  const m = body.message;
  return typeof m === "string" && m.trim() ? m : fallback;
}

/**
 * POST JSON to the Apps Script Web App (`doPost` reads `e.postData.contents`).
 * @throws Error on network failure, non-OK HTTP status, or `{ success: false }` in the JSON body.
 */
export async function submitToGoogleAppsScript(
  payload: GoogleAppsScriptFormPayload,
): Promise<GoogleAppsScriptResult> {
  const response = await fetch(getGoogleScriptUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const text = await response.text();
  const body = text.trim() ? await parseJsonObject(text) : {};

  if (!response.ok) {
    throw new Error(messageFromBody(body, `Request failed (${response.status}).`));
  }

  if (body.success === false) {
    throw new Error(messageFromBody(body, "Submission failed."));
  }

  return {
    success: body.success !== false,
    message: typeof body.message === "string" ? body.message : undefined,
  };
}

export async function submitToAnalyticsAvenueAppsScript(
  payload: AnalyticsAvenueFormPayload,
): Promise<GoogleAppsScriptResult> {
  const response = await fetch(getAnalyticsAvenueScriptUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const text = await response.text();
  const body = text.trim() ? await parseJsonObject(text) : {};

  if (!response.ok) {
    throw new Error(messageFromBody(body, `Request failed (${response.status}).`));
  }

  if (body.success === false) {
    throw new Error(messageFromBody(body, "Submission failed."));
  }

  return {
    success: body.success !== false,
    message: typeof body.message === "string" ? body.message : undefined,
  };
}

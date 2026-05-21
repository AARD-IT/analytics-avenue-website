export const GOOGLE_APPS_SCRIPT_ENDPOINT =
  "https://script.google.com/macros/s/YOUR_WEB_APP_URL/exec";

export type SheetPayload = Record<string, unknown>;

export async function submitToGoogleSheet(data: SheetPayload) {
  const response = await fetch(GOOGLE_APPS_SCRIPT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Submission failed");
  }

  return response.json();
}

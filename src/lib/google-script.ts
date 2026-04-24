type GoogleScriptPayload = Record<string, unknown>;

export async function postToGoogleScript(payload: GoogleScriptPayload): Promise<void> {
  const response = await fetch("/api/forms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Google Script request failed with status ${response.status}.`);
  }
}

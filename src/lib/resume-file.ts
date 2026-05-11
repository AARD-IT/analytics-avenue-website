/** Max resume upload size (bytes). */
export const RESUME_MAX_BYTES = 5 * 1024 * 1024;

const ALLOWED_EXT = [".pdf", ".doc", ".docx"] as const;

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

/**
 * @returns `null` if valid, otherwise a short user-facing error message.
 */
export function validateResumeFile(file: File): string | null {
  if (!(file instanceof File) || file.size === 0) {
    return "Please upload resume";
  }
  if (file.size > RESUME_MAX_BYTES) {
    return "File size should be under 5MB";
  }
  const lower = file.name.toLowerCase();
  const extOk = ALLOWED_EXT.some((ext) => lower.endsWith(ext));
  if (!extOk) {
    return "Only PDF/DOC/DOCX allowed";
  }
  const allowedMime = ALLOWED_MIME_TYPES as readonly string[];
  if (file.type && !allowedMime.includes(file.type)) {
    return "Only PDF/DOC/DOCX allowed";
  }
  return null;
}

/** MIME when `file.type` is missing (common for .doc on some browsers). */
export function resumeMimeFromFile(file: File): string {
  if (file.type) return file.type;
  const n = file.name.toLowerCase();
  if (n.endsWith(".pdf")) return "application/pdf";
  if (n.endsWith(".docx")) {
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }
  if (n.endsWith(".doc")) return "application/msword";
  return "application/octet-stream";
}

/** Raw base64 (no `data:...;base64,` prefix) for JSON payloads. */
export function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Failed to read file"));
        return;
      }
      const comma = result.indexOf(",");
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.onerror = () => reject(reader.error ?? new Error("Read failed"));
    reader.readAsDataURL(file);
  });
}

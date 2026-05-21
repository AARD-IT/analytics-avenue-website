import { submitToAnalyticsAvenueAppsScript } from './google-script';

export type AnalyticsAvenueFormType =
  | 'pre-onboarding'
  | 'feedback'
  | 'placement'
  | 'monthly-review';

export type Base64FormFile = {
  base64: string;
  mimeType: string;
  fileName: string;
};

export type AnalyticsAvenueFormPayload = {
  formType: AnalyticsAvenueFormType;
  data: Record<string, unknown>;
};

const PLACEMENT_PASSPORT_TYPES = ['image/png', 'image/jpeg'];
const PLACEMENT_PAYMENT_TYPES = ['application/pdf'];
const MAX_PASSPORT_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_PAYMENT_SIZE = 1024 * 1024 * 1024; // 1 GB

export function validatePlacementFile(
  file: File,
  allowedTypes: string[],
  maxSize: number,
): string | null {
  if (!allowedTypes.includes(file.type)) {
    return `Unsupported file type. Allowed types: ${allowedTypes.join(', ')}`;
  }

  if (file.size > maxSize) {
    return `File exceeds the maximum size of ${Math.round(maxSize / 1024 / 1024)} MB.`;
  }

  return null;
}

export function validatePlacementPassportFile(file: File): string | null {
  return validatePlacementFile(file, PLACEMENT_PASSPORT_TYPES, MAX_PASSPORT_SIZE);
}

export function validatePlacementPaymentFile(file: File): string | null {
  return validatePlacementFile(file, PLACEMENT_PAYMENT_TYPES, MAX_PAYMENT_SIZE);
}

export function convertFileToBase64(file: File): Promise<Base64FormFile> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== 'string') {
        reject(new Error('Unable to read file.'));
        return;
      }

      const [, base64] = result.split(',');
      if (!base64) {
        reject(new Error('Unable to read file.'));
        return;
      }

      resolve({
        base64,
        mimeType: file.type,
        fileName: file.name,
      });
    };

    reader.onerror = () => reject(new Error('Unable to read file.'));
    reader.readAsDataURL(file);
  });
}

export async function submitAnalyticsAvenueForm(
  formType: AnalyticsAvenueFormType,
  data: Record<string, unknown>,
) {
  const payload: AnalyticsAvenueFormPayload = {
    formType,
    data,
  };
  return submitToAnalyticsAvenueAppsScript(payload);
}

export function formatAnalyticsAvenueApiResponse(result: unknown) {
  if (typeof result !== 'object' || result === null) {
    return { success: false, message: 'Unexpected response from server.' };
  }

  const body = result as Record<string, unknown>;
  return {
    success: body.success !== false,
    message: typeof body.message === 'string' ? body.message : 'Form submitted successfully.',
  };
}

import "server-only";
import type { ContactValues } from "@/lib/validation";

/**
 * -----------------------------------------------------------------------------
 * ENQUIRY DELIVERY — Web3Forms
 *
 * Contact form submissions are forwarded to Web3Forms, which emails them on to
 * the inbox the access key is registered to (webzivodesignz@gmail.com).
 *
 * IMPORTANT: Web3Forms decides the destination from the access key itself —
 * there is no "send to" field in the API. To change where enquiries land, make
 * a new key at https://web3forms.com with that address and set
 * WEB3FORMS_ACCESS_KEY.
 *
 * The request is made from the server rather than the browser. Web3Forms keys
 * are designed to be public, but posting server-side means the submission
 * still passes through this app's validation, sanitisation, honeypot and rate
 * limiting first, instead of being postable straight from a console.
 * -----------------------------------------------------------------------------
 */

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/** Registered to webzivodesignz@gmail.com. Override per deployment if needed. */
const DEFAULT_ACCESS_KEY = "e6f145bb-075e-4944-83ff-e29eb218f09c";

const ACCESS_KEY =
  process.env.WEB3FORMS_ACCESS_KEY?.trim() || DEFAULT_ACCESS_KEY;

/** False only if the key has been deliberately cleared. */
export function isEmailDeliveryConfigured(): boolean {
  return Boolean(ACCESS_KEY);
}

/**
 * Builds the payload. Keys become the field labels in the email Web3Forms
 * sends, so they are written the way they should read in the inbox.
 */
function buildPayload(values: ContactValues) {
  return {
    access_key: ACCESS_KEY,
    subject: `New website request from ${values.fullName}`,
    from_name: "Webzivo Website",
    // Lets you hit reply in the inbox and reach the enquirer directly.
    replyto: values.email,
    "Full Name": values.fullName,
    "Business Name": values.businessName || "—",
    "Business Type": values.businessType || "—",
    Email: values.email,
    "Phone / WhatsApp": values.phone || "—",
    "Website Type": values.websiteType,
    "Project Details": values.message,
  };
}

export async function sendEnquiryEmail(
  values: ContactValues,
): Promise<{ ok: boolean }> {
  if (!isEmailDeliveryConfigured()) {
    console.error("[contact] WEB3FORMS_ACCESS_KEY is empty — cannot deliver.");
    return { ok: false };
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(buildPayload(values)),
      // Don't let a slow upstream hold the submission open indefinitely.
      signal: AbortSignal.timeout(15_000),
    });

    // Web3Forms returns 200 with { success: false } for rejected submissions,
    // so the status code alone is not enough to call it delivered.
    const result = (await response
      .json()
      .catch(() => null)) as { success?: boolean; message?: string } | null;

    if (!response.ok || !result?.success) {
      console.error(
        `[contact] Web3Forms rejected the submission (${response.status}):`,
        result?.message ?? "no message",
      );
      return { ok: false };
    }

    return { ok: true };
  } catch (error) {
    // Logged server-side only — the visitor gets a generic message so provider
    // details are never exposed in the browser.
    console.error("[contact] Failed to deliver enquiry:", error);
    return { ok: false };
  }
}

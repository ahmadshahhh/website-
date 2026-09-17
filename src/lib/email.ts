import "server-only";
import type { ContactValues } from "@/lib/validation";

/**
 * -----------------------------------------------------------------------------
 * EMAIL DELIVERY
 *
 * TODO - CONNECT AN EMAIL PROVIDER TO RECEIVE ENQUIRIES
 *
 * Until the variables below are set, the contact form validates the enquiry
 * but does NOT send an email, and the UI tells the visitor to use WhatsApp or
 * email instead. Nothing is silently discarded and nothing pretends to send.
 *
 * To turn delivery on (default provider: Resend - https://resend.com):
 *   1. Create an account and verify the domain you will send from.
 *   2. Create an API key.
 *   3. In .env.local set:
 *        RESEND_API_KEY=re_xxxxxxxxxxxx
 *        CONTACT_FROM_EMAIL=website@yourdomain.com   (must be verified)
 *        CONTACT_TO_EMAIL=you@yourdomain.com         (where enquiries land)
 *   4. Restart the dev server / redeploy.
 *
 * USING A DIFFERENT PROVIDER (SendGrid, Postmark, Mailgun, SMTP...):
 *   Replace the fetch call in `deliver()` below with that provider's API call.
 *   Everything else - validation, rate limiting, the UI states - stays as is.
 *
 * SECURITY: these variables have no NEXT_PUBLIC_ prefix, so the API key is
 * only ever read on the server and never reaches the browser bundle.
 * -----------------------------------------------------------------------------
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim() ?? "";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL?.trim() ?? "";
const TO_EMAIL =
  process.env.CONTACT_TO_EMAIL?.trim() ||
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
  "";

/** True only when every value needed to actually deliver mail is present. */
export function isEmailDeliveryConfigured(): boolean {
  return Boolean(RESEND_API_KEY && FROM_EMAIL && TO_EMAIL);
}

/** Escapes untrusted text before it is placed into the HTML email body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmail(values: ContactValues) {
  const rows: [string, string][] = [
    ["Name", values.fullName],
    ["Business", values.businessName || "-"],
    ["Business type", values.businessType || "-"],
    ["Email", values.email],
    ["Phone / WhatsApp", values.phone || "-"],
    ["Website type", values.websiteType],
  ];

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:640px">
      <h2 style="margin:0 0 16px;font-size:18px">New website enquiry</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr>
                 <td style="padding:8px 12px;border:1px solid #e6e6e9;background:#f7f7f8;font-weight:600;width:170px">${escapeHtml(label)}</td>
                 <td style="padding:8px 12px;border:1px solid #e6e6e9">${escapeHtml(value)}</td>
               </tr>`,
          )
          .join("")}
      </table>
      <h3 style="margin:24px 0 8px;font-size:15px">Project details</h3>
      <p style="white-space:pre-wrap;font-size:14px;line-height:1.6;margin:0">${escapeHtml(
        values.message,
      )}</p>
    </div>
  `;

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Project details:",
    values.message,
  ].join("\n");

  return { html, text };
}

async function deliver(values: ContactValues): Promise<void> {
  const { html, text } = buildEmail(values);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Webzivo Website <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      // reply_to lets you answer the enquiry straight from your inbox.
      reply_to: values.email,
      subject: `New enquiry - ${values.websiteType}${
        values.businessName ? ` - ${values.businessName}` : ""
      }`,
      html,
      text,
    }),
    // Do not let a slow provider hold the request open indefinitely.
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Email provider responded ${response.status}: ${detail.slice(0, 300)}`,
    );
  }
}

export async function sendEnquiryEmail(
  values: ContactValues,
): Promise<{ ok: boolean }> {
  if (!isEmailDeliveryConfigured()) return { ok: false };

  try {
    await deliver(values);
    return { ok: true };
  } catch (error) {
    // Logged server-side only - the visitor gets a generic message so provider
    // details are never exposed in the browser.
    console.error("[contact] Failed to send enquiry email:", error);
    return { ok: false };
  }
}

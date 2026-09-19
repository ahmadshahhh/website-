"use server";

import { headers } from "next/headers";
import type { ContactState } from "@/lib/contact-state";
import { sendEnquiryEmail } from "@/lib/email";
import { readContactForm, validateContact } from "@/lib/validation";

/**
 * Very small in-memory rate limiter.
 *
 * NOTE: this lives in the server process, so it resets on redeploy and is not
 * shared between serverless instances. It stops casual abuse, not a determined
 * attacker. For stronger protection put a shared store (Upstash Redis, Vercel
 * KV) or a WAF rule in front of this.
 */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const submissions = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (submissions.get(key) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  // Opportunistically drop stale entries so the map cannot grow unbounded.
  if (submissions.size > 5_000) submissions.clear();

  if (recent.length >= RATE_LIMIT_MAX) {
    submissions.set(key, recent);
    return true;
  }

  recent.push(now);
  submissions.set(key, recent);
  return false;
}

async function getClientKey(): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * Handles a contact form submission.
 *
 * Order matters: bot check, then rate limit, then validation, then delivery.
 * If delivery fails the UI offers WhatsApp and email instead, so a visitor is
 * never left with nowhere to go.
 */
export async function submitEnquiry(
  _previousState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const token = Date.now();

  // Honeypot: a hidden field real people never see, and therefore never fill.
  // Bots that fill it get a normal-looking response and nothing is sent.
  if (typeof formData.get("hp_url") === "string" && formData.get("hp_url")) {
    return {
      status: "success",
      message: "Thanks - your request has been received.",
      errors: {},
      values: null,
      token,
    };
  }

  const values = readContactForm(formData);

  if (isRateLimited(await getClientKey())) {
    return {
      status: "error",
      message:
        "Too many requests from this connection. Please wait a minute and try again, or contact us on WhatsApp.",
      errors: {},
      values,
      token,
    };
  }

  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) {
    return {
      status: "invalid",
      message: "Please check the highlighted fields and try again.",
      errors,
      values,
      token,
    };
  }

  const { ok } = await sendEnquiryEmail(values);

  if (!ok) {
    return {
      status: "error",
      message:
        "Something went wrong sending your request. Please try again, or reach us on WhatsApp.",
      errors: {},
      values,
      token,
    };
  }

  return {
    status: "success",
    message:
      "Thanks for getting in touch. We have received your request and will reply to the email address you provided.",
    errors: {},
    values: null,
    token,
  };
}

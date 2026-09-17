import { websiteTypeOptions } from "@/config/services";

/**
 * -----------------------------------------------------------------------------
 * CONTACT FORM VALIDATION
 *
 * Everything here runs on the server. The browser gets HTML5 validation for
 * fast feedback, but nothing is trusted until it passes through this module.
 * -----------------------------------------------------------------------------
 */

export const CONTACT_FIELDS = [
  "fullName",
  "businessName",
  "businessType",
  "email",
  "phone",
  "websiteType",
  "message",
] as const;

export type ContactField = (typeof CONTACT_FIELDS)[number];

export type ContactValues = Record<ContactField, string>;
export type FieldErrors = Partial<Record<ContactField, string>>;

/** Upper bounds, so a single request cannot be used to push a huge payload. */
const MAX_LENGTH: Record<ContactField, number> = {
  fullName: 100,
  businessName: 120,
  businessType: 120,
  email: 254,
  phone: 40,
  websiteType: 60,
  message: 4000,
};

// Control characters, including the CR/LF pairs used for email header
// injection. Newlines are preserved only in the free-text message field.
const CONTROL_CHARS_KEEP_NEWLINES =
  /[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g;
const CONTROL_CHARS_ALL = /[\x00-\x1F\x7F-\x9F]/g;

// Zero-width and bidirectional-override characters used to spoof text.
const INVISIBLE_CHARS =
  /[​-‏‪-‮⁠-⁤﻿]/g;

/**
 * Strips control characters, normalises whitespace and enforces a maximum
 * length for the given field.
 */
export function sanitize(
  raw: FormDataEntryValue | null,
  field: ContactField,
): string {
  if (typeof raw !== "string") return "";

  const allowNewlines = field === "message";

  let value = raw
    .replace(
      allowNewlines ? CONTROL_CHARS_KEEP_NEWLINES : CONTROL_CHARS_ALL,
      " ",
    )
    .replace(INVISIBLE_CHARS, "");

  value = allowNewlines
    ? value.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n")
    : value.replace(/\s+/g, " ");

  return value.trim().slice(0, MAX_LENGTH[field]);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
/** Accepts +, spaces, dashes, parens and dots around the digits. */
const PHONE_PATTERN = /^\+?[\d\s().-]{6,25}$/;

export function validateContact(values: ContactValues): FieldErrors {
  const errors: FieldErrors = {};

  if (values.fullName.length < 2) {
    errors.fullName = "Please enter your name.";
  }

  if (!values.email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  // Phone is optional, but must look like a phone number when provided.
  if (values.phone) {
    const digitCount = values.phone.replace(/\D/g, "").length;
    if (!PHONE_PATTERN.test(values.phone) || digitCount < 6) {
      errors.phone = "Please enter a valid phone or WhatsApp number.";
    }
  }

  // Only values the form actually offers are accepted.
  if (!values.websiteType) {
    errors.websiteType = "Please choose the type of website you need.";
  } else if (
    !(websiteTypeOptions as readonly string[]).includes(values.websiteType)
  ) {
    errors.websiteType = "Please choose one of the listed website types.";
  }

  if (values.message.length < 10) {
    errors.message =
      "Please tell us a little more about your project (at least 10 characters).";
  }

  return errors;
}

export function readContactForm(formData: FormData): ContactValues {
  return Object.fromEntries(
    CONTACT_FIELDS.map((field) => [field, sanitize(formData.get(field), field)]),
  ) as ContactValues;
}

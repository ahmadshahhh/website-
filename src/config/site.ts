/**
 * ─────────────────────────────────────────────────────────────────────────────
 * WEBZIVO — CENTRAL SITE CONFIGURATION
 *
 * This is the single source of truth for business information. Editing a value
 * here updates it everywhere on the site (nav, footer, contact, SEO, schema).
 *
 * Anything a visitor could act on — phone number, email, address, map link —
 * is read from environment variables so it can be changed without touching
 * code, and so the site never displays a placeholder as if it were real.
 * See .env.example for the full list.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Trim and discard empty / unreplaced placeholder env values. */
function env(value: string | undefined): string {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return "";
  // Guards against a .env file that was copied but never filled in.
  if (/^(your_|yourvalue|changeme|xxx+$|g-xxx)/i.test(trimmed)) return "";
  return trimmed;
}

/**
 * Production URL. Used for canonical links, sitemap.xml, robots.txt and
 * Open Graph tags. Falls back to localhost so local development still works —
 * set NEXT_PUBLIC_SITE_URL before deploying or share links will be wrong.
 */
export const SITE_URL =
  env(process.env.NEXT_PUBLIC_SITE_URL).replace(/\/$/, "") ||
  "http://localhost:3000";

/** WhatsApp number, digits only (e.g. 96512345678). Empty until configured. */
const WHATSAPP_NUMBER = env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER).replace(
  /[^\d]/g,
  "",
);

/** A usable WhatsApp number is 8–15 digits (ITU E.164 allows up to 15). */
export const isWhatsAppConfigured =
  WHATSAPP_NUMBER.length >= 8 && WHATSAPP_NUMBER.length <= 15;

export const CONTACT_EMAIL = env(process.env.NEXT_PUBLIC_CONTACT_EMAIL);
export const isEmailConfigured = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(CONTACT_EMAIL);

const MAPS_URL = env(process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL);
/** Only trust genuine Google Maps links for the directions button. */
export const isMapsConfigured = /^https:\/\/([\w-]+\.)*(google\.[\w.]+|goo\.gl|maps\.app\.goo\.gl)\//.test(
  MAPS_URL,
);

/** Optional street address. When blank the site shows only "Kuwait". */
export const BUSINESS_ADDRESS = env(process.env.NEXT_PUBLIC_BUSINESS_ADDRESS);

/** Pre-filled message used by every WhatsApp link on the site. */
export const WHATSAPP_MESSAGE =
  "Hello Webzivo, I am interested in building a website for my business.";

/**
 * Builds a wa.me deep link. When no number is configured yet, callers fall
 * back to the on-page contact form instead of producing a dead link.
 */
export function whatsAppLink(message: string = WHATSAPP_MESSAGE): string {
  if (!isWhatsAppConfigured) return "/#contact";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const siteConfig = {
  name: "Webzivo",
  legalName: "Webzivo",
  tagline: "Professional Website Design & Development",
  /** Used as the SEO meta description and the Open Graph description. */
  description:
    "Webzivo builds modern, mobile-friendly websites for restaurants, gyms, service businesses and local businesses in Kuwait.",
  title: "Webzivo | Website Design & Development in Kuwait",
  url: SITE_URL,
  locale: "en",
  country: "Kuwait",
  countryCode: "KW",
  /** Shown in the hero as a small trust / location line. */
  heroEyebrow: "Website Design & Development • Kuwait",
  email: CONTACT_EMAIL,
  isEmailConfigured,
  whatsAppNumber: WHATSAPP_NUMBER,
  isWhatsAppConfigured,
  mapsUrl: MAPS_URL,
  isMapsConfigured,
  address: BUSINESS_ADDRESS,
  /**
   * No social accounts are listed until real ones exist. Add entries here and
   * they will render automatically in the footer.
   * Example: { label: "Instagram", href: "https://instagram.com/webzivo" }
   */
  socials: [] as { label: string; href: string }[],
} as const;

/** Analytics — each script is injected only when its ID is present. */
export const analytics = {
  gaMeasurementId: env(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
  metaPixelId: env(process.env.NEXT_PUBLIC_META_PIXEL_ID),
  googleSiteVerification: env(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION),
} as const;

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * WEBZIVO — CENTRAL SITE CONFIGURATION
 *
 * This is the single source of truth for business information. Editing a value
 * here updates it everywhere on the site (nav, footer, contact, SEO, schema).
 *
 * Anything a visitor could act on — phone number, email, address, map link —
 * can be overridden by an environment variable, so it can be changed per
 * deployment without touching code. The WhatsApp number and contact email
 * carry committed defaults so they work everywhere with no setup; the rest
 * stay empty, and anything still empty is hidden rather than shown to
 * visitors as a placeholder. See .env.example for the full list.
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
 * Open Graph tags. Defaults to the live Vercel domain; override with
 * NEXT_PUBLIC_SITE_URL once a custom domain replaces it.
 */
export const SITE_URL =
  env(process.env.NEXT_PUBLIC_SITE_URL).replace(/\/$/, "") ||
  "https://webzivo-kw.vercel.app";

/**
 * WhatsApp number in E.164 form: country code + national number, digits only,
 * and NO leading zero on the national part.
 *
 * Kuwait's country code is 965, so the local number 9498 6039 becomes
 * 96594986039. Committed here so the button works everywhere without setup;
 * set NEXT_PUBLIC_WHATSAPP_NUMBER to override it for a specific deployment.
 */
const DEFAULT_WHATSAPP_NUMBER = "96594986039";

const WHATSAPP_NUMBER =
  env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER).replace(/[^\d]/g, "") ||
  DEFAULT_WHATSAPP_NUMBER;

/** A usable WhatsApp number is 8–15 digits (ITU E.164 allows up to 15). */
export const isWhatsAppConfigured =
  WHATSAPP_NUMBER.length >= 8 && WHATSAPP_NUMBER.length <= 15;

/**
 * Human-readable version of the number, e.g. +965 9498 6039. Used only as a
 * visible label — every link is built from the raw digits above.
 */
function formatPhone(digits: string): string {
  if (!digits) return "";

  // Country codes are 1–3 digits; longest match wins so 965 beats 92.
  const countryCode =
    ["965", "966", "968", "971", "973", "974", "92", "91", "44", "1"].find(
      (code) => digits.startsWith(code),
    ) ?? digits.slice(0, 2);

  const national = digits.slice(countryCode.length);

  const groups =
    national.length === 8
      ? [national.slice(0, 4), national.slice(4)]
      : national.length === 9 || national.length === 10
        ? [national.slice(0, 3), national.slice(3, 6), national.slice(6)]
        : [national];

  return `+${countryCode} ${groups.filter(Boolean).join(" ")}`.trim();
}

export const WHATSAPP_DISPLAY = formatPhone(WHATSAPP_NUMBER);

/**
 * Public contact address, shown in the contact section and the footer.
 *
 * Committed here so it works in every environment without any setup. Set
 * NEXT_PUBLIC_CONTACT_EMAIL to override it for a specific deployment.
 */
const DEFAULT_CONTACT_EMAIL = "webzivodesignz@gmail.com";

export const CONTACT_EMAIL =
  env(process.env.NEXT_PUBLIC_CONTACT_EMAIL) || DEFAULT_CONTACT_EMAIL;
export const isEmailConfigured = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(CONTACT_EMAIL);

/** The Google Business listing. Opened by every "Mangaf, Kuwait" link. */
const DEFAULT_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Webzivo%20Mangaf&query_place_id=ChIJP5UXC3vw_SURw-8XOF7a4Uo";

const MAPS_URL =
  env(process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL) || DEFAULT_MAPS_URL;

/**
 * Embeddable map for the contact card. Uses the public `output=embed` form,
 * which needs no Maps API key and therefore no billing account.
 */
export const MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=Webzivo%20Mangaf%2C%20Kuwait&t=&z=15&ie=UTF8&iwloc=&output=embed";

/** Only trust genuine Google Maps links for the directions button. */
export const isMapsConfigured = /^https:\/\/([\w-]+\.)*(google\.[\w.]+|goo\.gl|maps\.app\.goo\.gl)\//.test(
  MAPS_URL,
);

/** Optional street address. When blank the site shows only the area below. */
export const BUSINESS_ADDRESS = env(process.env.NEXT_PUBLIC_BUSINESS_ADDRESS);

/** How the location reads everywhere it appears: footer, about, contact. */
export const LOCATION_LABEL = "Mangaf, Kuwait";

/** Domain shown in the demo mockups' browser chrome. */
export const DISPLAY_DOMAIN = SITE_URL.replace(/^https?:\/\//, "");

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
  /** Area + country, linked to the Google Maps listing wherever it appears. */
  locationLabel: LOCATION_LABEL,
  mapsEmbedUrl: MAPS_EMBED_URL,
  displayDomain: DISPLAY_DOMAIN,
  /** Shown in the hero as a small trust / location line. */
  heroEyebrow: "Website Design & Development • Kuwait",
  email: CONTACT_EMAIL,
  isEmailConfigured,
  whatsAppNumber: WHATSAPP_NUMBER,
  whatsAppDisplay: WHATSAPP_DISPLAY,
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

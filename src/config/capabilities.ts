import type { IconName } from "@/components/icons";

/**
 * Who Webzivo is and what every website includes.
 *
 * Shown near the top of the home page so a first-time visitor knows within one
 * screen where we are, who we build for, and what they would actually get.
 */
export const positioning = {
  eyebrow: "Based in Kuwait",
  title: "A Kuwait web design agency, built around local businesses",
  description:
    "Webzivo works from Mangaf, Kuwait, building modern websites for restaurants, cafés, gyms, shops and service businesses — designed around what your customers look for first.",
} as const;

/** Compact capability grid: what a Webzivo website can include. */
export const capabilities: { icon: IconName; label: string }[] = [
  { icon: "smartphone", label: "Responsive design" },
  { icon: "whatsapp", label: "WhatsApp integration" },
  { icon: "mapPin", label: "Google Maps" },
  { icon: "mail", label: "Contact forms" },
  { icon: "globe", label: "Arabic + English option" },
  { icon: "layers", label: "Menus / services / products" },
  { icon: "search", label: "SEO fundamentals" },
  { icon: "brush", label: "Custom design" },
];

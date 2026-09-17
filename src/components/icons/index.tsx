import type { ReactNode, SVGProps } from "react";

/**
 * A small hand-built icon set. Kept in-repo rather than pulling in an icon
 * library: it keeps the bundle small and the stroke weights consistent.
 *
 * All icons share a 24×24 grid and a 1.5 stroke, except brand marks which are
 * filled. Icons are decorative by default (aria-hidden) — when an icon is the
 * only content of a control, give that control an aria-label.
 */
export type IconName =
  | "utensils"
  | "dumbbell"
  | "wrench"
  | "building"
  | "cart"
  | "sparkle"
  | "layout"
  | "smartphone"
  | "target"
  | "sliders"
  | "check"
  | "arrowRight"
  | "arrowUpRight"
  | "menu"
  | "close"
  | "chevronDown"
  | "mail"
  | "mapPin"
  | "phone"
  | "whatsapp"
  | "bolt"
  | "layers"
  | "chat"
  | "brush"
  | "shield"
  | "globe"
  | "search"
  | "pen"
  | "code"
  | "rocket";

const ICONS: Record<IconName, ReactNode> = {
  utensils: (
    <>
      <path d="M6 3v5.5a2.5 2.5 0 0 0 5 0V3" />
      <path d="M8.5 11v10" />
      <path d="M16.5 21V3c2.2 1.6 3.2 4.1 3.2 7 0 1.7-1.1 2.8-3.2 2.8" />
    </>
  ),
  dumbbell: (
    <>
      <path d="M3 9.5v5" />
      <path d="M7 6.5v11" />
      <path d="M17 6.5v11" />
      <path d="M21 9.5v5" />
      <path d="M7 12h10" />
    </>
  ),
  wrench: (
    <path d="M14.6 6.1a1 1 0 0 0 0 1.4l1.9 1.9a1 1 0 0 0 1.4 0l3.1-3.1a6 6 0 0 1-7.9 7.5l-6.3 6.3a2.1 2.1 0 1 1-3-3l6.3-6.3a6 6 0 0 1 7.5-7.9z" />
  ),
  building: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
      <path d="M15 21V10h4a2 2 0 0 1 2 2v9" />
      <path d="M8.5 7.5h3M8.5 11.5h3M8.5 15.5h3" />
    </>
  ),
  cart: (
    <>
      <circle cx="9.5" cy="20" r="1.2" />
      <circle cx="18" cy="20" r="1.2" />
      <path d="M2.5 3.5h2.3l2.5 11.1a1.8 1.8 0 0 0 1.8 1.4h8.1a1.8 1.8 0 0 0 1.8-1.4L21 7.2H6" />
    </>
  ),
  sparkle: (
    <>
      <path d="M11 3.2 12.7 8l4.8 1.8-4.8 1.8L11 16.4 9.3 11.6 4.5 9.8 9.3 8z" />
      <path d="M18 15.2l.8 2.1 2.1.8-2.1.8-.8 2.1-.8-2.1-2.1-.8 2.1-.8z" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="3.5" width="18" height="17" rx="2.5" />
      <path d="M3 9h18" />
      <path d="M9.5 9v11.5" />
    </>
  ),
  smartphone: (
    <>
      <rect x="6.5" y="2" width="11" height="20" rx="2.5" />
      <path d="M10.75 18.2h2.5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.75" />
      <circle cx="12" cy="12" r="4.75" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 7h7M15 7h5" />
      <path d="M4 17h5M13 17h7" />
      <circle cx="13" cy="7" r="2" />
      <circle cx="11" cy="17" r="2" />
    </>
  ),
  check: <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />,
  arrowRight: (
    <>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </>
  ),
  arrowUpRight: (
    <>
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </>
  ),
  menu: <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  chevronDown: <path d="M5.5 9l6.5 6.5L18.5 9" />,
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="M3.5 7.5l7.3 5a2 2 0 0 0 2.4 0l7.3-5" />
    </>
  ),
  mapPin: (
    <>
      <path d="M12 21.5s7-6.3 7-11.2a7 7 0 1 0-14 0C5 15.2 12 21.5 12 21.5z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  phone: (
    <path d="M6.5 3h3l1.5 4-2.2 1.6a12.5 12.5 0 0 0 5.6 5.6L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3z" />
  ),
  whatsapp: (
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.7.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.28-.2-.57-.35M12.05 21.79a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26 9.88 9.88 0 0 1 16.88-6.99 9.83 9.83 0 0 1 2.9 7 9.89 9.89 0 0 1-9.9 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.15 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.42" />
  ),
  bolt: <path d="M13.2 2.5 4.8 13.2h6.1l-.9 8.3 8.4-10.7h-6.1z" />,
  layers: (
    <>
      <path d="M12 2.8 21.2 7.4 12 12 2.8 7.4z" />
      <path d="M2.8 12.6 12 17.2l9.2-4.6" />
      <path d="M2.8 17.2 12 21.8l9.2-4.6" />
    </>
  ),
  chat: (
    <path d="M20.5 12.2c0 4-3.8 7.2-8.5 7.2a9.7 9.7 0 0 1-2.8-.4l-5.2 1.6 1.6-4.3A6.8 6.8 0 0 1 3.5 12.2C3.5 8.2 7.3 5 12 5s8.5 3.2 8.5 7.2z" />
  ),
  brush: (
    <>
      <path d="M11.5 12.5 19 5a2.1 2.1 0 1 1 3 3l-7.5 7.5" />
      <path d="M9.5 14.5c1.4 0 2.5 1.1 2.5 2.5s-1.1 3.5-4 3.5H3c1.5-1 1.8-2.2 2-3.4.25-1.5 1.4-2.6 2.9-2.6z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.8 4.5 5.9v5.5c0 4.3 3.1 8.2 7.5 9.8 4.4-1.6 7.5-5.5 7.5-9.8V5.9z" />
      <path d="M9.2 12.1 11.3 14.2 15 10.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M2.8 12h18.4" />
      <path d="M12 2.8a14 14 0 0 1 0 18.4 14 14 0 0 1 0-18.4z" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7.2" />
      <path d="M16.2 16.2 21 21" />
    </>
  ),
  pen: (
    <>
      <path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L8 18l-4 1 1-4z" />
      <path d="M14.5 5.5l3 3" />
    </>
  ),
  code: (
    <>
      <path d="M8.5 7.5 3.5 12l5 4.5" />
      <path d="M15.5 7.5 20.5 12l-5 4.5" />
      <path d="M13.5 4.5 10.5 19.5" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 2.8c3.4 2.2 5.3 5.6 5.3 9.4l-2.4 3.4H9.1l-2.4-3.4c0-3.8 1.9-7.2 5.3-9.4z" />
      <circle cx="12" cy="10" r="2" />
      <path d="M9.1 15.6c-1.8.9-2.6 2.6-2.4 5.1 2.2-.3 3.6-1.2 4.2-2.7" />
      <path d="M14.9 15.6c1.8.9 2.6 2.6 2.4 5.1-2.2-.3-3.6-1.2-4.2-2.7" />
    </>
  ),
};

/** Brand marks are filled rather than stroked. */
const FILLED_ICONS: ReadonlySet<IconName> = new Set<IconName>([
  "whatsapp",
  "bolt",
]);

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

export function Icon({ name, ...props }: IconProps) {
  const isFilled = FILLED_ICONS.has(name);

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? "none" : "currentColor"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {ICONS[name]}
    </svg>
  );
}

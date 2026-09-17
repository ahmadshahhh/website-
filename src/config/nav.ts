/** Primary navigation. Used by both the header and the footer. */
export type NavItem = {
  label: string;
  href: string;
  /** True when the link targets a section on the home page. */
  isAnchor?: boolean;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services", isAnchor: true },
  { label: "Our Work", href: "/work" },
  { label: "About", href: "/#about", isAnchor: true },
  { label: "FAQ", href: "/#faq", isAnchor: true },
  { label: "Contact", href: "/#contact", isAnchor: true },
];

/** The single primary conversion action, reused across the site. */
export const primaryCta = {
  label: "Get Your Website",
  href: "/#contact",
} as const;

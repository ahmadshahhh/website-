/**
 * Pricing plans.
 *
 * Every price on the site reads from here - the pricing section, and the FAQ
 * answer in src/config/faq.ts must be kept in step with these figures.
 */
export type PricingPlan = {
  name: string;
  /** Qualifier before the figure, e.g. "Starting from". */
  prefix: string;
  /** The figure itself, e.g. "25 KWD". */
  price: string;
  /** Billing period, e.g. "/month". */
  period: string;
  features: string[];
  /** Marks the plan carrying the "Most Popular" badge. */
  highlighted?: boolean;
};

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    prefix: "Starting from",
    price: "25 KWD",
    period: "/month",
    features: [
      "Modern responsive design",
      "Mobile-friendly website",
      "WhatsApp and contact buttons",
      "Google Maps integration",
      "Basic SEO setup",
    ],
  },
  {
    name: "Business",
    prefix: "Starting from",
    price: "30 KWD",
    period: "/month",
    features: [
      "Everything in Starter",
      "Multiple pages",
      "Services / menu / products",
      "Arabic + English option",
      "More advanced sections and features",
      "Custom design",
    ],
    highlighted: true,
  },
];

/** Shown under the cards. */
export const pricingNote =
  "All plans include hosting, security, and updates.";

export const pricingCustomQuote = {
  text: "Need something different? Contact Webzivo for a custom quote.",
  ctaLabel: "Ask on WhatsApp",
} as const;

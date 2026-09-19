/**
 * ─────────────────────────────────────────────────────────────────────────────
 * TESTIMONIALS
 *
 * Empty on purpose. Nothing here is invented: no reviews, ratings, client
 * counts or logos are shown anywhere on the site until a real customer has
 * given one and agreed to it being published.
 *
 * While this array is empty the section renders an honest placeholder card
 * instead. Add an entry and the section switches to testimonial cards
 * automatically - no component changes needed.
 *
 *   { quote: "…", author: "Full Name", business: "Business name" }
 * ─────────────────────────────────────────────────────────────────────────────
 */
export type Testimonial = {
  quote: string;
  /** The person who said it. */
  author: string;
  /** Their business, shown under the name. */
  business: string;
};

export const testimonials: Testimonial[] = [];

/** Shown in place of the cards while `testimonials` is empty. */
export const testimonialsPlaceholder = {
  title: "Our first client stories are coming soon",
  description:
    "Webzivo is a new studio, so there are no customer reviews to show yet. Until there are, every example on this site is clearly labelled as a demo rather than dressed up as client work.",
  ctaLabel: "Talk to us about your project",
} as const;

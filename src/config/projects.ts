import type { PreviewVariant } from "@/components/previews/SitePreview";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PORTFOLIO PROJECTS
 *
 * Every project below is a DEMO — a concept design showing what Webzivo can
 * build. `isDemo: true` makes the site label it as such, everywhere.
 *
 * ── REPLACING A DEMO WITH A REAL CLIENT PROJECT ──
 *   1. Set `isDemo: false`.
 *   2. Add `liveUrl` — the customer's real website address.
 *   3. Add `clientName` and `year`.
 *   4. Optionally add `image: "/work/<file>.jpg"` (put the screenshot in
 *      /public/work/). When `image` is set it replaces the built-in mockup.
 *   5. Only claim a business as a client once they have agreed to it.
 *
 * The card, the detail page at /work/<slug> and the sitemap all update
 * automatically from this file.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export type Project = {
  slug: string;
  title: string;
  /** Business category shown as a small label on the card. */
  category: string;
  /** Concept design vs. real delivered client work. */
  isDemo: boolean;
  /** One-line summary shown on the card. */
  summary: string;
  /** Full description shown on the detail page. */
  description: string;
  /** Which built-in mockup to render as the preview. */
  preview: PreviewVariant;
  /** Real screenshot at /public/work/… — overrides `preview` when set. */
  image?: string;
  /** The live site. Demos have none; the detail page adapts accordingly. */
  liveUrl?: string;
  /** Only set for real, permission-granted client work. */
  clientName?: string;
  year?: string;
  /** Pages the concept covers. */
  pages: string[];
  /** Notable features, shown as a checklist on the detail page. */
  features: string[];
  /** Pre-selects the contact form dropdown from this project's CTA. */
  enquiryType: string;
};

export const projects: Project[] = [
  {
    slug: "restaurant-website-demo",
    title: "Restaurant Website",
    category: "Restaurant",
    isDemo: true,
    summary:
      "Menu categories, location details and contact options in a warm, mobile-first layout.",
    description:
      "A modern restaurant website featuring menu categories, location information, contact options, and a mobile-friendly design. The layout puts the food first, keeps opening hours and directions one tap away, and gives seasonal dishes a place to sit without a redesign.",
    preview: "restaurant",
    pages: ["Home", "Menu", "About", "Gallery", "Reservations", "Contact"],
    features: [
      "Menu organised by category with prices that are easy to update",
      "Opening hours and directions visible from every page",
      "Reservation enquiry form",
      "Gallery optimised so photos stay fast on mobile data",
      "Click-to-call and WhatsApp contact buttons",
      "Structured data so opening hours can appear in Google results",
    ],
    enquiryType: "Restaurant",
  },
  {
    slug: "gym-website-demo",
    title: "Gym Website",
    category: "Fitness",
    isDemo: true,
    summary:
      "Bold, high-contrast design built around memberships, classes and trainers.",
    description:
      "A gym and fitness website concept built around the three things prospective members look for first: what it costs, what classes run, and who is coaching. The design uses a dark, high-contrast style with a clear path to a trial sign-up.",
    preview: "gym",
    pages: ["Home", "Memberships", "Classes", "Trainers", "Schedule", "Contact"],
    features: [
      "Membership tiers laid out for quick comparison",
      "Weekly class timetable",
      "Trainer profile cards",
      "Free trial enquiry form",
      "Facility gallery",
      "Sticky sign-up call to action on mobile",
    ],
    enquiryType: "Gym",
  },
  {
    slug: "plumbing-website-demo",
    title: "Plumbing Business Website",
    category: "Service Business",
    isDemo: true,
    summary:
      "Service list, coverage areas and call buttons designed for urgent searches.",
    description:
      "A service business website concept for a plumbing company. Someone with a leaking pipe is not browsing — they need to know you cover their area and reach you in seconds. The layout is built around that, with contact options fixed in view on mobile.",
    preview: "plumber",
    pages: ["Home", "Services", "Areas Covered", "Request a Quote", "Contact"],
    features: [
      "Service list written in plain language",
      "Areas covered so visitors self-qualify immediately",
      "Call and WhatsApp buttons pinned on mobile",
      "Quote request form with job type selection",
      "Completed work gallery",
      "Lightweight pages that load quickly on mobile networks",
    ],
    enquiryType: "Service Business",
  },
  {
    slug: "cafe-website-demo",
    title: "Café Website",
    category: "Café",
    isDemo: true,
    summary:
      "A softer, editorial layout for a specialty coffee shop and its daily menu.",
    description:
      "A café website concept with a calmer, more editorial feel than a full restaurant site. It focuses on atmosphere, the daily menu, and where to find the shop — the things that turn someone browsing on a phone into someone walking through the door.",
    preview: "cafe",
    pages: ["Home", "Menu", "Our Story", "Find Us", "Contact"],
    features: [
      "Daily and seasonal menu sections",
      "Story and roastery background page",
      "Location card with map link and opening hours",
      "Instagram-ready photo layouts",
      "Simple contact and catering enquiry form",
      "Fast, image-light pages",
    ],
    enquiryType: "Business Website",
  },
  {
    slug: "local-business-website-demo",
    title: "Local Business Website",
    category: "Local Business",
    isDemo: true,
    summary:
      "A clean, credible presence for a small business, shop or professional.",
    description:
      "A general business website concept for a local company, shop or professional. The goal is credibility and contact: explain clearly what the business does, who it serves, and how to reach it, without unnecessary complexity.",
    preview: "local",
    pages: ["Home", "Services", "About", "Contact"],
    features: [
      "Clear overview of the business and what it offers",
      "Service sections structured for quick scanning",
      "About section that builds trust",
      "Contact form, map link and direct contact options",
      "Room to add pages as the business grows",
      "Accessibility and SEO fundamentals built in",
    ],
    enquiryType: "Business Website",
  },
  {
    slug: "ecommerce-website-demo",
    title: "E-commerce Website",
    category: "E-commerce",
    isDemo: true,
    summary:
      "Product grid, filtering and a checkout flow built for phone-first shopping.",
    description:
      "An online store concept covering the full path from browsing to checkout. Product pages are built to answer questions before they are asked, and the cart and checkout stay out of the customer's way — particularly on a phone, where most of the browsing happens.",
    preview: "ecommerce",
    pages: ["Home", "Shop", "Product Detail", "Cart", "Checkout", "Contact"],
    features: [
      "Product listing with categories, search and filters",
      "Product detail pages with image galleries and variants",
      "Cart and multi-step checkout",
      "Payment gateway integration (provider of your choice)",
      "Order and stock management options",
      "Mobile-first layouts throughout",
    ],
    enquiryType: "E-commerce",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * The project highlighted in the large "Featured Demo" section on the home
 * page. Change this slug to feature a different project — or a real client
 * site once one is added above.
 */
export const featuredProjectSlug = "restaurant-website-demo";

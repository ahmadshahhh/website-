import type { IconName } from "@/components/icons";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SERVICES
 *
 * Each entry renders a card on the home page and a detail page at
 * /services/<slug>. To add a service, append an object here — the card, the
 * detail page, the sitemap and the contact form dropdown all update
 * automatically.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export type Service = {
  slug: string;
  icon: IconName;
  title: string;
  /** Short line shown on the home page card. */
  description: string;
  /** Longer intro shown at the top of the service detail page. */
  intro: string;
  /** Bullet points shown on the detail page. */
  includes: string[];
  /** Value pre-selected in the contact form when arriving from this service. */
  enquiryType: string;
};

export const services: Service[] = [
  {
    slug: "restaurant-websites",
    icon: "utensils",
    title: "Restaurant Websites",
    description:
      "Menus, locations, contact information, reservations, promotions and more.",
    intro:
      "A restaurant website should make people hungry and make it easy to visit. We structure the site around the things guests actually look for — what you serve, where you are, and how to book a table or order.",
    includes: [
      "Menu pages organised by category, easy to update as dishes change",
      "Opening hours, location and directions front and centre",
      "Reservation or enquiry options, or a link to the booking tool you use",
      "Space for seasonal promotions and featured dishes",
      "Photo galleries that stay fast on mobile data",
      "Click-to-call and WhatsApp buttons for quick contact",
    ],
    enquiryType: "Restaurant",
  },
  {
    slug: "gym-websites",
    icon: "dumbbell",
    title: "Gym Websites",
    description:
      "Membership information, classes, trainers, schedules and contact options.",
    intro:
      "People choosing a gym want to know what it costs, what classes run, and who is coaching. We build gym sites that answer those questions quickly and make signing up the obvious next step.",
    includes: [
      "Membership options laid out clearly and easy to compare",
      "Class timetables and schedules that are simple to keep current",
      "Trainer and coach profiles",
      "Facility photos and tour sections",
      "Trial or sign-up enquiry forms",
      "Location, parking and opening hours",
    ],
    enquiryType: "Gym",
  },
  {
    slug: "service-business-websites",
    icon: "wrench",
    title: "Service Business Websites",
    description:
      "Perfect for plumbers, electricians, mechanics, cleaners and other local services.",
    intro:
      "For a service business, the website has one job: convince someone with an urgent problem that you can solve it, then get them to call. We build for speed, clarity and contact.",
    includes: [
      "Clear list of the services you offer and the areas you cover",
      "Call and WhatsApp buttons visible on every screen",
      "Emergency or same-day contact sections where relevant",
      "Simple quote request forms",
      "Before-and-after or completed work galleries",
      "Fast loading on mobile, where most of these searches happen",
    ],
    enquiryType: "Service Business",
  },
  {
    slug: "business-websites",
    icon: "building",
    title: "Business Websites",
    description:
      "Professional websites for companies, shops and local businesses.",
    intro:
      "A company website is often the first impression a customer, partner or supplier gets. We build sites that present your business credibly and make it easy to get in touch.",
    includes: [
      "Company overview and what you do, written plainly",
      "Service or product sections structured for scanning",
      "Team and about pages where useful",
      "Contact forms, maps and direct contact options",
      "Structure that supports adding pages as the business grows",
      "Search-engine and accessibility fundamentals built in",
    ],
    enquiryType: "Business Website",
  },
  {
    slug: "ecommerce-websites",
    icon: "cart",
    title: "E-commerce Websites",
    description:
      "Product pages, shopping functionality and online selling features.",
    intro:
      "Selling online means product pages that inform, a cart that does not get in the way, and a checkout people trust. We build storefronts around those fundamentals.",
    includes: [
      "Product listing and detail pages with clear imagery",
      "Categories, search and filtering",
      "Cart and checkout flow",
      "Payment gateway integration (provider of your choice)",
      "Order and inventory management options",
      "Mobile-first layouts, since most browsing happens on phones",
    ],
    enquiryType: "E-commerce",
  },
  {
    slug: "custom-websites",
    icon: "sparkle",
    title: "Custom Websites",
    description: "A website designed specifically around your requirements.",
    intro:
      "Some projects do not fit a category. If you have a specific idea, an unusual workflow, or an existing system the site needs to work with, we can design and build around it.",
    includes: [
      "Design built around your brand rather than a stock template",
      "Custom page types and layouts for your content",
      "Booking, enquiry or calculator tools where needed",
      "Integration with tools and services you already use",
      "Multi-language support, including Arabic and English",
      "Room to add features after launch",
    ],
    enquiryType: "Other",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/** Options for the contact form's "website type" dropdown. */
export const websiteTypeOptions = [
  "Restaurant",
  "Gym",
  "Service Business",
  "E-commerce",
  "Business Website",
  "Portfolio",
  "Other",
] as const;

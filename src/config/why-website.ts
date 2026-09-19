import type { IconName } from "@/components/icons";

/**
 * Why a business benefits from having a website at all.
 *
 * Deliberately describes what a website *does* rather than promising outcomes:
 * no claims about search rankings, guaranteed customers or results.
 */
export const websiteReasons: {
  icon: IconName;
  title: string;
  description: string;
}[] = [
  {
    icon: "search",
    title: "Get Found Online",
    description:
      "Make it easier for customers to find your business and the information that matters to them.",
  },
  {
    icon: "sparkle",
    title: "Look Professional",
    description:
      "Give customers a modern, professional first impression of your business.",
  },
  {
    icon: "chat",
    title: "Get More Customers",
    description:
      "Make it easy to contact you by WhatsApp, phone or straight from the website.",
  },
  {
    icon: "layers",
    title: "Show Your Business",
    description:
      "Services, menus, products, location, opening hours, offers and contact details, all in one place.",
  },
  {
    icon: "smartphone",
    title: "Built for Mobile",
    description:
      "Works smoothly on phones, tablets and computers.",
  },
];

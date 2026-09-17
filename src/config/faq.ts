/**
 * FAQ entries. Rendered as an accessible accordion on the home page and
 * published as FAQPage structured data for search engines.
 * Add, remove or reorder items here.
 */
export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "What type of businesses do you build websites for?",
    answer:
      "Webzivo can create websites for restaurants, gyms, service businesses, shops, professionals and other businesses. If you are not sure whether your business fits, get in touch and describe what you do.",
  },
  {
    question: "Can you build a custom website?",
    answer:
      "Yes. Websites can be customised according to your business's requirements, from the design and page structure to specific features you need.",
  },
  {
    question: "Will my website work on mobile?",
    answer:
      "Yes. Every website is designed responsively so it works on phones, tablets and desktop computers. Mobile layouts are treated as a priority, not an afterthought.",
  },
  {
    question: "Can I update my website later?",
    answer:
      "Yes. Projects are built so that content can be updated and new pages or features can be added after launch. Tell us what you expect to change often and we will structure the site around that.",
  },
  {
    question: "How much does a website cost?",
    answer:
      "Pricing depends on what the website needs to do — the number of pages, the features involved and how much content is required. Contact Webzivo with a description of your business and we will put together a quote for your project.",
  },
  {
    question: "How do I get started?",
    answer:
      "Contact Webzivo and tell us about your business and what you need. We will talk through the right approach for your project and what it would involve.",
  },
];

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
    question: "How long does it take?",
    answer:
      "Most websites are designed, built and ready to launch within about one week. The timeline is agreed in writing before we start, so you know exactly what to expect.",
  },
  {
    question: "How many revisions do I get?",
    answer:
      "Unlimited revisions during the build. We keep refining the design until you are happy with it, rather than charging per change.",
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
    question: "What happens after my website is live?",
    answer:
      "Your website is covered by our monthly plan, which keeps it online, secure and up to date. That includes content changes when you need them, so you are never left maintaining it alone.",
  },
  {
    question: "How much does a website cost?",
    answer:
      "Websites start from 30 KD per month, which includes hosting, security, and updates. Advanced and e-commerce websites are quoted based on your needs. Contact us for a free consultation.",
  },
  {
    question: "How do I get started?",
    answer:
      "Contact Webzivo and tell us about your business and what you need. We will talk through the right approach for your project and what it would involve.",
  },
];

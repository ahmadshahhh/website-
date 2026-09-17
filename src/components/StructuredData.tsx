import { faqs } from "@/config/faq";
import { services } from "@/config/services";
import { siteConfig } from "@/config/site";

/**
 * JSON-LD structured data. Helps Google understand what Webzivo does and
 * where it operates — which matters for the Maps / local-search traffic this
 * site is built to convert.
 *
 * Only verifiable facts are published here. Contact details appear only once
 * they are configured, and no ratings, review counts or price ranges are
 * claimed.
 */
export function StructuredData() {
  const business = {
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    areaServed: { "@type": "Country", name: siteConfig.country },
    address: {
      "@type": "PostalAddress",
      addressCountry: siteConfig.countryCode,
      ...(siteConfig.address ? { streetAddress: siteConfig.address } : {}),
    },
    ...(siteConfig.isEmailConfigured ? { email: siteConfig.email } : {}),
    ...(siteConfig.isWhatsAppConfigured
      ? { telephone: `+${siteConfig.whatsAppNumber}` }
      : {}),
    ...(siteConfig.isMapsConfigured ? { hasMap: siteConfig.mapsUrl } : {}),
    ...(siteConfig.socials.length > 0
      ? { sameAs: siteConfig.socials.map((social) => social.href) }
      : {}),
    knowsAbout: [
      "Website design",
      "Website development",
      "Responsive web design",
      "E-commerce websites",
      "Local business websites",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Website design and development services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          url: `${siteConfig.url}/services/${service.slug}`,
        },
      })),
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#business` },
    inLanguage: "en",
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [business, website, faqPage],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped below; no user input reaches this.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}

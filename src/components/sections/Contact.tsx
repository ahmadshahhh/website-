import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/icons";
import { LocationLink } from "@/components/ui/LocationLink";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig, whatsAppLink } from "@/config/site";

/** Shared styling for the square icon tiles in the location card. */
const ICON_TILE =
  "grid size-12 shrink-0 place-items-center rounded-xl border border-line bg-paper-soft text-ink";

export function Contact() {
  return (
    // Extra bottom padding keeps the card clear of the floating WhatsApp
    // button, which is pinned to the bottom-right of the viewport.
    <Section id="contact" tone="soft" className="pb-28 sm:pb-32">
      <SectionHeading
        eyebrow="Contact"
        title="Let's Build Your Website"
        description="Tell us about your business and what you need. The more detail you give us, the more useful our first reply will be."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.55fr_1fr] lg:gap-8">
        {/* Form */}
        <Reveal>
          <div className="rounded-card border border-line bg-white p-6 sm:p-8 lg:p-10">
            <ContactForm />
          </div>
        </Reveal>

        {/* Location, map and direct contact options */}
        <Reveal delay={120}>
          <div className="flex h-full flex-col rounded-card border border-line bg-white p-7 sm:p-8">
            <span className={ICON_TILE}>
              <Icon name="mapPin" className="size-5" strokeWidth={1.5} />
            </span>

            <h3 className="mt-5 text-lg font-bold tracking-[-0.015em] text-ink">
              Location
            </h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
              {siteConfig.address ? (
                <>
                  {siteConfig.address}
                  <br />
                </>
              ) : null}
              <LocationLink className="font-medium text-ink" />
            </p>

            {/* Keyless Google Maps embed — no API key or billing account
                needed. Lazy so it never delays the rest of the page. */}
            <div className="mt-5 overflow-hidden rounded-xl border border-line">
              <iframe
                src={siteConfig.mapsEmbedUrl}
                title={`Map showing Webzivo in ${siteConfig.locationLabel}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-52 w-full border-0 sm:h-60"
              />
            </div>

            {/* Icon-only contact shortcuts. They carry no visible text, so each
                one needs an accessible name of its own. */}
            <div className="mt-auto border-t border-line pt-6">
              <p className="eyebrow text-muted">Message us</p>
              <div className="mt-3.5 flex items-center gap-3">
                <a
                  href={whatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Message Webzivo on WhatsApp"
                  className={`${ICON_TILE} transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white`}
                >
                  <Icon name="whatsapp" className="size-5" />
                </a>

                <a
                  href={`mailto:${siteConfig.email}`}
                  aria-label={`Email Webzivo at ${siteConfig.email}`}
                  className={`${ICON_TILE} transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white`}
                >
                  <Icon name="mail" className="size-5" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

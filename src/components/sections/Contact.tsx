import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig, whatsAppLink } from "@/config/site";

export function Contact() {
  return (
    <Section id="contact" tone="soft">
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

        {/* Direct contact options */}
        <Reveal delay={120}>
          <div className="flex h-full flex-col gap-6">
            <div className="rounded-card border border-line bg-ink p-7 text-white sm:p-8">
              <h3 className="text-lg font-bold tracking-[-0.015em]">
                Prefer to message us?
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted-dark">
                Send a message and describe your business — we&apos;ll reply
                with what we&apos;d suggest.
              </p>

              <ul className="mt-7 space-y-3">
                <li>
                  <a
                    href={whatsAppLink()}
                    {...(siteConfig.isWhatsAppConfigured
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center gap-4 rounded-xl border border-ink-line bg-ink-900 p-4 transition-colors duration-200 hover:border-ink-700 hover:bg-ink-800"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-whatsapp text-white">
                      <Icon name="whatsapp" className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.9375rem] font-semibold">
                        WhatsApp
                      </span>
                      <span className="block truncate text-sm text-muted-dark">
                        {siteConfig.isWhatsAppConfigured
                          ? `+${siteConfig.whatsAppNumber}`
                          : "Number coming soon — use the form"}
                      </span>
                    </span>
                    <Icon
                      name="arrowUpRight"
                      className="ml-auto size-4 shrink-0 text-muted-dark transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </li>

                {/* Email appears here only once NEXT_PUBLIC_CONTACT_EMAIL is set. */}
                {siteConfig.isEmailConfigured ? (
                  <li>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="group flex items-center gap-4 rounded-xl border border-ink-line bg-ink-900 p-4 transition-colors duration-200 hover:border-ink-700 hover:bg-ink-800"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white text-ink">
                        <Icon name="mail" className="size-5" strokeWidth={1.5} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.9375rem] font-semibold">
                          Email
                        </span>
                        <span className="block truncate text-sm text-muted-dark">
                          {siteConfig.email}
                        </span>
                      </span>
                      <Icon
                        name="arrowUpRight"
                        className="ml-auto size-4 shrink-0 text-muted-dark transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>

            {/* Location */}
            <div className="grow rounded-card border border-line bg-white p-7 sm:p-8">
              <span className="grid size-10 place-items-center rounded-lg border border-line bg-paper-soft text-ink">
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
                {siteConfig.country}
              </p>

              {siteConfig.isMapsConfigured ? (
                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline-offset-4 hover:underline"
                >
                  Open in Google Maps
                  <Icon name="arrowUpRight" className="size-4" />
                </a>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

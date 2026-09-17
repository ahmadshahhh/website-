import { Icon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { siteConfig, whatsAppLink } from "@/config/site";

export function CtaBanner() {
  return (
    <Section tone="dark" className="overflow-hidden">
      {/* Layered texture and a single warm glow — the only place the accent
          colour is used at scale. */}
      <div
        aria-hidden="true"
        className="grid-texture pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_70%_at_50%_50%,#000,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-full size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/12 blur-[110px]"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-ink-line bg-ink-900 px-3.5 py-2 text-accent-bright">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-accent-bright"
            />
            Let&apos;s get started
          </span>

          <h2 className="display mt-7 text-[2.25rem] text-white sm:text-[3rem] lg:text-[3.6rem]">
            Ready to Build Your Website?
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-dark sm:text-lg">
            Tell us about your business and what you need. We&apos;ll help you
            plan the right website for your business.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/#contact" variant="inverse" size="lg" withArrow>
              Request a Website
            </ButtonLink>
            <ButtonLink
              href={whatsAppLink()}
              variant="inverseOutline"
              size="lg"
            >
              {siteConfig.isWhatsAppConfigured ? (
                <Icon name="whatsapp" className="size-[18px]" />
              ) : null}
              Contact Webzivo
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

import { Icon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import {
  pricingCustomQuote,
  pricingNote,
  pricingPlans,
} from "@/config/pricing";
import { whatsAppLink } from "@/config/site";

/**
 * Pricing. Plans, prices and features all live in src/config/pricing.ts, and
 * the FAQ cost answer in src/config/faq.ts quotes the same figures.
 */
export function Pricing() {
  return (
    <Section id="pricing" tone="soft">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple monthly pricing"
        description="Pick the plan that fits your business. Every plan is billed monthly, with no long contract to sign."
      />

      {/* Two cards, so they are capped rather than stretched across a wide
          screen, and stack to a single column below md. */}
      <ul className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
        {pricingPlans.map((plan, index) => (
          <li key={plan.name}>
            <Reveal delay={index * 90} className="h-full">
              <article
                className={
                  plan.highlighted
                    ? "relative flex h-full flex-col rounded-card border border-ink bg-ink p-7 text-white shadow-[0_22px_54px_-28px_rgba(10,10,11,0.5)] sm:p-8"
                    : "relative flex h-full flex-col rounded-card border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_18px_46px_-24px_rgba(10,10,11,0.3)] sm:p-8"
                }
              >
                {plan.highlighted ? (
                  <span className="eyebrow absolute -top-3 left-7 inline-flex items-center rounded-full bg-accent-bright px-3 py-1.5 text-ink">
                    Most Popular
                  </span>
                ) : null}

                <h3
                  className={
                    plan.highlighted
                      ? "text-lg font-bold tracking-[-0.015em] text-white"
                      : "text-lg font-bold tracking-[-0.015em] text-ink"
                  }
                >
                  {plan.name}
                </h3>

                <p className="mt-5 flex flex-wrap items-baseline gap-x-2">
                  <span
                    className={
                      plan.highlighted
                        ? "text-sm font-medium text-muted-dark"
                        : "text-sm font-medium text-muted"
                    }
                  >
                    {plan.prefix}
                  </span>
                  <span
                    className={
                      plan.highlighted
                        ? "display text-[2rem] text-white"
                        : "display text-[2rem] text-ink"
                    }
                  >
                    {plan.price}
                  </span>
                  <span
                    className={
                      plan.highlighted
                        ? "text-sm font-medium text-muted-dark"
                        : "text-sm font-medium text-muted"
                    }
                  >
                    {plan.period}
                  </span>
                </p>

                <ul
                  className={
                    plan.highlighted
                      ? "mt-7 grow space-y-3 border-t border-ink-line pt-6"
                      : "mt-7 grow space-y-3 border-t border-line pt-6"
                  }
                >
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={
                        plan.highlighted
                          ? "flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-muted-dark"
                          : "flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-muted"
                      }
                    >
                      <Icon
                        name="check"
                        className={
                          plan.highlighted
                            ? "mt-0.5 size-4 shrink-0 text-accent-bright"
                            : "mt-0.5 size-4 shrink-0 text-accent"
                        }
                        strokeWidth={2.5}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal delay={120}>
        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-5 text-center">
          <p className="text-[0.9375rem] leading-relaxed text-muted">
            {pricingNote}
          </p>
          <p className="text-[0.9375rem] leading-relaxed text-muted">
            {pricingCustomQuote.text}
          </p>
          <ButtonLink href={whatsAppLink()} size="lg">
            <Icon name="whatsapp" className="size-[18px]" />
            {pricingCustomQuote.ctaLabel}
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}

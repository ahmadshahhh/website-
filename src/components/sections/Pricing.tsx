import { Icon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { whatsAppLink } from "@/config/site";

type Plan = {
  name: string;
  /** Headline figure, e.g. "25 KD". Omitted for quote-only plans. */
  price?: string;
  /** Qualifier shown before the price, e.g. "From". */
  prefix?: string;
  /** Billing period shown after the price. */
  period?: string;
  /** Used instead of a price when the plan is quoted per project. */
  priceNote?: string;
  description: string;
  highlighted?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Starter Website",
    prefix: "From",
    price: "25 KD",
    period: "/month",
    description:
      "For small businesses that need a simple, professional website with their services, location, and contact options.",
  },
  {
    name: "Business Website",
    prefix: "From",
    price: "30 KD",
    period: "/month",
    description:
      "For growing businesses that need more pages, such as menus, services, galleries, or class schedules.",
    highlighted: true,
  },
  {
    name: "Advanced / E-commerce",
    priceNote: "Custom quote",
    description:
      "For online stores and websites with special features.",
  },
];

export function Pricing() {
  return (
    <Section id="pricing" tone="soft">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple monthly pricing"
        description="Pick the plan that fits your business. Every plan is billed monthly, with no long contract to sign."
      />

      {/* One column until md, then three - two-up would leave an odd card. */}
      <ul className="mt-14 grid gap-5 md:grid-cols-3">
        {PLANS.map((plan, index) => (
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
                  <span className="eyebrow absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-accent-bright px-3 py-1.5 text-ink">
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
                  {plan.prefix ? (
                    <span
                      className={
                        plan.highlighted
                          ? "text-sm font-medium text-muted-dark"
                          : "text-sm font-medium text-muted"
                      }
                    >
                      {plan.prefix}
                    </span>
                  ) : null}

                  {plan.price ? (
                    <>
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
                    </>
                  ) : (
                    <span
                      className={
                        plan.highlighted
                          ? "display text-[1.6rem] text-white"
                          : "display text-[1.6rem] text-ink"
                      }
                    >
                      {plan.priceNote}
                    </span>
                  )}
                </p>

                <p
                  className={
                    plan.highlighted
                      ? "mt-4 grow text-[0.9375rem] leading-relaxed text-muted-dark"
                      : "mt-4 grow text-[0.9375rem] leading-relaxed text-muted"
                  }
                >
                  {plan.description}
                </p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal delay={120}>
        <div className="mt-10 flex flex-col items-center gap-5 text-center">
          <p className="max-w-xl text-[0.9375rem] leading-relaxed text-muted">
            All plans include hosting, security, and updates. Contact us for a
            free consultation.
          </p>
          <ButtonLink href={whatsAppLink()} size="lg">
            <Icon name="whatsapp" className="size-[18px]" />
            Ask on WhatsApp
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}

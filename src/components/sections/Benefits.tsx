import { Icon, type IconName } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const BENEFITS: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "brush",
    title: "Modern Design",
    description: "Professional designs built around your brand.",
  },
  {
    icon: "smartphone",
    title: "Mobile Ready",
    description:
      "Your website looks great on phones, tablets, and computers.",
  },
  {
    icon: "target",
    title: "Built for Business",
    description:
      "Designed to help customers understand your business and contact you.",
  },
  {
    icon: "sliders",
    title: "Custom Websites",
    description: "Every website can be customized to the business.",
  },
];

/**
 * A quiet strip of reassurance directly beneath the hero. Deliberately plain:
 * hairline dividers, no cards, no shadows — it should read as fact, not sales.
 */
export function Benefits() {
  return (
    <section className="border-t border-line bg-paper-soft">
      <Container>
        {/* Named for assistive tech; the strip is visually self-explanatory. */}
        <h2 className="sr-only">What you get with a Webzivo website</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit, index) => (
            <li
              key={benefit.title}
              className="border-line py-8 sm:py-10 [&:not(:last-child)]:border-b sm:[&:not(:last-child)]:border-b-0 sm:[&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0 sm:[&:nth-child(even)]:border-l sm:[&:nth-child(even)]:pl-8 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:pl-8 lg:[&:nth-child(even)]:pl-8"
            >
              <Reveal delay={index * 70}>
                <Icon
                  name={benefit.icon}
                  className="size-6 text-ink"
                  strokeWidth={1.4}
                />
                <h3 className="mt-4 text-base font-bold tracking-[-0.01em] text-ink">
                  {benefit.title}
                </h3>
                <p className="mt-2 max-w-[28ch] text-[0.9375rem] leading-relaxed text-muted">
                  {benefit.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

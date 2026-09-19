import { Icon, type IconName } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

const COMMITMENTS: {
  icon: IconName;
  title: string;
  description: string;
}[] = [
  {
    icon: "chat",
    title: "Free Consultation",
    description:
      "Tell us about your business on WhatsApp or through the form. We'll suggest the right website at no cost.",
  },
  {
    icon: "bolt",
    title: "Delivered in 1 Week",
    description:
      "Most websites are designed, built, and ready to launch within one week.",
  },
  {
    icon: "brush",
    title: "Unlimited Revisions",
    description:
      "We keep refining the design during the build until you're happy with it.",
  },
  {
    icon: "shield",
    title: "Simple Written Agreement",
    description:
      "Every project starts with a clear agreement covering what's included, the timeline, and the price.",
  },
  {
    icon: "layers",
    title: "Monthly Plan",
    description:
      "After launch, your website is kept online, secure, and updated for a simple monthly fee, including content changes when you need them.",
  },
];

export function HowWeWork() {
  return (
    <Section id="how-we-work" tone="light">
      <SectionHeading
        eyebrow="How We Work"
        title="What working with us looks like"
        description="No long contracts, no surprise invoices, and no waiting months for a website. Here's exactly what you get."
      />

      {/* Separate cards rather than a shared-hairline grid: five items would
          leave a visible empty cell in a three-column bordered grid. */}
      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {COMMITMENTS.map((item, index) => (
          <li key={item.title}>
            <Reveal delay={(index % 3) * 80} className="h-full">
              <article className="group flex h-full flex-col rounded-card border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_18px_46px_-24px_rgba(10,10,11,0.3)]">
                <span className="grid size-11 place-items-center rounded-xl bg-ink text-white transition-transform duration-300 group-hover:-rotate-6">
                  <Icon name={item.icon} className="size-5" strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 text-lg font-bold leading-snug tracking-[-0.015em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                  {item.description}
                </p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

import { Icon, type IconName } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

const REASONS: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "shield",
    title: "Professional First Impression",
    description:
      "Give potential customers a professional place to learn about your business.",
  },
  {
    icon: "smartphone",
    title: "Mobile Friendly",
    description:
      "Designed to work smoothly across phones, tablets and computers.",
  },
  {
    icon: "brush",
    title: "Custom Design",
    description:
      "Your website should match your business instead of looking like everyone else's.",
  },
  {
    icon: "chat",
    title: "Easy Contact",
    description:
      "Make it simple for customers to call, message, or find your business.",
  },
  {
    icon: "bolt",
    title: "Fast & Modern",
    description:
      "Built with modern web technologies and performance in mind.",
  },
  {
    icon: "layers",
    title: "Built to Grow",
    description:
      "Structured so new features and content can be added later.",
  },
];

export function WhyWebzivo() {
  return (
    <Section id="why" tone="light">
      <SectionHeading
        eyebrow="Why Webzivo"
        title="Why Businesses Choose Webzivo"
        description="The things that actually make a difference to a small business website — done properly, from the start."
      />

      {/* Shared hairlines create a single engineered grid rather than six
          floating cards. */}
      <ul className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {REASONS.map((reason, index) => (
          <li key={reason.title} className="bg-white">
            <Reveal delay={(index % 3) * 80}>
              <div className="group h-full p-7 transition-colors duration-300 hover:bg-paper-soft lg:p-8">
                <span className="grid size-11 place-items-center rounded-xl bg-ink text-white transition-transform duration-300 group-hover:-rotate-6">
                  <Icon name={reason.icon} className="size-5" strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 text-lg font-bold leading-snug tracking-[-0.015em] text-ink">
                  {reason.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                  {reason.description}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

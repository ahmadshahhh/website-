import { Icon, type IconName } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

const STEPS: {
  number: string;
  icon: IconName;
  title: string;
  description: string;
}[] = [
  {
    number: "01",
    icon: "chat",
    title: "Tell Us About Your Business",
    description: "Tell us what your business does and what you need.",
  },
  {
    number: "02",
    icon: "pen",
    title: "We Design",
    description:
      "We create a modern website based on your brand and goals.",
  },
  {
    number: "03",
    icon: "code",
    title: "We Build",
    description:
      "We develop and optimize the website for mobile and desktop.",
  },
  {
    number: "04",
    icon: "rocket",
    title: "Launch",
    description: "Your website goes live and is ready for customers.",
  },
];

export function Process() {
  return (
    <Section id="process" tone="dark" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="grid-texture pointer-events-none absolute inset-0 [mask-image:radial-gradient(80%_60%_at_50%_0%,#000,transparent)]"
      />

      <div className="relative">
        <SectionHeading
          eyebrow="Process"
          title="How It Works"
          tone="dark"
          description="Four steps from first conversation to a live website. No jargon, no surprises."
        />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-card border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step.number} className="bg-ink">
              <Reveal delay={index * 90}>
                <div className="group relative h-full p-7 transition-colors duration-300 hover:bg-ink-900 lg:p-8">
                  {/* Accent rule that fills in on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
                  />

                  <div className="flex items-center justify-between">
                    <span className="font-mono text-3xl font-medium tracking-tight text-accent-bright">
                      {step.number}
                    </span>
                    <Icon
                      name={step.icon}
                      className="size-6 text-white/25 transition-colors duration-300 group-hover:text-white/60"
                      strokeWidth={1.4}
                    />
                  </div>

                  <h3 className="mt-7 text-lg font-bold leading-snug tracking-[-0.015em] text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-dark">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

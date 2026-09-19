import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { websiteReasons } from "@/config/why-website";

/**
 * What a website does for a business. Content lives in
 * src/config/why-website.ts, and is deliberately written as capability rather
 * than promise - no claims about rankings, customer numbers or results.
 */
export function WhyWebsite() {
  return (
    <Section id="why-website" tone="soft">
      <SectionHeading
        eyebrow="Why a website"
        title="Why your business needs a website"
        description="A website gives customers one reliable place to find you, understand what you offer, and get in touch."
      />

      {/* Separate cards rather than a shared-hairline grid: five items would
          leave a visible empty cell in a three-column bordered grid. */}
      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {websiteReasons.map((reason, index) => (
          <li key={reason.title}>
            <Reveal delay={(index % 3) * 80} className="h-full">
              <article className="group flex h-full flex-col rounded-card border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_18px_46px_-24px_rgba(10,10,11,0.3)]">
                <span className="grid size-11 place-items-center rounded-xl bg-ink text-white transition-transform duration-300 group-hover:-rotate-6">
                  <Icon name={reason.icon} className="size-5" strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 text-lg font-bold leading-snug tracking-[-0.015em] text-ink">
                  {reason.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                  {reason.description}
                </p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

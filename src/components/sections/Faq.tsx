import { Icon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { faqs } from "@/config/faq";

/**
 * FAQ accordion built on native <details>/<summary>.
 *
 * No JavaScript, no ARIA to get wrong: it is keyboard accessible, works
 * without JS, and browser find-in-page can open a closed answer. The same
 * questions are published as FAQPage structured data (see StructuredData).
 */
export function Faq() {
  return (
    <Section id="faq" tone="light">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                Questions,
                <br />
                answered.
              </>
            }
            description="If your question isn't here, send it over and we'll answer it directly."
          />

          <Reveal delay={120}>
            <ButtonLink
              href="/#contact"
              variant="outline"
              className="mt-8"
              withArrow
            >
              Ask a Question
            </ButtonLink>
          </Reveal>
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {faqs.map((faq, index) => (
            <li key={faq.question}>
              <Reveal delay={Math.min(index, 3) * 60}>
                <details className="group">
                  <summary className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-muted">
                    <h3 className="text-lg font-bold leading-snug tracking-[-0.015em] text-ink group-hover:text-muted">
                      {faq.question}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-line text-ink transition-all duration-300 group-open:rotate-180 group-open:border-ink group-open:bg-ink group-open:text-white"
                    >
                      <Icon name="chevronDown" className="size-4" />
                    </span>
                  </summary>
                  <div className="faq-answer pb-7 pr-14">
                    <p className="text-[0.9375rem] leading-relaxed text-muted sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

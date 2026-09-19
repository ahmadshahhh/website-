import { Icon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { testimonials, testimonialsPlaceholder } from "@/config/testimonials";

/**
 * Client stories.
 *
 * Driven entirely by src/config/testimonials.ts. While that array is empty the
 * section says so plainly rather than inventing reviews; add an entry and it
 * switches to testimonial cards with no change here.
 */
export function Testimonials() {
  const hasTestimonials = testimonials.length > 0;

  return (
    <Section id="clients" tone="soft">
      <SectionHeading
        eyebrow="Client stories"
        title={hasTestimonials ? "What our clients say" : "Working with Webzivo"}
        description={
          hasTestimonials
            ? "Feedback from the businesses we have built websites for."
            : undefined
        }
      />

      {hasTestimonials ? (
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <li key={`${testimonial.author}-${testimonial.business}`}>
              <Reveal delay={(index % 3) * 80} className="h-full">
                <figure className="flex h-full flex-col rounded-card border border-line bg-white p-7">
                  <Icon
                    name="chat"
                    className="size-6 shrink-0 text-accent"
                    strokeWidth={1.5}
                  />
                  <blockquote className="mt-5 grow text-[0.9375rem] leading-relaxed text-muted">
                    {testimonial.quote}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-line pt-5">
                    <span className="block text-[0.9375rem] font-bold tracking-[-0.015em] text-ink">
                      {testimonial.author}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted">
                      {testimonial.business}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      ) : (
        <Reveal delay={80}>
          <div className="mt-12 rounded-card border border-line bg-white p-7 sm:p-10">
            <span className="grid size-12 place-items-center rounded-xl border border-line bg-paper-soft text-ink">
              <Icon name="chat" className="size-6" strokeWidth={1.5} />
            </span>

            <h3 className="mt-6 text-xl font-bold tracking-[-0.015em] text-ink">
              {testimonialsPlaceholder.title}
            </h3>
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
              {testimonialsPlaceholder.description}
            </p>

            <ButtonLink href="/#contact" className="mt-7" withArrow>
              {testimonialsPlaceholder.ctaLabel}
            </ButtonLink>
          </div>
        </Reveal>
      )}
    </Section>
  );
}

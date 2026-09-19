import Link from "next/link";
import { Icon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { services } from "@/config/services";

export function Services() {
  return (
    <Section id="services" tone="light">
      <SectionHeading
        eyebrow="Services"
        title="Websites Built for Your Business"
        description="Whether you're running a restaurant, gym, service company, shop, or personal brand, Webzivo can build a website around your business."
      />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <li key={service.slug}>
            <Reveal delay={(index % 3) * 90} className="h-full">
              <article className="group flex h-full flex-col rounded-card border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_18px_46px_-24px_rgba(10,10,11,0.3)]">
                <span className="grid size-12 place-items-center rounded-xl border border-line bg-paper-soft text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                  <Icon name={service.icon} className="size-6" strokeWidth={1.4} />
                </span>

                <h3 className="mt-6 text-xl font-bold tracking-[-0.015em] text-ink">
                  {service.title}
                </h3>
                <p className="mt-3 grow text-[0.9375rem] leading-relaxed text-muted">
                  {service.description}
                </p>

                <div className="mt-7 border-t border-line pt-5">
                  <Link
                    href={`/services/${service.slug}`}
                    className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-ink"
                  >
                    Learn More
                    <Icon
                      name="arrowRight"
                      className="size-4 transition-transform duration-200 group-hover/link:translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal delay={120}>
        <div className="mt-12 flex flex-col items-start gap-4 rounded-card border border-line bg-paper-soft p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="max-w-xl text-[0.9375rem] leading-relaxed text-muted">
            <span className="font-semibold text-ink">
              Not sure which one fits?
            </span>{" "}
            Tell us what your business does and we&apos;ll suggest the right
            approach for it.
          </p>
          <ButtonLink href="/#contact" withArrow className="shrink-0">
            Get Your Website
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}

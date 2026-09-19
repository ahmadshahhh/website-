import { Icon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import { LocationLink } from "@/components/ui/LocationLink";

const FOCUS = [
  "Designs built around your business, not a stock template",
  "Mobile layouts treated as a priority, not an afterthought",
  "Clear content so visitors understand what you offer",
  "Structure that can grow as the business does",
];

export function About() {
  return (
    <Section id="about" tone="soft">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Copy */}
        <div>
          <Reveal>
            <Eyebrow>About</Eyebrow>
            <h2 className="display mt-5 text-[2rem] sm:text-[2.6rem] lg:text-[3.1rem]">
              About Webzivo
            </h2>
          </Reveal>

          <Reveal delay={90}>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              <p>
                Webzivo is a website design and development studio working with
                businesses in {siteConfig.country}. We build websites for
                restaurants, gyms, service companies, shops and professionals —
                businesses that need a credible online presence and a simple way
                for customers to reach them.
              </p>
              <p>
                Every project starts with understanding what the business
                actually does and who it serves. We design and build around
                that, rather than fitting a business into a layout that was
                made for someone else.
              </p>
              <p>
                The focus is on fundamentals that hold up over time: fast
                loading, mobile layouts that genuinely work, content people can
                scan quickly, and a structure that can be extended after launch.
              </p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {FOCUS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-muted"
                >
                  <Icon
                    name="check"
                    className="mt-0.5 size-4 shrink-0 text-accent"
                    strokeWidth={2.5}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Location panel */}
        <Reveal delay={120}>
          <div className="relative overflow-hidden rounded-card border border-line bg-white p-8 sm:p-10">
            <div
              aria-hidden="true"
              className="grid-texture-light pointer-events-none absolute inset-0 opacity-70"
            />

            <div className="relative">
              <span className="grid size-12 place-items-center rounded-xl bg-ink text-white">
                <Icon name="mapPin" className="size-6" strokeWidth={1.4} />
              </span>

              <p className="eyebrow mt-7 text-muted">Based in</p>
              {/* Slightly smaller than a section heading so the two-part
                  label stays on one line on narrow screens. */}
              <p className="display mt-2 text-[1.75rem] text-ink sm:text-[2.1rem]">
                <LocationLink />
              </p>

              {siteConfig.address ? (
                <p className="mt-2 text-[0.9375rem] text-muted">
                  {siteConfig.address}
                </p>
              ) : null}

              <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-muted">
                Working with businesses across {siteConfig.country}, in English,
                Arabic, or both.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-7">
                <ButtonLink href="/#contact" size="sm" withArrow>
                  Get Your Website
                </ButtonLink>

                {/* Directions button appears only once a real Maps link is set. */}
                {siteConfig.isMapsConfigured ? (
                  <ButtonLink
                    href={siteConfig.mapsUrl}
                    size="sm"
                    variant="outline"
                  >
                    <Icon name="mapPin" className="size-4" />
                    Get Directions
                  </ButtonLink>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

import { Icon } from "@/components/icons";
import { BrowserFrame, PhoneFrame } from "@/components/previews/Frames";
import { MobileSitePreview } from "@/components/previews/MobilePreview";
import { SitePreview } from "@/components/previews/SitePreview";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";

const HIGHLIGHTS = [
  "Mobile-first build",
  "Built for search",
  "Yours to grow",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      {/* Soft grid texture that fades out toward the bottom of the section. */}
      <div
        aria-hidden="true"
        className="grid-texture-light pointer-events-none absolute inset-0 [mask-image:radial-gradient(90%_70%_at_50%_0%,#000,transparent)]"
      />

      <Container className="relative">
        <div className="grid items-center gap-14 py-14 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:py-24">
          {/* ── Copy ───────────────────────────────────────────────────── */}
          <div className="min-w-0 max-w-2xl">
            <Reveal>
              <p className="eyebrow inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-3.5 py-2 text-muted shadow-[0_1px_2px_rgba(10,10,11,0.04)]">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-accent"
                />
                {siteConfig.heroEyebrow}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="display mt-7 text-[2.5rem] sm:text-[3.4rem] lg:text-[3.85rem]">
                Build a Website That Makes Your Business{" "}
                {/* The accent underline draws the eye to the payoff word. */}
                <span className="relative whitespace-nowrap">
                  Stand Out
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 320 16"
                    preserveAspectRatio="none"
                    className="absolute -bottom-1 left-0 h-[0.42em] w-full text-accent"
                  >
                    <path
                      d="M3 11c62-6 128-8 190-6 42 1 84 4 124 8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                .
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
                Webzivo creates modern, fast, and mobile-friendly websites for
                restaurants, gyms, service businesses, and growing brands.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="/#contact" size="lg" withArrow>
                  Get Your Website
                </ButtonLink>
                <ButtonLink href="/work" size="lg" variant="outline">
                  View Our Work
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
                {HIGHLIGHTS.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted"
                  >
                    <Icon
                      name="check"
                      className="size-4 shrink-0 text-accent"
                      strokeWidth={2.5}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* ── Device composition ─────────────────────────────────────── */}
          <Reveal delay={200} className="relative min-w-0">
            {/* Extra right padding on large screens leaves room for the phone. */}
            <div className="relative mx-auto max-w-xl lg:mr-0 lg:max-w-none lg:pl-20">
              <BrowserFrame url={`${siteConfig.displayDomain}/work/restaurant-demo`}>
                <div className="aspect-[16/11]">
                  <SitePreview variant="restaurant" />
                </div>
              </BrowserFrame>

              {/* Overlapping phone. Shown from lg up, where the left padding
                  above leaves room for it to sit alongside the browser rather
                  than on top of its content. */}
              <PhoneFrame className="absolute -bottom-12 left-0 hidden w-[24%] max-w-[150px] lg:block">
                <MobileSitePreview />
              </PhoneFrame>

              {/* Honest labelling: these are concept designs, not client work. */}
              <span className="absolute -top-3 right-3 rounded-full border border-line bg-white/95 px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted shadow-sm backdrop-blur">
                Demo Project
              </span>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

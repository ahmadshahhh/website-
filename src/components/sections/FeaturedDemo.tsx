import { Icon } from "@/components/icons";
import { BrowserFrame } from "@/components/previews/Frames";
import { SitePreview, previewUrl } from "@/components/previews/SitePreview";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Section } from "@/components/ui/Section";
import { featuredProjectSlug, getProject, projects } from "@/config/projects";
import { siteConfig } from "@/config/site";

/**
 * Large showcase for one project.
 *
 * Change `featuredProjectSlug` in src/config/projects.ts to feature a
 * different project. Once a project has a `liveUrl`, the button below opens
 * the real site instead of the in-site case study.
 */
export function FeaturedDemo() {
  const project = getProject(featuredProjectSlug) ?? projects[0];

  return (
    <Section tone="dark" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="grid-texture pointer-events-none absolute inset-0 [mask-image:radial-gradient(75%_60%_at_70%_40%,#000,transparent)]"
      />

      <div className="relative grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        {/* Copy. min-w-0 keeps this grid item from being widened by its own
            content - without it the track grows past the viewport and the
            section's overflow-hidden clips the result. */}
        <div className="min-w-0">
          <Reveal>
            <Eyebrow tone="dark">
              {project.isDemo ? "Featured Demo" : "Featured Project"}
            </Eyebrow>

            <h2 className="display heading-fluid mt-5 text-white">
              {project.title}
              {project.isDemo ? " Demo" : ""}
            </h2>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-dark sm:text-lg">
              {project.description}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {project.features.slice(0, 4).map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-muted-dark"
                >
                  <Icon
                    name="check"
                    className="mt-1 size-4 shrink-0 text-accent-bright"
                    strokeWidth={2.5}
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <ButtonLink
                href="/work"
                variant="inverse"
                size="lg"
                withArrow
                wrap
                className="w-full sm:w-auto"
              >
                See What Your Business Could Look Like
              </ButtonLink>
              <ButtonLink
                href="/#contact"
                variant="inverseOutline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Request a Similar Website
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        {/* Preview */}
        <Reveal delay={140} className="min-w-0">
          <BrowserFrame
            tone="dark"
            url={`${siteConfig.displayDomain}/work/${previewUrl(project.preview)}`}
          >
            <div className="aspect-[16/11]">
              <SitePreview variant={project.preview} />
            </div>
          </BrowserFrame>
        </Reveal>
      </div>
    </Section>
  );
}

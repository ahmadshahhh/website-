import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { SitePreview } from "@/components/previews/SitePreview";
import { Reveal } from "@/components/ui/Reveal";
import type { Project } from "@/config/projects";

/**
 * Portfolio card, shared by the home page and /work.
 *
 * Renders the built-in CSS mockup unless the project has a real screenshot at
 * `image`, in which case that is used instead. Demo projects are always
 * labelled as such.
 */
export function ProjectCard({
  project,
  delay = 0,
}: {
  project: Project;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_22px_54px_-28px_rgba(10,10,11,0.35)]">
        {/* Preview */}
        <div className="relative border-b border-line bg-paper-soft p-4">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-white">
            {project.image ? (
              <Image
                src={project.image}
                alt={`Screenshot of the ${project.title} homepage`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            ) : (
              <div className="absolute inset-0 origin-top transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                <SitePreview variant={project.preview} />
              </div>
            )}
          </div>

        </div>

        {/* Copy */}
        <div className="flex grow flex-col p-6">
          {/* The demo label sits beside the category rather than on top of the
              preview, so it never covers the design it is describing. */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
            <span className="eyebrow text-muted">{project.category}</span>
            {project.isDemo ? (
              <>
                <span aria-hidden="true" className="text-line-strong">
                  /
                </span>
                <span className="eyebrow inline-flex items-center gap-1.5 text-accent-text">
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-accent"
                  />
                  Demo Project
                </span>
              </>
            ) : null}
          </div>

          <h3 className="mt-3 text-xl font-bold tracking-[-0.015em] text-ink">
            {/* Stretched link makes the whole card clickable while keeping a
                single, correctly-labelled anchor for assistive technology. */}
            <Link
              href={`/work/${project.slug}`}
              className="before:absolute before:inset-0 before:content-['']"
            >
              {project.title}
            </Link>
          </h3>

          <p className="mt-2.5 grow text-[0.9375rem] leading-relaxed text-muted">
            {project.summary}
          </p>

          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
            View Project
            <Icon
              name="arrowRight"
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </span>
        </div>
      </article>
    </Reveal>
  );
}

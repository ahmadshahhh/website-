import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { Icon } from "@/components/icons";
import { BrowserFrame } from "@/components/previews/Frames";
import { SitePreview, previewUrl } from "@/components/previews/SitePreview";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getProject, projects } from "@/config/projects";

type Params = { params: Promise<{ slug: string }> };

/** Pre-renders every project at build time - each one is a static page. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project not found" };

  const title = project.isDemo
    ? `${project.title} (Demo Project)`
    : project.title;

  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title,
      description: project.summary,
      url: `/work/${project.slug}`,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const otherProjects = projects
    .filter((candidate) => candidate.slug !== project.slug)
    .slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={project.category}
        title={project.title}
        description={project.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Work", href: "/work" },
          { label: project.title, href: `/work/${project.slug}` },
        ]}
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.isDemo ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-soft px-3.5 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-accent"
              />
              Demo Project
            </span>
          ) : (
            <>
              {project.clientName ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-soft px-3.5 py-2 text-sm font-medium text-ink">
                  {project.clientName}
                </span>
              ) : null}
              {project.year ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-soft px-3.5 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                  {project.year}
                </span>
              ) : null}
            </>
          )}
        </div>
      </PageHeader>

      {/* Preview */}
      <Section bordered={false} className="pb-0 pt-12 sm:pt-16">
        <Reveal>
          <BrowserFrame url={`webzivo.com/work/${previewUrl(project.preview)}`}>
            <div className="relative aspect-[16/11]">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`Screenshot of the ${project.title} homepage`}
                  fill
                  priority
                  sizes="(max-width: 1220px) 100vw, 1220px"
                  className="object-cover object-top"
                />
              ) : (
                <SitePreview variant={project.preview} />
              )}
            </div>
          </BrowserFrame>
        </Reveal>

        {project.isDemo ? (
          <p className="mt-4 text-center text-sm text-muted">
            Concept design created by Webzivo to demonstrate a{" "}
            {project.category.toLowerCase()} website. Not a real business.
          </p>
        ) : null}
      </Section>

      {/* Detail */}
      <Section bordered={false}>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="display text-[1.75rem] sm:text-[2.1rem]">
                About this project
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                {project.description}
              </p>
            </Reveal>

            <Reveal delay={90}>
              <h3 className="mt-12 text-lg font-bold tracking-[-0.015em] text-ink">
                What it includes
              </h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-muted"
                  >
                    <Icon
                      name="check"
                      className="mt-0.5 size-4 shrink-0 text-accent"
                      strokeWidth={2.5}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Sidebar */}
          <Reveal delay={120}>
            <div className="lg:sticky lg:top-24">
              <div className="rounded-card border border-line bg-paper-soft p-7 sm:p-8">
                <h3 className="eyebrow text-muted">Pages included</h3>
                <ul className="mt-5 space-y-2.5">
                  {project.pages.map((page, index) => (
                    <li
                      key={page}
                      className="flex items-center gap-3 text-[0.9375rem] text-ink"
                    >
                      <span className="font-mono text-xs text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {page}
                    </li>
                  ))}
                </ul>

                <dl className="mt-7 space-y-3 border-t border-line pt-6 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted">Category</dt>
                    <dd className="font-semibold text-ink">
                      {project.category}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted">Status</dt>
                    <dd className="font-semibold text-ink">
                      {project.isDemo ? "Demo project" : "Live client website"}
                    </dd>
                  </div>
                </dl>

                <div className="mt-7 flex flex-col gap-3 border-t border-line pt-6">
                  {/* Pre-selects the matching option in the contact form. */}
                  <ButtonLink
                    href={`/?type=${encodeURIComponent(project.enquiryType)}#contact`}
                    withArrow
                  >
                    Request This Website
                  </ButtonLink>

                  {project.liveUrl ? (
                    <ButtonLink href={project.liveUrl} variant="outline">
                      Visit Live Site
                      <Icon name="arrowUpRight" className="size-4" />
                    </ButtonLink>
                  ) : null}

                  <Link
                    href="/work"
                    className="mt-1 text-center text-sm font-medium text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
                  >
                    Back to all projects
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* More projects */}
      <Section tone="soft">
        <SectionHeading eyebrow="More Work" title="Other projects" />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((other, index) => (
            <li key={other.slug}>
              <ProjectCard project={other} delay={index * 90} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

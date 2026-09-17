import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icons";
import { BrowserFrame } from "@/components/previews/Frames";
import { SitePreview, previewUrl } from "@/components/previews/SitePreview";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { featuredProjectSlug, getProject, projects } from "@/config/projects";
import { getService, services } from "@/config/services";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return { title: "Service not found" };

  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | Webzivo`,
      description: service.description,
      url: `/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  // Show the demo that best matches this service.
  const relatedProject =
    projects.find((project) => project.enquiryType === service.enquiryType) ??
    getProject(featuredProjectSlug) ??
    projects[0];

  const otherServices = services.filter(
    (candidate) => candidate.slug !== service.slug,
  );

  return (
    <>
      <PageHeader
        eyebrow="Service"
        title={service.title}
        description={service.intro}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/#services" },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink
            href={`/?type=${encodeURIComponent(service.enquiryType)}#contact`}
            size="lg"
            withArrow
          >
            Request This Website
          </ButtonLink>
          <ButtonLink href="/work" size="lg" variant="outline">
            View Our Work
          </ButtonLink>
        </div>
      </PageHeader>

      <Section bordered={false}>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* What's included */}
          <div>
            <Reveal>
              <span className="grid size-14 place-items-center rounded-xl border border-line bg-paper-soft text-ink">
                <Icon name={service.icon} className="size-7" strokeWidth={1.4} />
              </span>

              <h2 className="display mt-7 text-[1.75rem] sm:text-[2.1rem]">
                What&apos;s included
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                A typical {service.title.toLowerCase().replace(/ websites?$/, "")}{" "}
                project covers the following. Everything can be adjusted to suit
                your business.
              </p>
            </Reveal>

            <Reveal delay={90}>
              <ul className="mt-8 space-y-3.5">
                {service.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-muted"
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

          {/* Related demo */}
          <Reveal delay={120} className="min-w-0">
            <div className="lg:sticky lg:top-24">
              <p className="eyebrow mb-4 flex items-center gap-2 text-muted">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-accent"
                />
                Example layout
              </p>

              <BrowserFrame
                url={`webzivo.com/work/${previewUrl(relatedProject.preview)}`}
              >
                <div className="aspect-[16/11]">
                  <SitePreview variant={relatedProject.preview} />
                </div>
              </BrowserFrame>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted">
                  {relatedProject.isDemo ? "Demo project" : "Client project"} —{" "}
                  {relatedProject.title}
                </p>
                <Link
                  href={`/work/${relatedProject.slug}`}
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink"
                >
                  View project
                  <Icon
                    name="arrowRight"
                    className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Other services */}
      <Section tone="soft">
        <SectionHeading
          eyebrow="Services"
          title="Other things we build"
          description="Not quite what you're after? We build these too."
        />

        <ul className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {otherServices.map((other, index) => (
            <li key={other.slug} className="bg-white">
              <Reveal delay={(index % 3) * 70}>
                <Link
                  href={`/services/${other.slug}`}
                  className="group flex h-full flex-col p-7 transition-colors duration-300 hover:bg-paper-soft"
                >
                  <span className="grid size-11 place-items-center rounded-xl border border-line bg-paper-soft text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                    <Icon name={other.icon} className="size-5" strokeWidth={1.4} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold tracking-[-0.015em] text-ink">
                    {other.title}
                  </h3>
                  <p className="mt-2 grow text-[0.9375rem] leading-relaxed text-muted">
                    {other.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                    Learn more
                    <Icon
                      name="arrowRight"
                      className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner />
    </>
  );
}

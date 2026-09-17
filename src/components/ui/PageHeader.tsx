import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";

export type Crumb = { label: string; href: string };

/** Shared header for sub-pages, with breadcrumbs and matching SEO markup. */
export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs: Crumb[];
  children?: ReactNode;
}) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `${siteConfig.url}${crumb.href}`,
    })),
  };

  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      <div
        aria-hidden="true"
        className="grid-texture-light pointer-events-none absolute inset-0 [mask-image:radial-gradient(85%_70%_at_50%_0%,#000,transparent)]"
      />

      <Container className="relative">
        <div className="py-12 sm:py-16 lg:py-20">
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
                {breadcrumbs.map((crumb, index) => {
                  const isLast = index === breadcrumbs.length - 1;
                  return (
                    <li key={crumb.href} className="flex items-center gap-1.5">
                      {isLast ? (
                        <span aria-current="page" className="text-ink">
                          {crumb.label}
                        </span>
                      ) : (
                        <Link
                          href={crumb.href}
                          className="transition-colors hover:text-ink"
                        >
                          {crumb.label}
                        </Link>
                      )}
                      {!isLast ? (
                        <Icon
                          name="chevronDown"
                          className="size-3.5 -rotate-90 text-line-strong"
                          aria-hidden="true"
                        />
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </Reveal>

          <div className="mt-8 max-w-3xl">
            <Reveal delay={60}>
              {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
              <h1 className="display mt-5 text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem]">
                {title}
              </h1>
              {description ? (
                <p className="mt-6 text-lg leading-relaxed text-muted">
                  {description}
                </p>
              ) : null}
            </Reveal>
          </div>

          {children ? <Reveal delay={140}>{children}</Reveal> : null}
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}

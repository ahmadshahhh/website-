import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { projects } from "@/config/projects";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Examples of websites Webzivo can create for restaurants, gyms, service businesses, cafés, shops and online stores in Kuwait.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const demoCount = projects.filter((project) => project.isDemo).length;

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Our Work"
        description="Explore examples of websites Webzivo can create for different types of businesses."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Work", href: "/work" },
        ]}
      >
        {demoCount > 0 ? (
          <p className="mt-8 inline-flex max-w-2xl items-start gap-2.5 rounded-lg border border-line bg-paper-soft px-4 py-3 text-sm leading-relaxed text-muted">
            <span
              aria-hidden="true"
              className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
            />
            <span>
              {demoCount === projects.length ? "Every project here is a " : "Projects marked "}
              <strong className="font-semibold text-ink">demo</strong> — a
              concept design built to show what Webzivo can create, not client
              work. Real client projects will be added here with their
              permission.
            </span>
          </p>
        ) : null}
      </PageHeader>

      <Section bordered={false}>
        <h2 className="sr-only">Projects</h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <ProjectCard project={project} delay={(index % 3) * 90} />
            </li>
          ))}
        </ul>
      </Section>

      <Container>
        <div className="border-t border-line" />
      </Container>

      <CtaBanner />
    </>
  );
}

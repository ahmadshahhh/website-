import { ProjectCard } from "@/components/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { projects } from "@/config/projects";

export function WorkPreview() {
  return (
    <Section id="work" tone="light">
      <SectionHeading
        eyebrow="Our Work"
        title="Our Work"
        description="Explore examples of websites Webzivo can create for different types of businesses."
      />

      <Reveal delay={80}>
        <p className="mt-6 inline-flex max-w-2xl items-start gap-2.5 rounded-lg border border-line bg-paper-soft px-4 py-3 text-sm leading-relaxed text-muted">
          <span
            aria-hidden="true"
            className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
          />
          <span>
            Every project below is a <strong className="font-semibold text-ink">demo</strong> —
            a concept design built to show what Webzivo can create. They are not
            client work.
          </span>
        </p>
      </Reveal>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <ProjectCard project={project} delay={(index % 3) * 90} />
          </li>
        ))}
      </ul>

      <Reveal delay={100}>
        <div className="mt-12 flex justify-center">
          <ButtonLink href="/work" variant="outline" size="lg" withArrow>
            View All Projects
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}

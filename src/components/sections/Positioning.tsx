import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { capabilities, positioning } from "@/config/capabilities";

/**
 * Establishes, within one screen of the hero, where Webzivo is, who it builds
 * for, and what a website actually includes. Content lives in
 * src/config/capabilities.ts.
 */
export function Positioning() {
  return (
    <Section id="what-we-do" tone="dark" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="grid-texture pointer-events-none absolute inset-0 [mask-image:radial-gradient(80%_60%_at_50%_0%,#000,transparent)]"
      />

      <div className="relative">
        <SectionHeading
          eyebrow={positioning.eyebrow}
          title={positioning.title}
          description={positioning.description}
          tone="dark"
        />

        {/* Eight items divide evenly at every breakpoint, so the shared-hairline
            grid never shows an empty cell. */}
        <ul className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-ink-line bg-ink-line lg:grid-cols-4">
          {capabilities.map((capability, index) => (
            <li key={capability.label} className="bg-ink">
              <Reveal delay={(index % 4) * 60}>
                <div className="group flex h-full items-center gap-3 p-5 transition-colors duration-300 hover:bg-ink-900 sm:gap-3.5 sm:p-6">
                  <Icon
                    name={capability.icon}
                    className="size-5 shrink-0 text-accent-bright"
                    strokeWidth={1.5}
                  />
                  <span className="text-[0.9375rem] font-medium leading-snug text-white">
                    {capability.label}
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

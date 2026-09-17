import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type Tone = "light" | "soft" | "dark";

const TONES: Record<Tone, string> = {
  light: "bg-paper text-ink",
  soft: "bg-paper-soft text-ink",
  dark: "bg-ink text-white",
};

/** A full-width page section with consistent vertical rhythm. */
export function Section({
  id,
  tone = "light",
  bordered = true,
  className,
  containerClassName,
  children,
}: {
  id?: string;
  tone?: Tone;
  /** Hairline rule along the top edge, tying sections into one grid. */
  bordered?: boolean;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-20 sm:py-24 lg:py-28",
        TONES[tone],
        bordered && (tone === "dark" ? "border-t border-ink-line" : "border-t border-line"),
        className,
      )}
      // Anchor targets need to clear the sticky header.
      style={id ? { scrollMarginTop: "5rem" } : undefined}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/** Small uppercase label that sits above a section heading. */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-2",
        tone === "dark" ? "text-accent-bright" : "text-muted",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="inline-block size-1.5 rounded-full bg-accent"
      />
      {children}
    </span>
  );
}

/** Eyebrow + heading + supporting copy, used at the top of most sections. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  className,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: Tone;
  align?: "left" | "center";
  className?: string;
  /** Optional actions rendered beneath the copy. */
  children?: ReactNode;
}) {
  return (
    <Reveal
      className={cn(
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "display mt-5 text-[2rem] sm:text-[2.6rem] lg:text-[3.1rem]",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-relaxed sm:text-lg",
            align === "center" && "mx-auto",
            tone === "dark" ? "text-muted-dark" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </Reveal>
  );
}

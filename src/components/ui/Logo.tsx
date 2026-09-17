import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Webzivo wordmark. The mark is a geometric "W" drawn as a single stroke —
 * it reads clearly at favicon size as well as in the header.
 */
export function Logo({
  tone = "dark",
  className,
  href = "/",
}: {
  /** "dark" = dark text on light background. "light" = the inverse. */
  tone?: "dark" | "light";
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-lg",
        className,
      )}
      aria-label="Webzivo — home"
    >
      <span
        className={cn(
          "relative grid size-9 shrink-0 place-items-center rounded-[10px] transition-transform duration-200 group-hover:-rotate-3",
          tone === "dark" ? "bg-ink text-white" : "bg-white text-ink",
        )}
      >
        <svg
          viewBox="0 0 32 32"
          className="size-[22px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 10.5 10.4 22 16 14.2 21.6 22 26 10.5" />
        </svg>
        <span
          aria-hidden="true"
          className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-accent-bright ring-2 ring-paper"
        />
      </span>
      <span
        className={cn(
          "text-[1.35rem] font-extrabold tracking-[-0.035em]",
          tone === "dark" ? "text-ink" : "text-white",
        )}
      >
        Webzivo
      </span>
    </Link>
  );
}

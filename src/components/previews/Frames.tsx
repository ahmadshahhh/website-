import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Browser and phone chrome used to present the site previews. Drawn in CSS so
 * there are no image assets to load and everything stays crisp at any size.
 */

export function BrowserFrame({
  url,
  children,
  tone = "light",
  className,
}: {
  /** Shown in the address bar. Prefixed with the site name automatically. */
  url?: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-card border shadow-[0_24px_70px_-32px_rgba(10,10,11,0.45)]",
        isDark ? "border-ink-line bg-ink-900" : "border-line bg-white",
        className,
      )}
    >
      {/* Browser chrome */}
      <div
        className={cn(
          "flex items-center gap-3 border-b px-3.5 py-2.5",
          isDark ? "border-ink-line bg-ink-800" : "border-line bg-paper-soft",
        )}
      >
        <div className="flex shrink-0 gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className={cn(
                "size-2.5 rounded-full",
                isDark ? "bg-ink-700" : "bg-line-strong",
              )}
            />
          ))}
        </div>
        {url ? (
          <div
            className={cn(
              // min-w-0 lets the nowrap URL shrink and truncate instead of
              // forcing the whole frame (and its grid track) wider.
              "mx-auto flex min-w-0 max-w-[70%] items-center gap-1.5 truncate rounded-full border px-3 py-1 font-mono text-[11px]",
              isDark
                ? "border-ink-line bg-ink-900 text-muted-dark"
                : "border-line bg-white text-muted",
            )}
          >
            <svg
              viewBox="0 0 24 24"
              className="size-3 shrink-0 opacity-60"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            <span className="min-w-0 truncate">{url}</span>
          </div>
        ) : null}
        {/* Balances the traffic-light dots so the URL stays centred. */}
        <div className="w-[34px] shrink-0" aria-hidden="true" />
      </div>

      <div className="relative">{children}</div>
    </div>
  );
}

export function PhoneFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[2rem] border-[6px] border-ink bg-ink shadow-[0_28px_60px_-24px_rgba(10,10,11,0.6)]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[1.5rem] bg-white">
        {/* Status bar notch */}
        <div
          className="absolute left-1/2 top-1.5 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-ink/70"
          aria-hidden="true"
        />
        {children}
      </div>
    </div>
  );
}

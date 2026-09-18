import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Webzivo logo lockup.
 *
 * The supplied brand asset (public/logo.jpeg) is a square, stacked lockup:
 * monogram over "WEBZIVO" over "WEB DESIGN AGENCY" over "ESTD. 2026". At the
 * ~40px height a site header allows, those last two lines render around 2px
 * tall and turn to mush, and the artwork's light-grey backdrop shows as a box
 * against the white header.
 *
 * So the header uses a horizontal lockup built from that same artwork: the
 * monogram and the WEBZIVO wordmark, each cropped out and given a transparent
 * background (see scripts/generate-logo-assets.py). Both stay legible at
 * header size, and the full original is still shipped at public/logo.jpeg for
 * social cards and search-engine metadata.
 */
export function Logo({
  tone = "dark",
  className,
  href = "/",
}: {
  /** "dark" = black artwork for light backgrounds. "light" = the inverse. */
  tone?: "dark" | "light";
  className?: string;
  href?: string;
}) {
  // The artwork is black, so dark surfaces get it flipped to solid white.
  // brightness-0 flattens any anti-aliased greys before inverting, which keeps
  // the edges clean rather than muddy.
  const inkClass = tone === "light" ? "brightness-0 invert" : "";

  return (
    <Link
      href={href}
      aria-label="Webzivo — home"
      className={cn(
        "group inline-flex shrink-0 items-center gap-2.5 rounded-lg transition-opacity duration-200 hover:opacity-70",
        className,
      )}
    >
      {/* Both images are decorative: the link's aria-label carries the name,
          so alt="" avoids it being announced three times over. */}
      <Image
        src="/logo-mark.png"
        alt=""
        width={410}
        height={363}
        priority
        className={cn("h-9 w-auto sm:h-10", inkClass)}
      />
      <Image
        src="/logo-wordmark.png"
        alt=""
        width={291}
        height={49}
        priority
        className={cn("h-[14px] w-auto sm:h-4", inkClass)}
      />
    </Link>
  );
}

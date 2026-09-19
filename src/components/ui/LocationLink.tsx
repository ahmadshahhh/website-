import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * The business location, linked to the Google Maps listing.
 *
 * Used in the footer, the about section and the contact card so the label and
 * the link stay identical everywhere — change `LOCATION_LABEL` or the Maps URL
 * in src/config/site.ts and all three update together.
 */
export function LocationLink({ className }: { className?: string }) {
  return (
    <a
      href={siteConfig.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "underline-offset-4 transition-colors hover:underline",
        className,
      )}
    >
      {siteConfig.locationLabel}
    </a>
  );
}

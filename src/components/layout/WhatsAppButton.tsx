import Link from "next/link";
import { Icon } from "@/components/icons";
import { siteConfig, whatsAppLink } from "@/config/site";

/**
 * Floating WhatsApp contact button.
 *
 * The number comes from NEXT_PUBLIC_WHATSAPP_NUMBER (see .env.example). Until
 * that is set, the button deliberately falls back to the on-page contact form
 * rather than opening a wa.me link for a number that does not exist.
 */
export function WhatsAppButton() {
  const isConfigured = siteConfig.isWhatsAppConfigured;
  const href = whatsAppLink();

  const label = isConfigured ? "Chat on WhatsApp" : "Contact Webzivo";

  const sharedClassName =
    "group flex items-center gap-0 rounded-full bg-whatsapp py-3.5 pl-3.5 pr-3.5 text-white " +
    "shadow-[0_10px_30px_-8px_rgba(18,130,63,0.55)] transition-all duration-300 ease-out " +
    "hover:gap-2.5 hover:pr-5 hover:shadow-[0_14px_36px_-8px_rgba(18,130,63,0.7)] " +
    "focus-visible:gap-2.5 focus-visible:pr-5 active:scale-95";

  const inner = (
    <>
      <Icon name="whatsapp" className="size-6 shrink-0" />
      {/* Label expands on hover/focus on pointer devices; hidden on small screens. */}
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-[0.9375rem] font-semibold transition-[max-width] duration-300 ease-out group-hover:max-w-[12rem] group-focus-visible:max-w-[12rem] sm:block">
        {label}
      </span>
    </>
  );

  return (
    <aside
      aria-label="Quick contact"
      // env() keeps the button clear of the iOS home indicator and Safari's
      // bottom toolbar; both resolve to 0 elsewhere, so the offset is unchanged.
      className="fixed bottom-[calc(1.25rem_+_env(safe-area-inset-bottom))] right-[calc(1.25rem_+_env(safe-area-inset-right))] z-40 print:hidden"
    >
      {isConfigured ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={sharedClassName}
        >
          {inner}
        </a>
      ) : (
        <Link href={href} aria-label={label} className={sharedClassName}>
          {inner}
        </Link>
      )}

      {/* Development-only reminder. Never rendered in a production build. */}
      {process.env.NODE_ENV === "development" && !isConfigured ? (
        <p className="absolute bottom-full right-0 mb-2 w-56 rounded-lg border border-line bg-white p-2.5 text-[11px] leading-snug text-muted shadow-lg">
          <strong className="font-semibold text-ink">Dev note:</strong> set{" "}
          <code className="font-mono">NEXT_PUBLIC_WHATSAPP_NUMBER</code> in
          <code className="font-mono"> .env.local</code> to enable WhatsApp.
          Falls back to the contact form.
        </p>
      ) : null}
    </aside>
  );
}

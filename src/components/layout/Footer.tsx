import Link from "next/link";
import { Icon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { navItems } from "@/config/nav";
import { services } from "@/config/services";
import { siteConfig, whatsAppLink } from "@/config/site";

const CURRENT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink-line bg-ink text-white">
      <div className="grid-texture absolute inset-0 opacity-60" aria-hidden="true" />

      <Container className="relative">
        <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
          {/* Brand */}
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-muted-dark">
              {siteConfig.tagline}. Modern, mobile-friendly websites for
              businesses in {siteConfig.country}.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-labelledby="footer-nav-heading">
            <h2
              id="footer-nav-heading"
              className="eyebrow text-accent-bright"
            >
              Navigate
            </h2>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-muted-dark transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-labelledby="footer-services-heading">
            <h2
              id="footer-services-heading"
              className="eyebrow text-accent-bright"
            >
              Services
            </h2>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-[0.9375rem] text-muted-dark transition-colors hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="eyebrow text-accent-bright">Contact</h2>
            <ul className="mt-5 space-y-3.5">
              <li>
                <a
                  href={whatsAppLink()}
                  {...(siteConfig.isWhatsAppConfigured
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group inline-flex items-center gap-2.5 text-[0.9375rem] text-muted-dark transition-colors hover:text-white"
                >
                  <Icon name="whatsapp" className="size-4 shrink-0 text-accent-bright" />
                  WhatsApp
                </a>
              </li>

              {siteConfig.isEmailConfigured ? (
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-2.5 text-[0.9375rem] break-all text-muted-dark transition-colors hover:text-white"
                  >
                    <Icon name="mail" className="size-4 shrink-0 text-accent-bright" />
                    {siteConfig.email}
                  </a>
                </li>
              ) : (
                <li>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2.5 text-[0.9375rem] text-muted-dark transition-colors hover:text-white"
                  >
                    <Icon name="mail" className="size-4 shrink-0 text-accent-bright" />
                    Send a request
                  </Link>
                </li>
              )}

              <li className="flex items-start gap-2.5 text-[0.9375rem] text-muted-dark">
                <Icon name="mapPin" className="mt-0.5 size-4 shrink-0 text-accent-bright" />
                <span>
                  {siteConfig.address ? (
                    <>
                      {siteConfig.address}
                      <br />
                    </>
                  ) : null}
                  {siteConfig.country}
                  {siteConfig.isMapsConfigured ? (
                    <>
                      {" · "}
                      <a
                        href={siteConfig.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 transition-colors hover:text-white"
                      >
                        Directions
                      </a>
                    </>
                  ) : null}
                </span>
              </li>
            </ul>

            {/* Social links render only once real accounts are added to config. */}
            {siteConfig.socials.length > 0 ? (
              <ul className="mt-6 flex gap-3">
                {siteConfig.socials.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-dark transition-colors hover:text-white"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        {/* Oversized wordmark, purely decorative */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none overflow-hidden"
        >
          <span className="block translate-y-[18%] text-center text-[19vw] font-extrabold leading-none tracking-[-0.06em] text-white/[0.045]">
            Webzivo
          </span>
        </div>

        <div className="relative flex flex-col gap-3 border-t border-ink-line py-7 text-sm text-muted-dark sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {CURRENT_YEAR} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs tracking-wider uppercase">
            Website Design &amp; Development · {siteConfig.country}
          </p>
        </div>
      </Container>
    </footer>
  );
}

import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { navItems } from "@/config/nav";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="grid-texture-light pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent)]"
      />
      <Container className="relative">
        <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
          <p className="eyebrow text-muted">Error 404</p>
          <h1 className="display mt-6 text-[2.5rem] sm:text-[3.5rem]">
            This page doesn&apos;t exist.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            The page you were looking for may have been moved or removed. Here
            are some places to try instead.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/" size="lg" withArrow>
              Back to Home
            </ButtonLink>
            <ButtonLink href="/#contact" size="lg" variant="outline">
              Contact Webzivo
            </ButtonLink>
          </div>

          <nav aria-label="Site sections" className="mt-12">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}

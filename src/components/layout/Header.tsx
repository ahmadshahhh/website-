"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { navItems, primaryCta } from "@/config/nav";
import { cn } from "@/lib/utils";

/**
 * Sticky site header.
 *
 * Sits flush at the top of the page and gains a hairline border, blur and a
 * soft shadow once the user scrolls — so it stays readable over content
 * without ever feeling heavy.
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Track scroll position for the header's "condensed" state.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes. Adjusting state during
  // render (rather than in an effect) avoids a second render pass and keeps
  // the menu from flashing open on the new page.
  const [menuPathname, setMenuPathname] = useState(pathname);
  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setIsMenuOpen(false);
  }

  // Lock background scrolling and allow Escape to dismiss the mobile menu.
  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        isScrolled || isMenuOpen
          ? "border-b border-line bg-white/85 shadow-[0_1px_20px_-8px_rgba(10,10,11,0.25)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/75"
          : "border-b border-transparent bg-paper",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
          <Logo />

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : !item.isAnchor && pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "relative rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors duration-200",
                        isActive
                          ? "text-ink"
                          : "text-muted hover:text-ink",
                      )}
                    >
                      {item.label}
                      {isActive ? (
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-3.5 -bottom-0.5 h-px bg-accent"
                        />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink
              href={primaryCta.href}
              size="sm"
              className="hidden sm:inline-flex"
            >
              {primaryCta.label}
            </ButtonLink>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-paper-soft lg:hidden"
            >
              <Icon name={isMenuOpen ? "close" : "menu"} className="size-5" />
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!isMenuOpen}
        className="border-t border-line bg-white lg:hidden"
      >
        <Container>
          <nav aria-label="Mobile" className="py-4">
            <ul className="flex flex-col">
              {navItems.map((item, index) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="flex items-center justify-between border-b border-line py-3.5 text-lg font-semibold text-ink transition-colors hover:text-muted"
                  >
                    {item.label}
                    <span className="eyebrow text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <ButtonLink
              href={primaryCta.href}
              onClick={closeMenu}
              size="lg"
              withArrow
              className="mt-5 w-full"
            >
              {primaryCta.label}
            </ButtonLink>
          </nav>
        </Container>
      </div>
    </header>
  );
}

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "outline"
  | "inverse"
  | "inverseOutline"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

/**
 * Layout-affecting utilities (display, whitespace, height) are chosen here
 * rather than accepted through `className`. Appending a competing utility to
 * `className` does not win the CSS conflict — the stylesheet's own order
 * decides — so a caller passing `whitespace-normal` alongside the base
 * `whitespace-nowrap` silently has no effect. That is how a long label once
 * grew a button to 385px inside a 350px column and clipped it.
 *
 * `max-w-full` is unconditional: a button must never be wider than whatever
 * contains it, regardless of label length.
 */
const BASE =
  "group/btn relative inline-flex max-w-full items-center justify-center gap-2 rounded-full font-semibold " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-55";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-white shadow-[0_1px_2px_rgba(10,10,11,0.18)] hover:bg-ink-800 hover:shadow-[0_10px_28px_-12px_rgba(10,10,11,0.6)]",
  outline:
    "bg-white text-ink border border-line-strong hover:border-ink hover:bg-paper-soft",
  inverse:
    "bg-white text-ink hover:bg-white/88 hover:shadow-[0_10px_28px_-12px_rgba(0,0,0,0.6)]",
  inverseOutline:
    "border border-white/25 text-white hover:border-white/50 hover:bg-white/10",
  ghost: "text-ink hover:bg-paper-dim",
};

/** Horizontal padding and type scale — independent of how tall the button is. */
const SIZES: Record<ButtonSize, string> = {
  sm: "px-4 text-sm",
  md: "px-6 text-[0.9375rem]",
  lg: "px-7 text-base",
};

/** Single-line buttons get a fixed height so rows of them align. */
const FIXED_HEIGHTS: Record<ButtonSize, string> = {
  sm: "h-10",
  md: "h-12",
  lg: "h-13",
};

/** Wrapping buttons grow instead, keeping the same minimum height. */
const WRAP_HEIGHTS: Record<ButtonSize, string> = {
  sm: "min-h-10 py-2.5",
  md: "min-h-12 py-3",
  lg: "min-h-13 py-3.5",
};

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Adds a trailing arrow that nudges right on hover. */
  withArrow?: boolean;
  /**
   * Allows the label to wrap onto multiple lines. Use for any label long
   * enough to exceed a phone's content width — otherwise the button keeps its
   * whole label on one line and pushes its container wider than the screen.
   */
  wrap?: boolean;
  className?: string;
  children: ReactNode;
};

function buttonClasses({
  variant = "primary",
  size = "md",
  wrap = false,
  className,
}: Pick<SharedProps, "variant" | "size" | "wrap" | "className">) {
  return cn(
    BASE,
    VARIANTS[variant],
    SIZES[size],
    wrap ? WRAP_HEIGHTS[size] : FIXED_HEIGHTS[size],
    wrap ? "whitespace-normal text-center" : "whitespace-nowrap",
    className,
  );
}

function Arrow() {
  return (
    <Icon
      name="arrowRight"
      className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover/btn:translate-x-1"
    />
  );
}

/** A link styled as a button. Use for navigation (including in-page anchors). */
export function ButtonLink({
  href,
  variant,
  size,
  withArrow,
  wrap,
  className,
  children,
  ...props
}: SharedProps &
  Omit<ComponentProps<typeof Link>, "href" | "className" | "children"> & {
    href: string;
  }) {
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        className={buttonClasses({ variant, size, wrap, className })}
        // Only add noopener/noreferrer for http(s) targets opened in a new tab.
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
        {withArrow ? <Arrow /> : null}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={buttonClasses({ variant, size, wrap, className })}
      {...props}
    >
      {children}
      {withArrow ? <Arrow /> : null}
    </Link>
  );
}

/** A real button element. Use for form submits and interactive controls. */
export function Button({
  variant,
  size,
  withArrow,
  wrap,
  className,
  children,
  ...props
}: SharedProps & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button
      className={buttonClasses({ variant, size, wrap, className })}
      {...props}
    >
      {children}
      {withArrow ? <Arrow /> : null}
    </button>
  );
}

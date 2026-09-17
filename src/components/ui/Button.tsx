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

const BASE =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-55";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-white shadow-[0_1px_2px_rgba(10,10,11,0.18)] hover:bg-ink-800 hover:shadow-[0_10px_28px_-12px_rgba(10,10,11,0.6)]",
  outline:
    "bg-white text-ink border border-line-strong hover:border-ink hover:bg-paper-soft",
  inverse: "bg-white text-ink hover:bg-white/88 hover:shadow-[0_10px_28px_-12px_rgba(0,0,0,0.6)]",
  inverseOutline:
    "border border-white/25 text-white hover:border-white/50 hover:bg-white/10",
  ghost: "text-ink hover:bg-paper-dim",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-13 px-7 text-base",
};

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Adds a trailing arrow that nudges right on hover. */
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
};

function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: Pick<SharedProps, "variant" | "size" | "className">) {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
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
        className={buttonClasses({ variant, size, className })}
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
      className={buttonClasses({ variant, size, className })}
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
  className,
  children,
  ...props
}: SharedProps & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={buttonClasses({ variant, size, className })} {...props}>
      {children}
      {withArrow ? <Arrow /> : null}
    </button>
  );
}

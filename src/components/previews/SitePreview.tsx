import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SITE PREVIEWS
 *
 * Miniature website layouts rendered in pure HTML + CSS — no screenshots, no
 * stock photography, nothing to download. They scale with their container
 * using container query units (cqw), so one component works as a small card
 * thumbnail and as a large featured panel.
 *
 * They are decorative: the whole preview is aria-hidden and every card that
 * uses one also carries a real text description.
 *
 * To swap in a real screenshot later, set `image` on the project in
 * src/config/projects.ts — the card renders that instead.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export type PreviewVariant =
  | "restaurant"
  | "gym"
  | "plumber"
  | "cafe"
  | "local"
  | "ecommerce";

type Palette = {
  bg: string;
  surface: string;
  text: string;
  muted: string;
  line: string;
  accent: string;
  accentText: string;
  /** Gradient used for the blocks standing in for photography. */
  media: string;
};

const THEMES: Record<PreviewVariant, Palette> = {
  restaurant: {
    bg: "#17120f",
    surface: "#211a16",
    text: "#f6efe7",
    muted: "#a89787",
    line: "#312720",
    accent: "#d9a441",
    accentText: "#17120f",
    media: "linear-gradient(135deg,#4a3527,#7c5638 55%,#c08b2c)",
  },
  gym: {
    bg: "#0c0c0e",
    surface: "#16161a",
    text: "#ffffff",
    muted: "#8f8f9c",
    line: "#26262e",
    accent: "#d8f651",
    accentText: "#0c0c0e",
    media: "linear-gradient(135deg,#1e1e24,#3a3a46 60%,#5b5b6b)",
  },
  plumber: {
    bg: "#ffffff",
    surface: "#f2f6fb",
    text: "#0d1b2a",
    muted: "#5f7285",
    line: "#dde6f0",
    accent: "#0f5da8",
    accentText: "#ffffff",
    media: "linear-gradient(135deg,#0f5da8,#2a86d8 60%,#8fc4ef)",
  },
  cafe: {
    bg: "#f5f0e7",
    surface: "#fffdf9",
    text: "#2a211a",
    muted: "#6d6052",
    line: "#e4dacb",
    accent: "#8a5a34",
    accentText: "#fffdf9",
    media: "linear-gradient(135deg,#c9a882,#8a5a34 70%,#4a3323)",
  },
  local: {
    bg: "#ffffff",
    surface: "#f7f8fa",
    text: "#101317",
    muted: "#68707c",
    line: "#e4e7ec",
    accent: "#101317",
    accentText: "#ffffff",
    media: "linear-gradient(135deg,#dfe3e9,#b9c0ca 60%,#8b93a0)",
  },
  ecommerce: {
    bg: "#ffffff",
    surface: "#f6f6f7",
    text: "#0a0a0b",
    muted: "#6d6d77",
    line: "#e6e6e9",
    accent: "#0a0a0b",
    accentText: "#ffffff",
    media: "linear-gradient(135deg,#ececed,#d6d6d9 60%,#b6b6bb)",
  },
};

type PreviewContent = {
  logo: string;
  links: string[];
  cta: string;
  url: string;
  body: ReactNode;
};

/* ── Small building blocks shared by every variant ────────────────────────── */

/** A block standing in for a photograph. */
function Media({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn("rounded-[1.2cqw] bg-[var(--p-media)]", className)}
      style={style}
    />
  );
}

/** A line of body text, abstracted to a bar. */
function TextBar({ w = "100%", dim }: { w?: string; dim?: boolean }) {
  return (
    <div
      className="h-[1.1cqw] rounded-full"
      style={{
        width: w,
        background: dim ? "var(--p-line)" : "var(--p-muted)",
        opacity: dim ? 1 : 0.45,
      }}
    />
  );
}

function Pill({ children, solid }: { children: ReactNode; solid?: boolean }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-[2.4cqw] py-[1.1cqw] text-[1.9cqw] font-semibold"
      style={
        solid
          ? { background: "var(--p-accent)", color: "var(--p-accent-text)" }
          : {
              border: "0.25cqw solid var(--p-line)",
              color: "var(--p-text)",
            }
      }
    >
      {children}
    </span>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return (
    <div
      className="text-[5.2cqw] font-extrabold leading-[1.05] tracking-[-0.03em]"
      style={{ color: "var(--p-text)" }}
    >
      {children}
    </div>
  );
}

function Sub({ children }: { children: ReactNode }) {
  return (
    <div
      className="text-[2.1cqw] leading-[1.5]"
      style={{ color: "var(--p-muted)" }}
    >
      {children}
    </div>
  );
}

function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("rounded-[1.4cqw] p-[2.2cqw]", className)}
      style={{
        background: "var(--p-surface)",
        border: "0.25cqw solid var(--p-line)",
      }}
    >
      {children}
    </div>
  );
}

/* ── Per-variant layouts ──────────────────────────────────────────────────── */

const CONTENT: Record<PreviewVariant, PreviewContent> = {
  restaurant: {
    logo: "MAIDA",
    links: ["Menu", "About", "Gallery", "Contact"],
    cta: "Book a Table",
    url: "restaurant-demo",
    body: (
      <>
        <div className="grid grid-cols-[1.1fr_0.9fr] gap-[3cqw] px-[4cqw] pt-[4cqw]">
          <div className="flex flex-col gap-[2cqw]">
            <Heading>
              Charcoal grill,
              <br />
              slow mornings.
            </Heading>
            <Sub>Seasonal plates and fresh bread, served all day.</Sub>
            <div className="flex gap-[1.6cqw] pt-[0.6cqw]">
              <Pill solid>Reserve</Pill>
              <Pill>View Menu</Pill>
            </div>
          </div>
          <Media className="h-[22cqw]" />
        </div>
        <div className="px-[4cqw] pt-[3.4cqw]">
          <div
            className="pb-[1.6cqw] text-[2cqw] font-bold tracking-[0.12em] uppercase"
            style={{ color: "var(--p-accent)" }}
          >
            Popular dishes
          </div>
          <div className="grid grid-cols-3 gap-[2cqw]">
            {[
              ["Mixed Grill", "4.500"],
              ["Saffron Rice", "2.750"],
              ["Grilled Sea Bass", "5.250"],
            ].map(([dish, price]) => (
              <Card key={dish}>
                <Media className="mb-[1.6cqw] h-[8cqw]" />
                <div
                  className="text-[2.1cqw] font-bold"
                  style={{ color: "var(--p-text)" }}
                >
                  {dish}
                </div>
                <div
                  className="mt-[0.6cqw] text-[1.9cqw]"
                  style={{ color: "var(--p-accent)" }}
                >
                  KD {price}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </>
    ),
  },

  gym: {
    logo: "IRONHAUS",
    links: ["Memberships", "Classes", "Trainers"],
    cta: "Free Trial",
    url: "gym-demo",
    body: (
      <>
        <div className="px-[4cqw] pt-[4.5cqw]">
          <Heading>
            TRAIN
            <br />
            WITHOUT
            <br />
            EXCUSES.
          </Heading>
          <div className="mt-[2cqw] flex items-center gap-[1.6cqw]">
            <Pill solid>Start Free Trial</Pill>
            <Sub>24/7 access · Salmiya</Sub>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-[2cqw] px-[4cqw] pt-[3.6cqw]">
          {[
            ["BASIC", "18", "Gym floor access"],
            ["PRO", "29", "Gym + all classes"],
            ["ELITE", "45", "Pro + coaching"],
          ].map(([tier, price, detail], index) => (
            <div
              key={tier}
              className="rounded-[1.4cqw] p-[2.2cqw]"
              style={{
                background: index === 1 ? "var(--p-accent)" : "var(--p-surface)",
                border: "0.25cqw solid var(--p-line)",
              }}
            >
              <div
                className="text-[1.9cqw] font-bold tracking-[0.12em]"
                style={{
                  color:
                    index === 1 ? "var(--p-accent-text)" : "var(--p-muted)",
                }}
              >
                {tier}
              </div>
              <div
                className="mt-[0.8cqw] text-[4.4cqw] font-extrabold leading-none tracking-[-0.03em]"
                style={{
                  color: index === 1 ? "var(--p-accent-text)" : "var(--p-text)",
                }}
              >
                {price}
                <span className="text-[1.8cqw] font-semibold"> KD</span>
              </div>
              <div
                className="mt-[1.2cqw] text-[1.8cqw]"
                style={{
                  color:
                    index === 1 ? "var(--p-accent-text)" : "var(--p-muted)",
                  opacity: index === 1 ? 0.75 : 1,
                }}
              >
                {detail}
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },

  plumber: {
    logo: "AQUAFIX",
    links: ["Services", "Areas", "Contact"],
    cta: "Call Now",
    url: "plumbing-demo",
    body: (
      <>
        <div className="grid grid-cols-[1.15fr_0.85fr] gap-[3cqw] px-[4cqw] pt-[4cqw]">
          <div className="flex flex-col gap-[1.8cqw]">
            <Heading>
              Leak fixed
              <br />
              today.
            </Heading>
            <Sub>Licensed plumbers across Kuwait. Same-day callouts.</Sub>
            <div className="flex gap-[1.6cqw] pt-[0.4cqw]">
              <Pill solid>Call Now</Pill>
              <Pill>Get a Quote</Pill>
            </div>
            <div className="flex flex-wrap gap-[1.2cqw] pt-[0.8cqw]">
              {["Salmiya", "Hawally", "Jabriya", "Kuwait City"].map((area) => (
                <span
                  key={area}
                  className="rounded-full px-[1.8cqw] py-[0.8cqw] text-[1.7cqw] font-medium"
                  style={{
                    background: "var(--p-surface)",
                    color: "var(--p-muted)",
                    border: "0.2cqw solid var(--p-line)",
                  }}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
          <Card className="flex flex-col gap-[1.6cqw]">
            <div
              className="text-[2.1cqw] font-bold"
              style={{ color: "var(--p-text)" }}
            >
              Our Services
            </div>
            {[
              "Leak detection & repair",
              "Water heater install",
              "Drain unblocking",
              "Bathroom fitting",
            ].map((service) => (
              <div key={service} className="flex items-center gap-[1.4cqw]">
                <span
                  className="size-[2.2cqw] shrink-0 rounded-[0.5cqw]"
                  style={{ background: "var(--p-accent)", opacity: 0.85 }}
                />
                <span
                  className="text-[1.9cqw]"
                  style={{ color: "var(--p-muted)" }}
                >
                  {service}
                </span>
              </div>
            ))}
          </Card>
        </div>
        <div className="px-[4cqw] pt-[3cqw]">
          <div
            className="flex items-center justify-between rounded-[1.4cqw] px-[2.6cqw] py-[2cqw]"
            style={{ background: "var(--p-accent)" }}
          >
            <span
              className="text-[2.4cqw] font-bold"
              style={{ color: "var(--p-accent-text)" }}
            >
              Emergency? We answer 24/7
            </span>
            <span
              className="rounded-full px-[2.2cqw] py-[1cqw] text-[1.9cqw] font-bold"
              style={{ background: "#fff", color: "var(--p-accent)" }}
            >
              WhatsApp
            </span>
          </div>
        </div>
      </>
    ),
  },

  cafe: {
    logo: "Nuqta",
    links: ["Menu", "Our Story", "Find Us"],
    cta: "Visit Us",
    url: "cafe-demo",
    body: (
      <>
        <div className="px-[4cqw] pt-[5cqw] text-center">
          <div
            className="text-[1.9cqw] font-semibold tracking-[0.2em] uppercase"
            style={{ color: "var(--p-accent)" }}
          >
            Specialty Coffee
          </div>
          <div className="mt-[1.6cqw]">
            <Heading>Roasted in small batches.</Heading>
          </div>
          <div className="mx-auto mt-[1.6cqw] max-w-[60%]">
            <Sub>Filter, espresso and something warm from the oven.</Sub>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_1fr] gap-[2.4cqw] px-[4cqw] pt-[3.4cqw]">
          <Media className="h-[19cqw]" />
          <Card className="flex flex-col gap-[1.5cqw]">
            <div
              className="text-[2.1cqw] font-bold"
              style={{ color: "var(--p-text)" }}
            >
              Today&apos;s Menu
            </div>
            {[
              ["Flat White", "1.750"],
              ["V60 Filter", "2.000"],
              ["Cardamom Bun", "1.250"],
              ["Date Cake", "1.500"],
            ].map(([item, price]) => (
              <div
                key={item}
                className="flex items-baseline justify-between gap-[1.2cqw]"
              >
                <span
                  className="text-[1.9cqw]"
                  style={{ color: "var(--p-muted)" }}
                >
                  {item}
                </span>
                <span
                  className="grow border-b-[0.2cqw] border-dotted"
                  style={{ borderColor: "var(--p-line)" }}
                />
                <span
                  className="text-[1.9cqw] font-semibold"
                  style={{ color: "var(--p-text)" }}
                >
                  {price}
                </span>
              </div>
            ))}
          </Card>
        </div>
      </>
    ),
  },

  local: {
    logo: "Meridian",
    links: ["Services", "About", "Contact"],
    cta: "Get in Touch",
    url: "business-demo",
    body: (
      <>
        <div className="grid grid-cols-[1.1fr_0.9fr] gap-[3cqw] px-[4cqw] pt-[4.5cqw]">
          <div className="flex flex-col gap-[1.8cqw]">
            <Heading>
              Practical help
              <br />
              for growing
              <br />
              businesses.
            </Heading>
            <Sub>Accounting, licensing and company setup in Kuwait.</Sub>
            <div className="flex gap-[1.6cqw] pt-[0.4cqw]">
              <Pill solid>Book a Consultation</Pill>
            </div>
          </div>
          <Card className="flex flex-col gap-[1.4cqw]">
            <div
              className="text-[2cqw] font-bold"
              style={{ color: "var(--p-text)" }}
            >
              Request a callback
            </div>
            {[70, 90, 60].map((w, index) => (
              <div
                key={index}
                className="rounded-[0.9cqw] px-[1.6cqw] py-[1.5cqw]"
                style={{
                  background: "var(--p-bg)",
                  border: "0.2cqw solid var(--p-line)",
                }}
              >
                <TextBar w={`${w}%`} dim />
              </div>
            ))}
            <div
              className="mt-[0.4cqw] rounded-full py-[1.4cqw] text-center text-[1.9cqw] font-bold"
              style={{
                background: "var(--p-accent)",
                color: "var(--p-accent-text)",
              }}
            >
              Send
            </div>
          </Card>
        </div>
        <div className="grid grid-cols-3 gap-[2cqw] px-[4cqw] pt-[3.2cqw]">
          {["Company Setup", "Bookkeeping", "Licensing"].map((title) => (
            <Card key={title}>
              <div
                className="mb-[1.2cqw] size-[3.4cqw] rounded-[0.9cqw]"
                style={{ background: "var(--p-media)" }}
              />
              <div
                className="text-[2cqw] font-bold"
                style={{ color: "var(--p-text)" }}
              >
                {title}
              </div>
              <div className="mt-[1.2cqw] flex flex-col gap-[0.8cqw]">
                <TextBar />
                <TextBar w="72%" />
              </div>
            </Card>
          ))}
        </div>
      </>
    ),
  },

  ecommerce: {
    logo: "ATELIER",
    links: ["Shop", "New In", "Sale"],
    cta: "Cart (2)",
    url: "store-demo",
    body: (
      <>
        <div className="px-[4cqw] pt-[3.6cqw]">
          <div
            className="flex items-center gap-[1.6cqw] rounded-full px-[2.4cqw] py-[1.5cqw]"
            style={{
              background: "var(--p-surface)",
              border: "0.22cqw solid var(--p-line)",
            }}
          >
            <span
              className="size-[2cqw] rounded-full"
              style={{ border: "0.28cqw solid var(--p-muted)" }}
            />
            <span
              className="text-[1.9cqw]"
              style={{ color: "var(--p-muted)" }}
            >
              Search products…
            </span>
          </div>
        </div>
        <div className="flex items-end justify-between px-[4cqw] pt-[3cqw]">
          <Heading>New arrivals</Heading>
          <div className="flex gap-[1.2cqw]">
            {["All", "Bags", "Shoes"].map((filter, index) => (
              <span
                key={filter}
                className="rounded-full px-[1.8cqw] py-[0.9cqw] text-[1.7cqw] font-semibold"
                style={
                  index === 0
                    ? {
                        background: "var(--p-accent)",
                        color: "var(--p-accent-text)",
                      }
                    : {
                        color: "var(--p-muted)",
                        border: "0.2cqw solid var(--p-line)",
                      }
                }
              >
                {filter}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-[1.8cqw] px-[4cqw] pt-[2.4cqw]">
          {[
            ["Canvas Tote", "24.000"],
            ["Leather Belt", "18.500"],
            ["Wool Scarf", "15.000"],
            ["Card Holder", "12.000"],
          ].map(([product, price]) => (
            <div key={product} className="flex flex-col gap-[1cqw]">
              <Media className="h-[11cqw]" />
              <div
                className="text-[1.8cqw] font-semibold"
                style={{ color: "var(--p-text)" }}
              >
                {product}
              </div>
              <div
                className="text-[1.7cqw]"
                style={{ color: "var(--p-muted)" }}
              >
                KD {price}
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
};

/**
 * Renders a scaled-down website layout for the given business category.
 * Purely decorative — hidden from assistive technology.
 */
export function SitePreview({
  variant,
  className,
}: {
  variant: PreviewVariant;
  className?: string;
}) {
  const theme = THEMES[variant];
  const content = CONTENT[variant];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative h-full w-full overflow-hidden [container-type:inline-size]",
        className,
      )}
      style={
        {
          background: theme.bg,
          "--p-bg": theme.bg,
          "--p-surface": theme.surface,
          "--p-text": theme.text,
          "--p-muted": theme.muted,
          "--p-line": theme.line,
          "--p-accent": theme.accent,
          "--p-accent-text": theme.accentText,
          "--p-media": theme.media,
        } as CSSProperties
      }
    >
      {/* Mini site navigation */}
      <div
        className="flex items-center justify-between px-[4cqw] py-[2.6cqw]"
        style={{ borderBottom: `0.22cqw solid ${theme.line}` }}
      >
        <span
          className="text-[2.7cqw] font-extrabold tracking-[-0.02em]"
          style={{ color: theme.text }}
        >
          {content.logo}
        </span>
        <div className="flex items-center gap-[2.4cqw]">
          {content.links.map((link) => (
            <span
              key={link}
              className="text-[1.9cqw] font-medium"
              style={{ color: theme.muted }}
            >
              {link}
            </span>
          ))}
          <span
            className="rounded-full px-[2.2cqw] py-[1cqw] text-[1.8cqw] font-bold"
            style={{ background: theme.accent, color: theme.accentText }}
          >
            {content.cta}
          </span>
        </div>
      </div>

      {content.body}
    </div>
  );
}

/** The URL slug shown in the browser chrome above a preview. */
export function previewUrl(variant: PreviewVariant): string {
  return CONTENT[variant].url;
}

import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

/**
 * Social share card, generated at build time. Appears when the site is shared
 * on WhatsApp, LinkedIn, X, Facebook and similar.
 */
export const alt = `${siteConfig.name} - ${siteConfig.tagline} in ${siteConfig.country}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0b",
          padding: "72px",
          // Faint grid, matching the dark sections of the site.
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      >
        {/* Logo lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "72px",
              height: "72px",
              borderRadius: "20px",
              background: "#ffffff",
            }}
          >
            <svg width="44" height="44" viewBox="0 0 32 32" fill="none">
              <path
                d="M6 10.5 10.4 22 16 14.2 21.6 22 26 10.5"
                stroke="#0a0a0b"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            style={{
              fontSize: "44px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.03em",
            }}
          >
            Webzivo
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "76px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              maxWidth: "940px",
            }}
          >
            Build a Website That Makes Your Business Stand Out.
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: "28px",
              color: "#9c9ca8",
              maxWidth: "820px",
              lineHeight: 1.4,
            }}
          >
            Modern, fast, mobile-friendly websites for restaurants, gyms and
            local businesses.
          </div>
        </div>

        {/* Footer strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            paddingTop: "28px",
            borderTop: "1px solid #2c2c34",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "999px",
              background: "#e0a93f",
            }}
          />
          <div
            style={{
              fontSize: "24px",
              color: "#e0a93f",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            {`Website Design & Development · ${siteConfig.country}`}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

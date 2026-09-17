import type { Metadata, Viewport } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { StructuredData } from "@/components/StructuredData";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { analytics, siteConfig } from "@/config/site";
import "./globals.css";

/**
 * Fonts are self-hosted by next/font at build time — no render-blocking
 * request to Google, no layout shift, and no third-party cookies.
 */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    "website design Kuwait",
    "web development Kuwait",
    "restaurant website design",
    "gym website design",
    "small business website",
    "e-commerce website Kuwait",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Web Design",
  ...(analytics.googleSiteVerification
    ? { verification: { google: analytics.googleSiteVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Lets Next.js keep route changes instant while in-page anchors scroll smoothly.
      data-scroll-behavior="smooth"
      // Removed immediately by the inline script below; see globals.css for the
      // no-JS fallback that keeps scroll-reveal content visible.
      className={`no-js ${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove('no-js');`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-paper">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>

        <Header />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer />
        <WhatsAppButton />

        <StructuredData />
        <Analytics />
      </body>
    </html>
  );
}

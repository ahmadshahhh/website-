import Script from "next/script";
import { analytics } from "@/config/site";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ANALYTICS
 *
 * Nothing loads unless the matching ID is present in the environment, so there
 * are no placeholder IDs, no wasted requests and no cookies set by default.
 *
 * To enable:
 *   Google Analytics 4 → set NEXT_PUBLIC_GA_MEASUREMENT_ID   (G-XXXXXXXXXX)
 *   Meta Pixel         → set NEXT_PUBLIC_META_PIXEL_ID       (numeric ID)
 *   Search Console     → set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
 *                        (handled in the metadata export in src/app/layout.tsx)
 *
 * If you add a consent banner later, gate these scripts behind it.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function Analytics() {
  const { gaMeasurementId, metaPixelId } = analytics;

  return (
    <>
      {gaMeasurementId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementId}');`}
          </Script>
        </>
      ) : null}

      {metaPixelId ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixelId}');
fbq('track', 'PageView');`}
        </Script>
      ) : null}
    </>
  );
}

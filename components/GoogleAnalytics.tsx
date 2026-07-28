import Script from 'next/script';

/**
 * Google Analytics 4 (gtag.js).
 *
 * Rendered once in the root layout so it loads on every route — including the
 * programmatic service/location pages. Uses next/script with the default
 * `afterInteractive` strategy so the tag loads early but doesn't block
 * hydration. This is the only analytics tool on the site (no GTM).
 */
export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}

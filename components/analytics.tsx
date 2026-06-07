"use client";

import { useEffect } from "react";
import Script from "next/script";
import { trackEvent } from "@/lib/analytics";

const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;

export function Analytics() {
  useEffect(() => {
    trackEvent("portfolio_visit", {
      page_path: window.location.pathname,
      page_title: document.title,
    });
  }, []);

  if (!googleAnalyticsId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${googleAnalyticsId}', {
            page_path: window.location.pathname
          });
        `}
      </Script>
    </>
  );
}

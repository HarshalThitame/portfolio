"use client";

import { useEffect } from "react";
import Script from "next/script";
import { trackEvent } from "@/lib/analytics";

const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;

export function Analytics() {
  useEffect(() => {
    const idleWindow = window as typeof window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    const sendVisitEvent = () => {
      trackEvent("portfolio_visit", {
        page_path: window.location.pathname,
        page_title: document.title,
      });
    };

    const idleHandle = idleWindow.requestIdleCallback?.(sendVisitEvent, { timeout: 6000 });
    const timer = idleHandle ? 0 : window.setTimeout(sendVisitEvent, 3500);

    return () => {
      if (idleHandle) idleWindow.cancelIdleCallback?.(idleHandle);
      if (timer) window.clearTimeout(timer);
    };
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

export type AnalyticsEventName =
  | "portfolio_visit"
  | "contact_submit"
  | "resume_download"
  | "whatsapp_click"
  | "project_click"
  | "project_page_visit"
  | "labs_interaction"
  | "book_call_click"
  | "consultation_request"
  | "cta_click";

type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;
type Gtag = (
  command: "config" | "event" | "js" | "set",
  targetId: string | Date,
  config?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

export function trackEvent(name: AnalyticsEventName, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", name, params);
  const payload = JSON.stringify({
    type: name,
    path: window.location.pathname,
    name,
    timestamp: new Date().toISOString(),
    ...params,
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/monitoring", new Blob([payload], { type: "application/json" }));
  } else {
    void fetch("/api/monitoring", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    });
  }

  window.dispatchEvent(
    new CustomEvent("portfolio:analytics", {
      detail: { name, params },
    }),
  );
}

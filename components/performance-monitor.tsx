"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";

type MonitoringPayload = {
  type: "web-vital" | "client-error" | "long-task";
  path: string;
  name: string;
  value?: number;
  rating?: string;
  id?: string;
  message?: string;
  source?: string;
};

const prefetchRoutes = [
  "/studio",
  "/labs",
  "/blog",
  "/projects/flux3d",
  "/projects/majhi-dairy",
  "/blog/how-i-built-majhi-dairy",
];

function sendMonitoringPayload(payload: MonitoringPayload) {
  const body = JSON.stringify({
    ...payload,
    timestamp: new Date().toISOString(),
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/monitoring", new Blob([body], { type: "application/json" }));
    return;
  }

  void fetch("/api/monitoring", {
    method: "POST",
    body,
    headers: { "content-type": "application/json" },
    keepalive: true,
  });
}

export function PerformanceMonitor() {
  const pathname = usePathname();
  const router = useRouter();

  useReportWebVitals((metric) => {
    sendMonitoringPayload({
      type: "web-vital",
      path: pathname,
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
    });
  });

  useEffect(() => {
    const prefetchRoutesAfterIdle = () => {
      prefetchRoutes.forEach((route) => router.prefetch(route));
    };

    const timeout = window.setTimeout(() => {
      const requestIdle = window.requestIdleCallback;

      if (typeof requestIdle === "function") {
        requestIdle(prefetchRoutesAfterIdle, { timeout: 2400 });
        return;
      }

      prefetchRoutesAfterIdle();
    }, 15000);

    return () => window.clearTimeout(timeout);
  }, [router]);

  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      sendMonitoringPayload({
        type: "client-error",
        path: pathname,
        name: "window_error",
        message: event.message,
        source: event.filename,
      });
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      sendMonitoringPayload({
        type: "client-error",
        path: pathname,
        name: "unhandled_rejection",
        message: event.reason instanceof Error ? event.reason.message : String(event.reason),
      });
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, [pathname]);

  useEffect(() => {
    if (!("PerformanceObserver" in window)) return;
    if (!PerformanceObserver.supportedEntryTypes.includes("longtask")) return;

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.duration < 50) return;

        sendMonitoringPayload({
          type: "long-task",
          path: pathname,
          name: entry.name,
          value: Math.round(entry.duration),
        });
      });
    });

    observer.observe({ entryTypes: ["longtask"] });
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

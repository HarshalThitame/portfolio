"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SiteExperience = dynamic(
  () => import("@/components/site-experience").then((mod) => mod.SiteExperience),
  { ssr: false },
);

export function DeferredSiteExperience() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) {
      document.documentElement.classList.add("enhanced-chrome-ready");
      const staticChrome = document.querySelector<HTMLElement>(".static-site-chrome");
      staticChrome?.setAttribute("aria-hidden", "true");
      if (staticChrome) {
        (staticChrome as HTMLElement & { inert?: boolean }).inert = true;
      }
      return;
    }

    const enable = () => setReady(true);
    const timer = window.setTimeout(enable, 4200);
    const events: Array<keyof WindowEventMap> = ["pointerdown", "keydown", "scroll"];

    for (const eventName of events) {
      window.addEventListener(eventName, enable, { once: true, passive: true });
    }

    return () => {
      window.clearTimeout(timer);
      for (const eventName of events) {
        window.removeEventListener(eventName, enable);
      }
    };
  }, [ready]);

  return ready ? <SiteExperience /> : null;
}

"use client";

type PerformanceTier = "full" | "balanced" | "lite";

export function getClientPerformanceTier(): PerformanceTier {
  if (typeof document === "undefined") return "balanced";
  const tier = document.documentElement.dataset.performance;
  return tier === "full" || tier === "balanced" || tier === "lite" ? tier : "balanced";
}

export function shouldRunScrollMotion() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.innerWidth < 900) return false;
  return getClientPerformanceTier() !== "lite";
}

export function shouldRunDepthMotion() {
  if (typeof window === "undefined") return false;
  if (!shouldRunScrollMotion()) return false;
  if (!window.matchMedia("(pointer: fine)").matches) return false;
  return getClientPerformanceTier() === "full" && window.innerWidth >= 1100;
}

export async function loadGsapScrollTrigger() {
  const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);

  gsap.registerPlugin(ScrollTrigger);

  return { gsap, ScrollTrigger };
}

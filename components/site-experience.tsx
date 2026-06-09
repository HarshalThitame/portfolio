"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, Menu, MessageCircle, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

const navItems = [
  { label: "Home", href: "/#hero", id: "hero" },
  { label: "Studio", href: "/studio", id: "studio" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Work", href: "/#featured-projects", id: "featured-projects" },
  { label: "Services", href: "/#services", id: "services" },
  { label: "Clients", href: "/#client-acquisition", id: "client-acquisition" },
  { label: "Labs", href: "/labs", id: "labs" },
  { label: "Blog", href: "/blog", id: "blog" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: {
    effectiveType?: string;
    saveData?: boolean;
  };
};

const cinematicTargetSelector = [
  ".magnetic-button",
  ".project-button",
  ".service-cta",
  ".contact-submit",
  ".acquisition-button",
  ".labs-primary-link",
  ".labs-secondary-link",
  ".studio-primary-link",
  ".studio-secondary-link",
  ".studio-case-copy a",
  ".studio-contact-options a",
  ".case-back-link",
  ".quick-contact-bar a",
  ".floating-whatsapp",
  ".site-mark",
  ".site-nav-cta",
  ".case-detail summary",
  ".acquisition-problem-card summary",
  ".tech-tile",
  ".project-case",
  ".service-bento-card",
  ".industry-card",
  ".acquisition-card",
  ".contact-card",
  ".brand-card",
  ".brand-building-card",
  ".brand-insight-card",
  ".brand-social-card",
  ".brand-milestone-card",
  ".lab-card",
  ".studio-card",
  ".studio-case-card",
  ".case-gallery-card",
  ".case-story-card",
  ".case-info-card",
].join(",");

const magneticTargetSelector = [
  ".magnetic-button",
  ".project-button",
  ".service-cta",
  ".contact-submit",
  ".acquisition-button",
  ".labs-primary-link",
  ".labs-secondary-link",
  ".studio-primary-link",
  ".studio-secondary-link",
  ".studio-case-copy a",
  ".studio-contact-options a",
  ".case-back-link",
  ".quick-contact-bar a",
  ".floating-whatsapp",
  ".site-mark",
  ".site-nav-cta",
  ".contact-card",
].join(",");

const motionResetValues = {
  "--magnet-x": "0px",
  "--magnet-y": "0px",
  "--interaction-x": "50%",
  "--interaction-y": "50%",
  "--case-x": "50%",
  "--case-y": "50%",
  "--case-tilt-x": "0deg",
  "--case-tilt-y": "0deg",
  "--case-drift-x": "0px",
  "--case-drift-y": "0px",
  "--glow-x": "50%",
  "--glow-y": "50%",
  "--tilt-x": "0deg",
  "--tilt-y": "0deg",
  "--service-x": "50%",
  "--service-y": "50%",
  "--industry-x": "50%",
  "--industry-y": "50%",
  "--acq-x": "50%",
  "--acq-y": "50%",
  "--contact-card-x": "50%",
  "--contact-card-y": "50%",
  "--contact-card-tilt-x": "0deg",
  "--contact-card-tilt-y": "0deg",
  "--brand-x": "50%",
  "--brand-y": "50%",
  "--brand-tilt-x": "0deg",
  "--brand-tilt-y": "0deg",
  "--lab-x": "50%",
  "--lab-y": "50%",
  "--lab-tilt-x": "0deg",
  "--lab-tilt-y": "0deg",
} as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function resetMotionTarget(element: HTMLElement | null) {
  if (!element) return;

  for (const [property, value] of Object.entries(motionResetValues)) {
    element.style.setProperty(property, value);
  }
}

export function SiteExperience() {
  const [activeId, setActiveId] = useState("hero");
  const [navHidden, setNavHidden] = useState(false);
  const [signatureAwake, setSignatureAwake] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeIdRef = useRef(activeId);
  const navHiddenRef = useRef(navHidden);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const cursorOuterRef = useRef<HTMLDivElement | null>(null);
  const cursorInnerRef = useRef<HTMLDivElement | null>(null);
  const cursorLabelRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const nav = navigator as NavigatorWithHints;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const compactViewport = window.innerWidth < 900;
    const saveData = Boolean(nav.connection?.saveData);
    const slowNetwork = /(^|-)2g$/.test(nav.connection?.effectiveType ?? "");
    const memory = nav.deviceMemory ?? 8;
    const cores = navigator.hardwareConcurrency ?? 8;
    const performanceTier = reduceMotion || saveData || slowNetwork || memory <= 2 || cores <= 4
      ? "lite"
      : compactViewport || coarsePointer || memory <= 4 || cores <= 6
        ? "balanced"
        : "full";

    document.documentElement.dataset.performance = performanceTier;
    document.documentElement.classList.toggle("motion-reduced", reduceMotion);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const nav = navigator as NavigatorWithHints;
    if (reduceMotion || coarsePointer || window.innerWidth < 900 || nav.connection?.saveData) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const setupSmoothScroll = async () => {
      const { default: Lenis } = await import("lenis");

      if (cancelled) return;

      const lenis = new Lenis({
        lerp: 0.075,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.78,
      });

      let frame = 0;

      const raf = (time: number) => {
        lenis.raf(time);
        frame = window.requestAnimationFrame(raf);
      };

      frame = window.requestAnimationFrame(raf);

      const handleAnchorClick = (event: MouseEvent) => {
        const target = event.target;
        if (!(target instanceof Element)) return;

        const anchor = target.closest<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]');
        if (!anchor) return;

        const href = anchor.getAttribute("href");
        const hash = href?.startsWith("/#") ? href.slice(1) : href;
        if (!hash || hash === "#") return;

        const targetElement = document.querySelector(hash);
        if (!(targetElement instanceof HTMLElement)) return;

        event.preventDefault();
        lenis.scrollTo(targetElement, {
          duration: 1.15,
          easing: (value: number) => Math.min(1, 1.001 - Math.pow(2, -10 * value)),
        });
      };

      document.addEventListener("click", handleAnchorClick);

      cleanup = () => {
        document.removeEventListener("click", handleAnchorClick);
        window.cancelAnimationFrame(frame);
        lenis.destroy();
      };
    };

    const timer = window.setTimeout(() => {
      void setupSmoothScroll();
    }, 2200);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const target = entry.target as HTMLElement;
          const id = target.dataset.section ?? target.id;
          if (!id) continue;
          if (entry.isIntersecting) visible.set(id, entry.intersectionRatio);
          else visible.delete(id);
        }

        const next = [...visible.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
        if (next && next !== activeIdRef.current) {
          activeIdRef.current = next;
          setActiveId(next);
        }
      },
      {
        rootMargin: "-18% 0px -58% 0px",
        threshold: [0, 0.2, 0.5, 0.8],
      },
    );

    for (const item of navItems) {
      const element = document.querySelector<HTMLElement>(`[data-section="${item.id}"]`) ?? document.getElementById(item.id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const progressElement = progressRef.current;
    let lastScrollY = window.scrollY;
    let ticking = false;

    const update = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

      if (progressElement) {
        progressElement.style.transform = `scaleX(${progress})`;
      }

      document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));
      document.documentElement.style.setProperty("--scroll-depth", `${Math.min(96, scrollY * 0.025).toFixed(2)}px`);
      document.documentElement.style.setProperty("--scroll-depth-reverse", `${Math.max(-96, scrollY * -0.025).toFixed(2)}px`);

      const nextHidden = scrollY > lastScrollY && scrollY > 220;
      lastScrollY = scrollY;

      if (nextHidden !== navHiddenRef.current) {
        navHiddenRef.current = nextHidden;
        setNavHidden(nextHidden);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const finePointer = window.matchMedia("(pointer: fine)").matches || window.innerWidth >= 1024;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tier = root.dataset.performance;
    if (!finePointer || reduceMotion || tier === "lite") return;

    const outer = cursorOuterRef.current;
    const inner = cursorInnerRef.current;
    const label = cursorLabelRef.current;
    const cursorEnabled = Boolean(tier === "full" && window.innerWidth >= 1100 && outer && inner && label);

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let motionX = targetX;
    let motionY = targetY;
    let outerX = targetX;
    let outerY = targetY;
    let innerX = targetX;
    let innerY = targetY;
    let cursorScale = 1;
    let targetCursorScale = 1;
    let frame = 0;
    let activeElement: HTMLElement | null = null;
    let activeRect: DOMRect | null = null;
    let magnetStrength = 0;

    const setCursorState = (target: EventTarget | null) => {
      if (!cursorEnabled || !outer || !label) return;

      const element = target instanceof Element ? target : null;
      const project = element?.closest(".project-case, .project-visual-wrap, .studio-case-card");
      const lab = element?.closest(".lab-card, .lab-preview-stage, .labs-selector");
      const visual = element?.closest(".device-mockup, .service-visual, .mockup-stage, .studio-command-shell, .studio-case-visual");
      const interactive = element?.closest("a, button, summary, input, textarea, select, .contact-card");

      outer.classList.toggle("cursor-is-view", Boolean(project || lab));
      outer.classList.toggle("cursor-is-zoom", Boolean(visual && !project));
      outer.classList.toggle("cursor-is-link", Boolean(interactive && !project && !visual && !lab));

      label.textContent = project ? "View" : lab ? "Lab" : visual ? "Zoom" : "";
      targetCursorScale = project || lab || visual ? 1.72 : interactive ? 1.28 : 1;
    };

    const setActiveElement = (target: EventTarget | null) => {
      const element = target instanceof Element ? target.closest<HTMLElement>(cinematicTargetSelector) : null;
      if (element === activeElement) return;

      resetMotionTarget(activeElement);
      activeElement = element;
      activeRect = element?.getBoundingClientRect() ?? null;
      magnetStrength = element?.matches(magneticTargetSelector) ? 0.16 : 0;
      root.classList.toggle("motion-target-ready", Boolean(activeElement));
    };

    const updateActiveElement = () => {
      if (!activeElement || !activeRect) return;

      const relX = clamp((motionX - activeRect.left) / Math.max(1, activeRect.width), 0, 1);
      const relY = clamp((motionY - activeRect.top) / Math.max(1, activeRect.height), 0, 1);
      const xPercent = `${(relX * 100).toFixed(2)}%`;
      const yPercent = `${(relY * 100).toFixed(2)}%`;
      const tiltX = `${((relY - 0.5) * -6).toFixed(3)}deg`;
      const tiltY = `${((relX - 0.5) * 7).toFixed(3)}deg`;
      const magnetX = `${((relX - 0.5) * activeRect.width * magnetStrength).toFixed(2)}px`;
      const magnetY = `${((relY - 0.5) * activeRect.height * magnetStrength * 1.25).toFixed(2)}px`;

      activeElement.style.setProperty("--interaction-x", xPercent);
      activeElement.style.setProperty("--interaction-y", yPercent);
      activeElement.style.setProperty("--magnet-x", magnetX);
      activeElement.style.setProperty("--magnet-y", magnetY);
      activeElement.style.setProperty("--case-x", xPercent);
      activeElement.style.setProperty("--case-y", yPercent);
      activeElement.style.setProperty("--case-tilt-x", `${((relY - 0.5) * -4.5).toFixed(3)}deg`);
      activeElement.style.setProperty("--case-tilt-y", `${((relX - 0.5) * 5).toFixed(3)}deg`);
      activeElement.style.setProperty("--case-drift-x", `${((relX - 0.5) * 18).toFixed(2)}px`);
      activeElement.style.setProperty("--case-drift-y", `${((relY - 0.5) * -14).toFixed(2)}px`);
      activeElement.style.setProperty("--glow-x", xPercent);
      activeElement.style.setProperty("--glow-y", yPercent);
      activeElement.style.setProperty("--tilt-x", tiltX);
      activeElement.style.setProperty("--tilt-y", tiltY);
      activeElement.style.setProperty("--service-x", xPercent);
      activeElement.style.setProperty("--service-y", yPercent);
      activeElement.style.setProperty("--industry-x", xPercent);
      activeElement.style.setProperty("--industry-y", yPercent);
      activeElement.style.setProperty("--acq-x", xPercent);
      activeElement.style.setProperty("--acq-y", yPercent);
      activeElement.style.setProperty("--contact-card-x", xPercent);
      activeElement.style.setProperty("--contact-card-y", yPercent);
      activeElement.style.setProperty("--contact-card-tilt-x", `${((relY - 0.5) * -7).toFixed(3)}deg`);
      activeElement.style.setProperty("--contact-card-tilt-y", `${((relX - 0.5) * 8).toFixed(3)}deg`);
      activeElement.style.setProperty("--brand-x", xPercent);
      activeElement.style.setProperty("--brand-y", yPercent);
      activeElement.style.setProperty("--brand-tilt-x", `${((relY - 0.5) * -4).toFixed(3)}deg`);
      activeElement.style.setProperty("--brand-tilt-y", `${((relX - 0.5) * 5).toFixed(3)}deg`);
      activeElement.style.setProperty("--lab-x", xPercent);
      activeElement.style.setProperty("--lab-y", yPercent);
      activeElement.style.setProperty("--lab-tilt-x", `${((0.5 - relY) * 5).toFixed(3)}deg`);
      activeElement.style.setProperty("--lab-tilt-y", `${((relX - 0.5) * 7).toFixed(3)}deg`);
      activeElement.style.setProperty("--contact-x", `${(relX * activeRect.width).toFixed(1)}px`);
      activeElement.style.setProperty("--contact-y", `${(relY * activeRect.height).toFixed(1)}px`);
    };

    const render = () => {
      motionX += (targetX - motionX) * 0.16;
      motionY += (targetY - motionY) * 0.16;
      const normalizedX = (motionX / Math.max(1, window.innerWidth) - 0.5) * 2;
      const normalizedY = (motionY / Math.max(1, window.innerHeight) - 0.5) * 2;

      root.style.setProperty("--motion-x", normalizedX.toFixed(4));
      root.style.setProperty("--motion-y", normalizedY.toFixed(4));
      root.style.setProperty("--motion-shift-x", `${(normalizedX * 16).toFixed(2)}px`);
      root.style.setProperty("--motion-shift-y", `${(normalizedY * 12).toFixed(2)}px`);
      root.style.setProperty("--motion-shift-x-reverse", `${(normalizedX * -16).toFixed(2)}px`);
      root.style.setProperty("--motion-shift-y-reverse", `${(normalizedY * -12).toFixed(2)}px`);
      root.style.setProperty("--motion-depth-x", `${(normalizedX * 28).toFixed(2)}px`);
      root.style.setProperty("--motion-depth-y", `${(normalizedY * 20).toFixed(2)}px`);
      root.style.setProperty("--motion-depth-x-reverse", `${(normalizedX * -28).toFixed(2)}px`);
      root.style.setProperty("--motion-depth-y-reverse", `${(normalizedY * -20).toFixed(2)}px`);
      root.style.setProperty("--motion-text-x", `${(normalizedX * 2).toFixed(2)}px`);
      root.style.setProperty("--motion-text-y", `${(normalizedY * 1).toFixed(2)}px`);
      root.style.setProperty("--hero-light-a-x", `${(24 + normalizedX * 4).toFixed(2)}%`);
      root.style.setProperty("--hero-light-a-y", `${(18 + normalizedY * 3).toFixed(2)}%`);
      root.style.setProperty("--hero-light-b-x", `${(82 - normalizedX * 4).toFixed(2)}%`);
      root.style.setProperty("--hero-light-b-y", `${(20 - normalizedY * 4).toFixed(2)}%`);
      root.style.setProperty("--hero-aurora-x", `${(normalizedX * 14).toFixed(2)}px`);
      root.style.setProperty("--hero-aurora-y", `${(normalizedY * 10).toFixed(2)}px`);
      root.style.setProperty("--hero-orb-rotate-x", `${(normalizedY * -8).toFixed(2)}deg`);
      root.style.setProperty("--hero-orb-rotate-y", `${(normalizedX * 12).toFixed(2)}deg`);
      root.style.setProperty("--hero-mouse-x", normalizedX.toFixed(4));
      root.style.setProperty("--hero-mouse-y", normalizedY.toFixed(4));
      root.style.setProperty("--spotlight-x", `${motionX.toFixed(1)}px`);
      root.style.setProperty("--spotlight-y", `${motionY.toFixed(1)}px`);
      root.style.setProperty("--cursor-x", `${motionX.toFixed(1)}px`);
      root.style.setProperty("--cursor-y", `${motionY.toFixed(1)}px`);
      root.style.setProperty("--global-spotlight-x", `${motionX.toFixed(1)}px`);
      root.style.setProperty("--global-spotlight-y", `${motionY.toFixed(1)}px`);

      updateActiveElement();

      if (cursorEnabled && outer && inner) {
        outerX += (targetX - outerX) * 0.2;
        outerY += (targetY - outerY) * 0.2;
        innerX += (targetX - innerX) * 0.58;
        innerY += (targetY - innerY) * 0.58;
        cursorScale += (targetCursorScale - cursorScale) * 0.2;
        outer.style.transform = `translate3d(${outerX}px, ${outerY}px, 0) translate(-50%, -50%) scale(${cursorScale})`;
        inner.style.transform = `translate3d(${innerX}px, ${innerY}px, 0) translate(-50%, -50%)`;
      }

      const stillMoving =
        Math.abs(targetX - motionX) > 0.08 ||
        Math.abs(targetY - motionY) > 0.08 ||
        (cursorEnabled && Math.abs(targetCursorScale - cursorScale) > 0.002);

      frame = stillMoving ? window.requestAnimationFrame(render) : 0;
    };

    const ensureFrame = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (cursorEnabled) root.classList.add("cursor-ready");
      ensureFrame();
    };

    const onPointerOver = (event: PointerEvent) => {
      setActiveElement(event.target);
      setCursorState(event.target);
      ensureFrame();
    };

    const onResizeOrScroll = () => {
      if (!activeElement) return;
      activeRect = activeElement?.getBoundingClientRect() ?? null;
      ensureFrame();
    };

    const onPointerLeave = () => {
      root.classList.remove("cursor-ready", "motion-target-ready");
      resetMotionTarget(activeElement);
      activeElement = null;
      activeRect = null;
      targetCursorScale = 1;
      ensureFrame();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("resize", onResizeOrScroll);
    window.addEventListener("scroll", onResizeOrScroll, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("resize", onResizeOrScroll);
      window.removeEventListener("scroll", onResizeOrScroll);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      resetMotionTarget(activeElement);
      root.classList.remove("cursor-ready", "motion-target-ready");
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!signatureAwake) return;

    const timer = window.setTimeout(() => setSignatureAwake(false), 2400);
    return () => window.clearTimeout(timer);
  }, [signatureAwake]);

  useEffect(() => {
    document.documentElement.classList.toggle("mobile-menu-open", mobileMenuOpen);
    document.body.classList.toggle("mobile-menu-open", mobileMenuOpen);

    return () => {
      document.documentElement.classList.remove("mobile-menu-open");
      document.body.classList.remove("mobile-menu-open");
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    const closeOnDesktop = () => {
      if (window.innerWidth > 760) setMobileMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <div aria-hidden="true" className="cinematic-atmosphere">
        <span className="cinematic-light cinematic-light-a" />
        <span className="cinematic-light cinematic-light-b" />
        <span className="cinematic-light cinematic-light-c" />
      </div>
      <div aria-hidden="true" className="global-spotlight" />
      <div aria-hidden="true" className="scroll-progress-shell">
        <div ref={progressRef} className="scroll-progress-bar" />
      </div>

      <header className={`site-nav ${navHidden && !mobileMenuOpen ? "site-nav-hidden" : ""}`}>
        <nav aria-label="Primary navigation" className="site-nav-inner">
          <Link
            href="/#hero"
            className={`site-mark ${signatureAwake ? "site-mark-awake" : ""}`}
            onDoubleClick={() => setSignatureAwake(true)}
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Go to top"
          >
            <span>H</span>
          </Link>

          <div className="site-nav-links">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={activeId === item.id ? "active" : ""}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link href="/#contact-form" className="site-nav-cta">
            Start
            <ArrowUpRight className="size-3.5" />
          </Link>

          <button
            type="button"
            className="site-mobile-toggle"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu-layer ${mobileMenuOpen ? "mobile-menu-layer-open" : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-menu-panel" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="mobile-menu-header">
            <span>
              <Sparkles className="size-4" />
              Portfolio
            </span>
            <strong>Navigate</strong>
          </div>

          <div className="mobile-menu-links">
            {navItems.map((item, index) => (
              <Link
                key={item.id}
                href={item.href}
                className={activeId === item.id ? "active" : ""}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{item.label}</span>
                <small>{String(index + 1).padStart(2, "0")}</small>
              </Link>
            ))}
          </div>

          <div className="mobile-menu-actions">
            <Link href="/#contact-form" onClick={() => setMobileMenuOpen(false)}>
              Start A Project
              <ArrowUpRight className="size-4" />
            </Link>
            <a
              href={siteConfig.links.whatsapp}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                setMobileMenuOpen(false);
                trackEvent("whatsapp_click", { source: "mobile_menu" });
              }}
            >
              WhatsApp
              <MessageCircle className="size-4" />
            </a>
          </div>
        </div>
      </div>

      <aside className="quick-contact-bar" aria-label="Quick contact links">
        <a href={siteConfig.links.email} aria-label="Email Harshal">
          <Mail className="size-4" />
          <span>Email</span>
        </a>
        <a
          href={siteConfig.links.whatsapp}
          target="_blank"
          rel="noreferrer"
          aria-label="Message Harshal on WhatsApp"
          onClick={() => trackEvent("whatsapp_click", { source: "quick_contact_bar" })}
        >
          <MessageCircle className="size-4" />
          <span>WhatsApp</span>
        </a>
      </aside>

      <a
        href={siteConfig.links.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp group"
        aria-label="Let's discuss your project on WhatsApp"
        onClick={() => trackEvent("whatsapp_click", { source: "floating_whatsapp" })}
      >
        <MessageCircle className="size-5" />
        <span>Let&apos;s discuss your project</span>
      </a>

      <div ref={cursorOuterRef} aria-hidden="true" className="premium-cursor cursor-outer">
        <span ref={cursorLabelRef} />
      </div>
      <div ref={cursorInnerRef} aria-hidden="true" className="premium-cursor cursor-inner" />

    </>
  );
}

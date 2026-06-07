"use client";

import Link from "next/link";
import { ArrowUpRight, Linkedin, Mail, MessageCircle } from "lucide-react";
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

export function SiteExperience() {
  const [activeId, setActiveId] = useState("hero");
  const [navHidden, setNavHidden] = useState(false);
  const [signatureAwake, setSignatureAwake] = useState(false);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const cursorOuterRef = useRef<HTMLDivElement | null>(null);
  const cursorInnerRef = useRef<HTMLDivElement | null>(null);
  const cursorLabelRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const setupSmoothScroll = async () => {
      const [{ default: gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 0.82,
        touchMultiplier: 1.12,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

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
        gsap.ticker.remove(raf);
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

      setNavHidden(scrollY > lastScrollY && scrollY > 220);
      lastScrollY = scrollY;

      const current = navItems
        .map((item) => {
          const element = document.getElementById(item.id);
          if (!element) return { id: item.id, distance: Number.POSITIVE_INFINITY };
          const rect = element.getBoundingClientRect();
          return { id: item.id, distance: Math.abs(rect.top - window.innerHeight * 0.28) };
        })
        .sort((a, b) => a.distance - b.distance)[0];

      if (current) {
        setActiveId(current.id);
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
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    const outer = cursorOuterRef.current;
    const inner = cursorInnerRef.current;
    const label = cursorLabelRef.current;
    if (!outer || !inner || !label) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const setupCursor = async () => {
      const { default: gsap } = await import("gsap");
      if (cancelled) return;

      gsap.set([outer, inner], { xPercent: -50, yPercent: -50 });

      const outerX = gsap.quickTo(outer, "x", { duration: 0.36, ease: "power3.out" });
      const outerY = gsap.quickTo(outer, "y", { duration: 0.36, ease: "power3.out" });
      const innerX = gsap.quickTo(inner, "x", { duration: 0.1, ease: "power3.out" });
      const innerY = gsap.quickTo(inner, "y", { duration: 0.1, ease: "power3.out" });

      const setCursorState = (target: EventTarget | null) => {
        const element = target instanceof Element ? target : null;
        const project = element?.closest(".project-case, .project-visual-wrap, .studio-case-card");
        const lab = element?.closest(".lab-card, .lab-preview-stage, .labs-selector");
        const visual = element?.closest(".device-mockup, .service-visual, .mockup-stage, .studio-command-shell, .studio-case-visual");
        const interactive = element?.closest("a, button, summary, input, textarea, select, .contact-card");

        outer.classList.toggle("cursor-is-view", Boolean(project || lab));
        outer.classList.toggle("cursor-is-zoom", Boolean(visual && !project));
        outer.classList.toggle("cursor-is-link", Boolean(interactive && !project && !visual && !lab));

        label.textContent = project ? "View" : lab ? "Lab" : visual ? "Zoom" : "";
      };

      const onPointerMove = (event: PointerEvent) => {
        document.documentElement.style.setProperty("--global-spotlight-x", `${event.clientX}px`);
        document.documentElement.style.setProperty("--global-spotlight-y", `${event.clientY}px`);

        outerX(event.clientX);
        outerY(event.clientY);
        innerX(event.clientX);
        innerY(event.clientY);

        document.documentElement.classList.add("cursor-ready");
        setCursorState(event.target);
      };

      const onPointerLeave = () => {
        document.documentElement.classList.remove("cursor-ready");
      };

      const onPointerOver = (event: PointerEvent) => setCursorState(event.target);

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerover", onPointerOver, { passive: true });
      document.documentElement.addEventListener("mouseleave", onPointerLeave);

      cleanup = () => {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerover", onPointerOver);
        document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      };
    };

    const startCursor = () => {
      window.removeEventListener("pointermove", startCursor);
      void setupCursor();
    };

    window.addEventListener("pointermove", startCursor, { passive: true, once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("pointermove", startCursor);
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    if (!signatureAwake) return;

    const timer = window.setTimeout(() => setSignatureAwake(false), 2400);
    return () => window.clearTimeout(timer);
  }, [signatureAwake]);

  return (
    <>
      <div aria-hidden="true" className="global-spotlight" />
      <div aria-hidden="true" className="scroll-progress-shell">
        <div ref={progressRef} className="scroll-progress-bar" />
      </div>

      <header className={`site-nav ${navHidden ? "site-nav-hidden" : ""}`}>
        <nav aria-label="Primary navigation" className="site-nav-inner">
          <Link
            href="/#hero"
            className={`site-mark ${signatureAwake ? "site-mark-awake" : ""}`}
            onDoubleClick={() => setSignatureAwake(true)}
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
        </nav>
      </header>

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
        <a
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="Open Harshal LinkedIn profile"
        >
          <Linkedin className="size-4" />
          <span>LinkedIn</span>
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

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

function getPerformanceTier() {
  const nav = navigator as NavigatorWithHints;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = Boolean(nav.connection?.saveData);
  const slowNetwork = /(^|-)2g$/.test(nav.connection?.effectiveType ?? "");
  const memory = nav.deviceMemory ?? 4;
  const cores = navigator.hardwareConcurrency ?? 4;

  if (reduceMotion || saveData || slowNetwork || memory <= 2 || cores <= 4 || window.innerWidth < 768) {
    return "lite";
  }

  return "balanced";
}

export function SiteExperience() {
  const [activeId, setActiveId] = useState("hero");
  const [navHidden, setNavHidden] = useState(false);
  const [signatureAwake, setSignatureAwake] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeIdRef = useRef(activeId);
  const navHiddenRef = useRef(navHidden);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.performance = getPerformanceTier();
    root.classList.toggle("motion-reduced", window.matchMedia("(prefers-reduced-motion: reduce)").matches);
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
        threshold: [0, 0.5],
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
    let frame = 0;

    const update = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

      if (progressElement) {
        progressElement.style.transform = `scaleX(${progress})`;
      }

      const nextHidden = scrollY > lastScrollY && scrollY > 220;
      lastScrollY = scrollY;

      if (nextHidden !== navHiddenRef.current) {
        navHiddenRef.current = nextHidden;
        setNavHidden(nextHidden);
      }

      frame = 0;
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!signatureAwake) return;

    const timer = window.setTimeout(() => setSignatureAwake(false), 1800);
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
              <Link key={item.id} href={item.href} className={activeId === item.id ? "active" : ""}>
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
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType, CSSProperties, FormEvent, PointerEvent } from "react";
import {
  ArrowUpRight,
  Bot,
  CalendarDays,
  Check,
  Cpu,
  Factory,
  FileDown,
  Leaf,
  LineChart,
  Rocket,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { loadGsapScrollTrigger, shouldRunDepthMotion, shouldRunScrollMotion } from "@/lib/client-performance";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const proofStats = [
  { value: "20+", label: "Projects Completed", icon: Rocket },
  { value: "16+", label: "Technologies Mastered", icon: Cpu },
  { value: "6", label: "Industries Served", icon: LineChart },
];

const industries = [
  { title: "Dairy & Agriculture", icon: Leaf },
  { title: "Manufacturing & Industrial", icon: Factory },
  { title: "Small Businesses", icon: Store },
  { title: "Startups", icon: Rocket },
  { title: "SaaS Platforms", icon: Users },
  { title: "AI Applications", icon: Bot },
];

const trustBadges = [
  "Modern Technologies",
  "Secure Development",
  "Responsive Design",
  "Performance Optimization",
  "SEO Friendly Development",
];

const conversionParticles = [
  { left: 9, top: 18, size: 2, delay: "-4s", duration: "10s", dx: "22px", dy: "-24px" },
  { left: 25, top: 70, size: 1, delay: "-7s", duration: "12s", dx: "-18px", dy: "26px" },
  { left: 51, top: 22, size: 2, delay: "-2s", duration: "9s", dx: "18px", dy: "28px" },
  { left: 82, top: 30, size: 1, delay: "-8s", duration: "13s", dx: "-24px", dy: "20px" },
  { left: 91, top: 75, size: 2, delay: "-1s", duration: "8s", dx: "22px", dy: "-22px" },
];

function setMagnet(element: HTMLElement | null, event: PointerEvent<HTMLElement>) {
  if (!element) return;

  const rect = element.getBoundingClientRect();
  const x = event.clientX - rect.left - rect.width / 2;
  const y = event.clientY - rect.top - rect.height / 2;

  element.style.setProperty("--magnet-x", `${x * 0.14}px`);
  element.style.setProperty("--magnet-y", `${y * 0.2}px`);
}

function resetMagnet(element: HTMLElement | null) {
  if (!element) return;
  element.style.setProperty("--magnet-x", "0px");
  element.style.setProperty("--magnet-y", "0px");
}

function ProofCard({
  value,
  label,
  icon: Icon,
  index,
}: {
  value: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  index: number;
}) {
  return (
    <motion.article
      className="conversion-card relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.06, duration: 0.72, ease: premiumEase }}
      whileHover={{ y: -5 }}
    >
      <span className="relative z-10 flex size-11 items-center justify-center rounded-2xl border border-cyanflare/20 bg-cyanflare/10 text-cyanflare">
        <Icon className="size-5" />
      </span>
      <strong className="relative z-10 mt-7 block font-display text-4xl font-black text-white">
        {value}
      </strong>
      <span className="relative z-10 mt-2 block text-sm font-bold uppercase tracking-[0.14em] text-frost/56">
        {label}
      </span>
    </motion.article>
  );
}

function IndustryCard({
  title,
  icon: Icon,
  index,
}: {
  title: string;
  icon: ComponentType<{ className?: string }>;
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    element.style.setProperty("--industry-x", `${x * 100}%`);
    element.style.setProperty("--industry-y", `${y * 100}%`);
  };

  return (
    <motion.div
      ref={ref}
      className="industry-card group relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl"
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        const element = ref.current;
        if (!element) return;
        element.style.setProperty("--industry-x", "50%");
        element.style.setProperty("--industry-y", "50%");
      }}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ delay: index * 0.045, duration: 0.7, ease: premiumEase }}
      whileHover={{ y: -4, scale: 1.01 }}
    >
      <div className="relative z-10 flex items-center gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] text-cyanflare">
          <Icon className="size-5" />
        </span>
        <h3 className="text-base font-bold text-white">{title}</h3>
      </div>
    </motion.div>
  );
}

function ConsultationForm() {
  const [status, setStatus] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    trackEvent("book_call_click", { source: "consultation_form" });
    setStatus("Add your project details in the form below and I will reply with available times.");
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <form className="mt-7 grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="lux-field">
          <input id="consult-name" name="consult-name" placeholder=" " autoComplete="name" />
          <label htmlFor="consult-name">Name</label>
        </div>
        <div className="lux-field lux-select">
          <select id="consult-focus" name="consult-focus" defaultValue="">
            <option value="">Project focus</option>
            <option>Website</option>
            <option>Business Platform</option>
            <option>AI Integration</option>
            <option>Product Design</option>
          </select>
          <label htmlFor="consult-focus">Focus</label>
        </div>
      </div>
      <div className="lux-field lux-select">
        <select id="consult-time" name="consult-time" defaultValue="">
          <option value="">Preferred consultation window</option>
          <option>This week</option>
          <option>Next week</option>
          <option>Flexible</option>
        </select>
        <label htmlFor="consult-time">Timing</label>
      </div>
      <button
        ref={buttonRef}
        type="submit"
        className="service-cta magnetic-button group relative inline-flex min-h-[3.45rem] items-center justify-center overflow-hidden rounded-full bg-pearl px-6 text-sm font-black uppercase tracking-[0.11em] text-ink shadow-[0_0_48px_rgba(248,251,255,0.14)] transition duration-500 hover:shadow-[0_0_80px_rgba(97,244,255,0.28)]"
        onPointerMove={(event) => setMagnet(buttonRef.current, event)}
        onPointerLeave={() => resetMagnet(buttonRef.current)}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition duration-700 group-hover:translate-x-full group-hover:opacity-100"
        />
        <span className="relative z-10 inline-flex items-center gap-2">
          Schedule A Free Consultation
          <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </button>
      {status ? (
        <motion.p
          className="text-sm font-semibold text-cyanflare/86"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {status}
        </motion.p>
      ) : null}
    </form>
  );
}

export function ConversionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!shouldRunScrollMotion()) return;

    const runDepthMotion = shouldRunDepthMotion();
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const setupMotion = async () => {
      const { gsap } = await loadGsapScrollTrigger();

      if (cancelled) return;

      const context = gsap.context(() => {
      gsap.fromTo(
        ".conversion-reveal",
        { y: 42, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 74%",
          },
        },
      );

      if (runDepthMotion) {
        gsap.to(".conversion-bg-shift", {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        });
      }
      }, sectionRef);

      cleanup = () => context.revert();
    };

    void setupMotion();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section
      id="consultation"
      ref={sectionRef}
      className="conversion-section relative overflow-hidden bg-ink py-28 text-pearl sm:py-36 lg:py-44"
      aria-labelledby="conversion-heading"
    >
      <div aria-hidden="true" className="conversion-mesh absolute inset-0" />
      <div aria-hidden="true" className="conversion-bg-shift absolute left-[-14%] top-[8%] size-[36rem] rounded-full bg-cyanflare/12 blur-[120px]" />
      <div aria-hidden="true" className="conversion-bg-shift absolute right-[-16%] top-[38%] size-[42rem] rounded-full bg-rosegold/10 blur-[130px]" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_bottom,#04050a,rgba(4,5,10,0.84)_12%,rgba(4,5,10,0.82)_86%,#04050a)]" />

      <div aria-hidden="true" className="absolute inset-0">
        {conversionParticles.map((particle) => (
          <span
            key={`${particle.left}-${particle.top}`}
            className="particle absolute rounded-full bg-cyanflare/80 shadow-[0_0_18px_rgba(97,244,255,0.42)]"
            style={
              {
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                "--delay": particle.delay,
                "--duration": particle.duration,
                "--drift-x": particle.dx,
                "--drift-y": particle.dy,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <header className="grid gap-8 lg:grid-cols-[0.82fr_1fr] lg:items-end">
          <div>
            <p className="conversion-reveal mb-5 inline-flex rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-cyanflare/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
              Client Conversion
            </p>
            <h2
              id="conversion-heading"
              className="conversion-reveal font-display text-5xl font-black leading-[0.95] tracking-normal text-white sm:text-6xl md:text-7xl xl:text-8xl"
            >
              Start With
              <span className="headline-accent block">A Clear Path</span>
            </h2>
          </div>
          <p className="conversion-reveal max-w-3xl text-lg leading-8 text-frost/70 sm:text-xl">
            Multiple contact paths, trust signals and project-focused CTAs make
            it simple for founders and business owners to start a serious
            conversation.
          </p>
        </header>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {proofStats.map((stat, index) => (
            <ProofCard key={stat.label} {...stat} index={index} />
          ))}
        </div>

        <div className="mt-24 grid gap-10 lg:grid-cols-[0.74fr_1fr] lg:gap-16">
          <div className="conversion-reveal">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-white/45">
              Industries I Build For
            </p>
            <h3 className="font-display text-3xl font-black leading-tight text-white sm:text-5xl">
              Practical software for real business workflows.
            </h3>
            <p className="mt-6 max-w-xl text-base leading-8 text-frost/68">
              The strongest products are shaped around the industry, the user
              and the business outcome. This portfolio is positioned for work
              that needs more than a beautiful interface.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-3 text-xs font-bold uppercase tracking-[0.13em] text-white/62"
                >
                  <Check className="size-4 text-cyanflare" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {industries.map((industry, index) => (
              <IndustryCard key={industry.title} {...industry} index={index} />
            ))}
          </div>
        </div>

        <div className="mt-24 grid gap-5 lg:grid-cols-[1fr_0.72fr]">
          <motion.article
            className="conversion-card relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_28px_100px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:p-8 lg:p-10"
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.85, ease: premiumEase }}
          >
            <div className="relative z-10 grid gap-8 lg:grid-cols-[0.76fr_1fr]">
              <div>
                <span className="flex size-12 items-center justify-center rounded-2xl border border-cyanflare/20 bg-cyanflare/10 text-cyanflare">
                  <CalendarDays className="size-6" />
                </span>
                <h3 className="mt-7 font-display text-3xl font-black leading-tight text-white sm:text-5xl">
                  Book a focused discovery call.
                </h3>
                <p className="mt-5 leading-8 text-frost/68">
                  Use the quick consultation request to start the conversation.
                  A calendar integration can be connected here when a booking
                  provider is selected.
                </p>
              </div>

              <div className="calendar-placeholder relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-white/[0.045] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-sm font-bold uppercase tracking-[0.16em] text-white/50">
                    Calendar
                  </span>
                  <span className="rounded-full border border-cyanflare/20 bg-cyanflare/10 px-3 py-1 text-xs font-bold text-cyanflare">
                    Placeholder
                  </span>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 28 }).map((_, index) => (
                    <span
                      key={index}
                      className={`calendar-cell ${[9, 10, 16, 22].includes(index) ? "calendar-cell-active" : ""}`}
                    />
                  ))}
                </div>
                <ConsultationForm />
              </div>
            </div>
          </motion.article>

          <motion.aside
            className="conversion-card relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_28px_100px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:p-8"
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ delay: 0.08, duration: 0.85, ease: premiumEase }}
          >
            <div className="relative z-10">
              <Sparkles className="size-6 text-rosegold" />
              <h3 className="mt-7 font-display text-3xl font-black leading-tight text-white">
                Need the professional profile?
              </h3>
              <p className="mt-4 leading-8 text-frost/66">
                Download the resume or start a project conversation directly.
              </p>
            </div>
            <div className="relative z-10 mt-10 grid gap-3">
              <a
                href={siteConfig.links.resume}
                download
                className="service-cta magnetic-button group relative inline-flex min-h-[3.3rem] items-center justify-center overflow-hidden rounded-full bg-pearl px-6 text-sm font-black uppercase tracking-[0.11em] text-ink shadow-[0_0_48px_rgba(248,251,255,0.14)] transition duration-500 hover:shadow-[0_0_80px_rgba(97,244,255,0.28)]"
                onClick={() => trackEvent("resume_download", { source: "conversion_section" })}
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  <FileDown className="size-4" />
                  Download Resume
                </span>
              </a>
              <a
                href="#contact-form"
                className="inline-flex min-h-[3.3rem] items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-6 text-sm font-bold text-white transition duration-500 hover:border-cyanflare/35 hover:text-cyanflare"
              >
                Start Your Project
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </motion.aside>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3 rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl">
          {[
            "Full Stack Development",
            "Business Software Solutions",
            "AI Integrations",
            "Modern Web Applications",
          ].map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white/62"
            >
              <ShieldCheck className="size-4 text-cyanflare" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

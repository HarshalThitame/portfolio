"use client";

import { useEffect, useRef } from "react";
import type { ComponentType, CSSProperties, PointerEvent, ReactNode } from "react";
import {
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Check,
  Code2,
  Database,
  Gauge,
  Layers3,
  LineChart,
  MousePointer2,
  Palette,
  Rocket,
  SearchCheck,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { loadGsapScrollTrigger, shouldRunDepthMotion, shouldRunScrollMotion } from "@/lib/client-performance";

const premiumEase = [0.16, 1, 0.3, 1] as const;

type Service = {
  title: string;
  description: string;
  features: string[];
  icon: ComponentType<{ className?: string }>;
  visual: "web" | "dashboard" | "ai" | "design";
  className: string;
};

const services: Service[] = [
  {
    title: "Modern Web Experiences",
    description:
      "Custom websites and web applications built with performance, scalability and user experience in mind.",
    features: [
      "Next.js Development",
      "React Applications",
      "Responsive Design",
      "SEO Optimization",
      "Performance Optimization",
    ],
    icon: Code2,
    visual: "web",
    className: "lg:col-span-7 lg:row-span-2",
  },
  {
    title: "Business Platforms & Dashboards",
    description:
      "Custom software solutions that automate workflows, manage operations and improve productivity.",
    features: [
      "Admin Dashboards",
      "Data Management",
      "Analytics",
      "Reporting Systems",
      "Multi-user Applications",
    ],
    icon: LineChart,
    visual: "dashboard",
    className: "lg:col-span-5",
  },
  {
    title: "AI-Powered Solutions",
    description:
      "Integrating modern AI capabilities into products to improve efficiency, automation and customer experience.",
    features: [
      "OpenAI Integration",
      "AI Assistants",
      "Automation Workflows",
      "Intelligent Search",
      "Business Automation",
    ],
    icon: BrainCircuit,
    visual: "ai",
    className: "lg:col-span-5",
  },
  {
    title: "Premium User Experiences",
    description:
      "Designing interfaces that are beautiful, intuitive and enjoyable to use.",
    features: [
      "Modern UI Design",
      "User-Centered Design",
      "Design Systems",
      "Mobile-First Design",
      "Interactive Experiences",
    ],
    icon: Palette,
    visual: "design",
    className: "lg:col-span-7",
  },
];

const values = [
  {
    title: "Business First",
    description: "Every project starts with understanding business goals before writing code.",
    icon: SearchCheck,
  },
  {
    title: "Modern Technology",
    description: "Built using modern frameworks and scalable architecture.",
    icon: Layers3,
  },
  {
    title: "Performance Focused",
    description: "Fast, optimized and responsive experiences across all devices.",
    icon: Gauge,
  },
  {
    title: "Long-Term Support",
    description: "Solutions designed to grow with your business.",
    icon: ShieldCheck,
  },
];

const process = [
  {
    step: "Discover",
    description: "Understand requirements and business objectives.",
    icon: SearchCheck,
  },
  {
    step: "Design",
    description: "Plan architecture and user experience.",
    icon: MousePointer2,
  },
  {
    step: "Develop",
    description: "Build scalable and high-performance solutions.",
    icon: Code2,
  },
  {
    step: "Launch",
    description: "Deploy, optimize and monitor.",
    icon: Rocket,
  },
];

const serviceParticles = [
  { left: 6, top: 16, size: 2, delay: "-4s", duration: "10s", dx: "24px", dy: "-22px" },
  { left: 21, top: 78, size: 1, delay: "-6s", duration: "12s", dx: "-20px", dy: "28px" },
  { left: 42, top: 23, size: 2, delay: "-2s", duration: "9s", dx: "18px", dy: "30px" },
  { left: 69, top: 12, size: 1, delay: "-8s", duration: "13s", dx: "-26px", dy: "22px" },
  { left: 84, top: 66, size: 2, delay: "-1s", duration: "8s", dx: "24px", dy: "-24px" },
  { left: 94, top: 38, size: 1, delay: "-5s", duration: "11s", dx: "-18px", dy: "26px" },
];

function MagneticLink({ children, href }: { children: ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const onPointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    element.style.setProperty("--magnet-x", `${x * 0.16}px`);
    element.style.setProperty("--magnet-y", `${y * 0.22}px`);
  };

  const onPointerLeave = () => {
    const element = ref.current;
    if (!element) return;

    element.style.setProperty("--magnet-x", "0px");
    element.style.setProperty("--magnet-y", "0px");
  };

  return (
    <a
      ref={ref}
      href={href}
      className="service-cta magnetic-button group relative inline-flex min-h-[3.25rem] items-center justify-center overflow-hidden rounded-full bg-pearl px-6 text-sm font-bold text-ink shadow-[0_0_48px_rgba(248,251,255,0.14)] transition duration-500 hover:shadow-[0_0_80px_rgba(97,244,255,0.28)]"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition duration-700 group-hover:translate-x-full group-hover:opacity-100"
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>
  );
}

function WebVisual() {
  return (
    <div className="service-visual web-service-visual">
      <motion.div
        className="service-browser service-depth"
        animate={{ y: [-6, 8, -6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="service-browser-bar">
          <span />
          <span />
          <span />
        </div>
        <div className="service-browser-body">
          <div className="service-web-hero">
            <strong>Digital Product</strong>
            <i />
          </div>
          <div className="service-web-grid">
            <span />
            <span />
            <span />
          </div>
        </div>
      </motion.div>
      <motion.div
        className="service-floating-pill service-depth"
        animate={{ x: [-8, 10, -8], y: [6, -10, 6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Zap className="size-4 text-cyanflare" />
        <span>98 Performance</span>
      </motion.div>
    </div>
  );
}

function DashboardVisual() {
  return (
    <div className="service-visual dashboard-service-visual">
      <div className="service-dashboard service-depth">
        <div className="service-dashboard-top">
          <span>Operations</span>
          <strong>Live dashboard</strong>
        </div>
        <div className="service-dashboard-grid">
          <div>
            <small>Revenue</small>
            <strong>+32%</strong>
          </div>
          <div>
            <small>Tasks</small>
            <strong>184</strong>
          </div>
          <div className="service-live-chart">
            <i style={{ height: "48%" }} />
            <i style={{ height: "76%" }} />
            <i style={{ height: "54%" }} />
            <i style={{ height: "88%" }} />
            <i style={{ height: "68%" }} />
          </div>
        </div>
      </div>
      <motion.div
        className="service-data-chip service-depth"
        animate={{ y: [8, -10, 8] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Database className="size-4 text-rosegold" />
        <span>Synced records</span>
      </motion.div>
    </div>
  );
}

function AIVisual() {
  return (
    <div className="service-visual ai-service-visual">
      <div className="ai-orbit service-depth">
        <span className="ai-core">
          <Bot className="size-7" />
        </span>
        <i className="ai-node node-a" />
        <i className="ai-node node-b" />
        <i className="ai-node node-c" />
        <i className="ai-line line-a" />
        <i className="ai-line line-b" />
        <i className="ai-line line-c" />
      </div>
      <div className="ai-flow service-depth">
        <Workflow className="size-4 text-cyanflare" />
        <span>Automation workflow</span>
      </div>
    </div>
  );
}

function DesignVisual() {
  return (
    <div className="service-visual design-service-visual">
      <motion.div
        className="design-board board-main service-depth"
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="design-card-row">
          <span />
          <span />
        </div>
        <div className="design-prototype">
          <i />
          <i />
          <i />
        </div>
      </motion.div>
      <motion.div
        className="design-board board-secondary service-depth"
        animate={{ y: [8, -10, 8], rotate: [2, -1, 2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Palette className="size-5 text-rosegold" />
        <span>Design system</span>
      </motion.div>
    </div>
  );
}

function ServiceVisual({ visual }: { visual: Service["visual"] }) {
  if (visual === "web") return <WebVisual />;
  if (visual === "dashboard") return <DashboardVisual />;
  if (visual === "ai") return <AIVisual />;
  return <DesignVisual />;
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLElement | null>(null);
  const Icon = service.icon;

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    element.style.setProperty("--service-x", `${x * 100}%`);
    element.style.setProperty("--service-y", `${y * 100}%`);
  };

  return (
    <motion.article
      ref={ref}
      className={`service-bento-card group relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_28px_100px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:p-7 ${service.className}`}
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        const element = ref.current;
        if (!element) return;
        element.style.setProperty("--service-x", "50%");
        element.style.setProperty("--service-y", "50%");
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-110px" }}
      transition={{ delay: index * 0.06, duration: 0.88, ease: premiumEase }}
      whileHover={{ y: -6, scale: 1.006 }}
    >
      <div aria-hidden="true" className="service-card-light" />
      <div className="relative z-10 flex h-full min-h-[30rem] flex-col">
        <div className="flex items-start justify-between gap-5">
          <span className="flex size-[3.25rem] items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] text-cyanflare shadow-[0_0_34px_rgba(97,244,255,0.12)]">
            <Icon className="size-6" />
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/32">
            0{index + 1}
          </span>
        </div>

        <div className="mt-8 max-w-2xl">
          <h3 className="font-display text-3xl font-black leading-tight text-white sm:text-4xl">
            {service.title}
          </h3>
          <p className="mt-4 max-w-xl text-base leading-8 text-frost/68">
            {service.description}
          </p>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {service.features.map((feature) => (
            <div key={feature} className="flex items-center gap-3 text-sm font-medium text-white/70">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-cyanflare/20 bg-cyanflare/10 text-cyanflare">
                <Check className="size-3.5" />
              </span>
              {feature}
            </div>
          ))}
        </div>

        <ServiceVisual visual={service.visual} />
      </div>
    </motion.article>
  );
}

export function ServicesSection() {
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
        ".services-header-reveal",
        { y: 42, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 74%",
          },
        },
      );

      if (runDepthMotion) {
        gsap.to(".services-bg-shift", {
          yPercent: -16,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        });

        gsap.utils.toArray<HTMLElement>(".service-depth").forEach((element) => {
          gsap.to(element, {
            yPercent: -7,
            ease: "none",
            scrollTrigger: {
              trigger: element.closest(".service-bento-card"),
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        });
      }

      gsap.fromTo(
        ".process-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".process-showcase",
            start: "top 74%",
            end: "bottom 64%",
            scrub: 0.75,
          },
        },
      );
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
      id="services"
      ref={sectionRef}
      className="services-section relative overflow-hidden bg-ink py-28 text-pearl sm:py-36 lg:py-44"
      aria-labelledby="services-heading"
    >
      <div aria-hidden="true" className="services-mesh absolute inset-0" />
      <div aria-hidden="true" className="services-bg-shift absolute left-[-14%] top-[10%] size-[38rem] rounded-full bg-cyanflare/12 blur-[120px]" />
      <div aria-hidden="true" className="services-bg-shift absolute right-[-16%] top-[38%] size-[42rem] rounded-full bg-violetflare/13 blur-[130px]" />
      <div aria-hidden="true" className="services-bg-shift absolute bottom-[4%] left-[30%] size-[34rem] rounded-full bg-rosegold/9 blur-[120px]" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_bottom,#04050a,rgba(4,5,10,0.86)_12%,rgba(4,5,10,0.82)_86%,#04050a)]" />

      <div aria-hidden="true" className="absolute inset-0">
        {serviceParticles.map((particle) => (
          <span
            key={`${particle.left}-${particle.top}`}
            className="particle absolute rounded-full bg-white/75 shadow-[0_0_18px_rgba(97,244,255,0.42)]"
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
        <header className="mx-auto mb-16 max-w-5xl text-center lg:mb-24">
          <p className="services-header-reveal mb-5 inline-flex rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-cyanflare/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
            Services
          </p>
          <h2
            id="services-heading"
            className="services-header-reveal font-display text-5xl font-black leading-[0.95] tracking-normal text-white sm:text-6xl md:text-7xl xl:text-8xl"
          >
            Building Products
            <span className="headline-accent block">That Drive Results</span>
          </h2>
          <p className="services-header-reveal mx-auto mt-7 max-w-3xl text-lg leading-8 text-frost/70 sm:text-xl">
            From modern websites to full-scale business platforms, I create
            digital solutions that help businesses grow and operate more
            efficiently.
          </p>
        </header>

        <div className="grid auto-rows-fr gap-4 lg:grid-cols-12 lg:gap-5">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        <div className="mt-28 grid gap-10 lg:grid-cols-[0.62fr_1fr] lg:gap-16">
          <div className="services-header-reveal">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-white/45">
              Why Work With Me
            </p>
            <h3 className="font-display text-3xl font-black leading-tight text-white sm:text-5xl">
              Built for outcomes, not just handoff.
            </h3>
            <p className="mt-6 max-w-xl text-base leading-8 text-frost/68">
              Every build is shaped around clarity, maintainability and the
              business result the product needs to create.
            </p>
            <div className="mt-8">
              <MagneticLink href="#contact-form">Start a Project</MagneticLink>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.article
                  key={value.title}
                  className="value-card group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_22px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-90px" }}
                  transition={{ delay: index * 0.07, duration: 0.78, ease: premiumEase }}
                  whileHover={{ y: -5 }}
                >
                  <span className="relative z-10 flex size-11 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] text-cyanflare">
                    <Icon className="size-5" />
                  </span>
                  <h4 className="relative z-10 mt-6 text-xl font-bold text-white">{value.title}</h4>
                  <p className="relative z-10 mt-3 leading-7 text-frost/66">{value.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="process-showcase mt-28 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_28px_100px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-white/45">
                Process
              </p>
              <h3 className="font-display text-3xl font-black leading-tight text-white sm:text-5xl">
                From idea to shipped product.
              </h3>
            </div>
            <p className="max-w-xl text-base leading-8 text-frost/66">
              A focused workflow keeps decisions clear, scope controlled and
              momentum high from first conversation to launch.
            </p>
          </div>

          <div className="relative grid gap-5 lg:grid-cols-4">
            <div aria-hidden="true" className="process-line hidden lg:block">
              <div className="process-progress" />
            </div>
            {process.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.step}
                  className="process-step relative z-10 rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.08, duration: 0.72, ease: premiumEase }}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-2xl border border-cyanflare/20 bg-cyanflare/10 text-cyanflare shadow-[0_0_28px_rgba(97,244,255,0.12)]">
                      <Icon className="size-5" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/34">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-white">{item.step}</h4>
                  <p className="mt-3 leading-7 text-frost/66">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

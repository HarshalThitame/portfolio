"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Box,
  Check,
  ChevronDown,
  Factory,
  Gauge,
  Languages,
  LineChart,
  MonitorSmartphone,
  PackageCheck,
  Smartphone,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { loadGsapScrollTrigger, shouldRunDepthMotion, shouldRunScrollMotion } from "@/lib/client-performance";
import { trackEvent } from "@/lib/analytics";

const premiumEase = [0.16, 1, 0.3, 1] as const;

type Project = {
  id: "flux3d" | "majhi-dairy";
  eyebrow: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  metrics: Array<{ label: string; value: string; icon: typeof Gauge }>;
  details: Array<{ title: string; body: string }>;
  primaryAction: string;
  primaryHref?: string;
  secondaryAction: string;
  secondaryHref: string;
  reverse?: boolean;
};

const projects: Project[] = [
  {
    id: "flux3d",
    eyebrow: "Industrial Manufacturing Platform",
    name: "FLUX3D",
    tagline: "Transforming Ideas Into Precision 3D Printed Solutions",
    description:
      "A modern business platform designed for showcasing professional 3D printing services, rapid prototyping capabilities and custom manufacturing solutions.",
    highlights: [
      "Premium business website",
      "Lead generation focused",
      "Responsive across all devices",
      "Modern UI/UX",
      "Performance optimized",
      "Professional brand presentation",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    metrics: [
      { label: "Quote flow", value: "Lead-ready", icon: Zap },
      { label: "Experience", value: "100%", icon: MonitorSmartphone },
      { label: "Category", value: "B2B", icon: Factory },
    ],
    details: [
      {
        title: "Challenge",
        body: "3D printing services need to communicate quality, material capability and trust quickly while guiding visitors toward an inquiry.",
      },
      {
        title: "Solution",
        body: "The platform presents services, pricing intent and manufacturing credibility through a polished responsive experience built for conversion.",
      },
      {
        title: "Outcome",
        body: "Flux3D feels like a professional manufacturing brand, helping customers understand the offer and move toward a project discussion faster.",
      },
    ],
    primaryAction: "Live Website",
    primaryHref: "https://flux3d.in",
    secondaryAction: "View Case Study",
    secondaryHref: "/projects/flux3d",
  },
  {
    id: "majhi-dairy",
    eyebrow: "Dairy Management Platform",
    name: "Majhi Dairy",
    tagline: "Digitizing Dairy Operations For Modern Farmers",
    description:
      "A comprehensive dairy management application designed to streamline milk collection, farmer records, reporting and multilingual workflows.",
    highlights: [
      "Multi-language support",
      "Marathi and English interface",
      "Milk collection tracking",
      "Farmer management",
      "Production records",
      "Analytics and reporting",
      "Mobile-first experience",
    ],
    stack: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    metrics: [
      { label: "Languages", value: "2", icon: Languages },
      { label: "Workflow", value: "Mobile", icon: Smartphone },
      { label: "Reports", value: "Live", icon: LineChart },
    ],
    details: [
      {
        title: "Challenge",
        body: "Dairy operations rely on accurate daily collection, farmer records and reports, often across teams that need simple mobile workflows.",
      },
      {
        title: "Solution",
        body: "Majhi Dairy centralizes milk entries, farmer profiles, multilingual UI patterns and reporting in a practical mobile-first product.",
      },
      {
        title: "Outcome",
        body: "The platform reduces manual tracking friction and creates a clearer operational system for collection, records and decision-making.",
      },
    ],
    primaryAction: "Live Demo",
    primaryHref: "/projects/majhi-dairy#gallery",
    secondaryAction: "View Details",
    secondaryHref: "/projects/majhi-dairy",
    reverse: true,
  },
];

const sectionParticles = [
  { left: 5, top: 14, size: 2, delay: "-2s", duration: "10s", dx: "26px", dy: "-24px" },
  { left: 18, top: 44, size: 1, delay: "-7s", duration: "12s", dx: "-18px", dy: "32px" },
  { left: 33, top: 82, size: 2, delay: "-4s", duration: "9s", dx: "20px", dy: "-28px" },
  { left: 56, top: 18, size: 1, delay: "-6s", duration: "13s", dx: "-26px", dy: "28px" },
  { left: 78, top: 62, size: 2, delay: "-1s", duration: "8s", dx: "22px", dy: "-20px" },
  { left: 92, top: 34, size: 1, delay: "-9s", duration: "12s", dx: "-20px", dy: "26px" },
];

function ProjectButton({
  children,
  href,
  variant,
  projectId,
  action,
}: {
  children: ReactNode;
  href?: string;
  variant: "primary" | "secondary";
  projectId: Project["id"];
  action: string;
}) {
  const className =
    variant === "primary"
      ? "project-button magnetic-button group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full bg-pearl px-5 text-sm font-bold text-ink shadow-[0_0_42px_rgba(248,251,255,0.14)] transition duration-500 hover:shadow-[0_0_70px_rgba(97,244,255,0.24)]"
      : "project-button magnetic-button group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full border border-white/12 bg-white/[0.055] px-5 text-sm font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl transition duration-500 hover:border-white/28 hover:bg-white/[0.085]";

  const content = (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition duration-700 group-hover:translate-x-full group-hover:opacity-100"
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className={className}
        onClick={() => trackEvent("project_click", { project: projectId, action })}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={() => trackEvent("project_click", { project: projectId, action })}
    >
      {content}
    </button>
  );
}

function FluxMockup() {
  return (
    <div className="mockup-stage flux-stage">
      <motion.div
        className="device-mockup desktop-mockup project-depth"
        whileHover={{ scale: 1.025, rotateX: 1.5, rotateY: -2 }}
        transition={{ duration: 0.5, ease: premiumEase }}
      >
        <div className="browser-bar">
          <span />
          <span />
          <span />
        </div>
        <div className="flux-screen">
          <div className="flux-nav">
            <strong>FLUX3D</strong>
            <span>Quote</span>
          </div>
          <div className="flux-live-bar" aria-hidden="true">
            <span>Prototype build</span>
            <strong>Layer 184 / 220</strong>
          </div>
          <div className="flux-hero-grid">
            <div>
              <p>Industrial 3D Printing</p>
              <h4>Precision parts, fast prototypes.</h4>
              <div className="flux-cta-line" />
            </div>
            <div className="flux-print-lab" aria-hidden="true">
              <div className="flux-lab-grid" />
              <div className="flux-gantry">
                <span />
              </div>
              <div className="flux-print-head">
                <Box className="size-5" />
              </div>
              <div className="flux-laser-beam" />
              <div className="flux-scan-ring" />
              <div className="flux-build-plate">
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="flux-part-core">
                <span />
                <span />
              </div>
            </div>
          </div>
          <div className="flux-materials">
            <span>PLA</span>
            <span>PETG</span>
            <span>ABS</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="flux-status-card flux-quote-card project-depth"
        animate={{ y: [8, -9, 8], rotate: [-1.2, 1.4, -1.2] }}
        transition={{ duration: 8.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <PackageCheck className="size-5 text-cyanflare" />
        <div>
          <span>Instant RFQ</span>
          <strong>Manufacturing ready</strong>
        </div>
      </motion.div>

      <motion.div
        className="flux-status-card flux-tolerance-card project-depth"
        animate={{ y: [-7, 8, -7], rotate: [1, -1.5, 1] }}
        transition={{ duration: 9.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Gauge className="size-5 text-rosegold" />
        <div>
          <span>Tolerance</span>
          <strong>0.2mm detail</strong>
        </div>
      </motion.div>

      <motion.div
        className="device-mockup tablet-mockup project-depth"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="tablet-content">
          <PackageCheck className="size-7 text-cyanflare" />
          <strong>Rapid Quote</strong>
          <span>Material ready</span>
          <div className="mini-lines">
            <i />
            <i />
            <i />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="device-mockup phone-mockup project-depth"
        animate={{ y: [10, -12, 10] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="phone-notch" />
        <div className="phone-flux">
          <span>Services</span>
          <strong>3D Print</strong>
          <div className="phone-list">
            <i />
            <i />
            <i />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function DairyMockup() {
  return (
    <div className="mockup-stage dairy-stage">
      <motion.div
        className="device-mockup dashboard-mockup project-depth"
        whileHover={{ scale: 1.025, rotateX: 1.5, rotateY: 2 }}
        transition={{ duration: 0.5, ease: premiumEase }}
      >
        <div className="dashboard-top">
          <div>
            <span>Majhi Dairy</span>
            <strong>Collection Dashboard</strong>
          </div>
          <div className="language-pill">मराठी / EN</div>
        </div>
        <div className="dairy-live-strip" aria-hidden="true">
          <span>Live collection</span>
          <strong>Synced 4 min ago</strong>
        </div>
        <div className="dairy-grid">
          <div className="dairy-stat">
            <span>Milk Today</span>
            <strong>1,248 L</strong>
          </div>
          <div className="dairy-stat">
            <span>Farmers</span>
            <strong>86</strong>
          </div>
          <div className="dairy-flow-panel" aria-hidden="true">
            <div className="dairy-route-map">
              <span className="dairy-route-line" />
              <i />
              <i />
              <i />
              <b />
            </div>
            <div className="dairy-collection-card">
              <span>Farmer entry</span>
              <strong>12.5 L</strong>
              <small>Fat 4.2 • SNF 8.6</small>
              <div className="dairy-fill-meter">
                <i />
              </div>
            </div>
          </div>
          <div className="dairy-report-panel" aria-hidden="true">
            <div className="dairy-report-title">
              <BarChart3 className="size-4 text-cyanflare" />
              <span>Daily report</span>
            </div>
            <div className="dairy-report-bars">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="dairy-report-feed">
              <span />
              <span />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="device-mockup dairy-phone project-depth"
        animate={{ y: [-8, 12, -8] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="phone-notch" />
        <div className="dairy-mobile-content">
          <Languages className="size-5 text-rosegold" />
          <strong>दूध संकलन</strong>
          <span>Farmer: Patil</span>
          <div className="dairy-language-switch">
            <span>मराठी</span>
            <span>EN</span>
            <i />
          </div>
          <div className="milk-entry">
            <b>12.5 L</b>
            <small>Fat 4.2</small>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="floating-analytics project-depth"
        animate={{ y: [8, -10, 8], rotate: [-1, 1.5, -1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <BarChart3 className="size-5 text-cyanflare" />
        <span>Payment & report synced</span>
      </motion.div>
    </div>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`project-visual-wrap ${project.id}`}>
      <div aria-hidden="true" className="project-visual-glow" />
      {project.id === "flux3d" ? <FluxMockup /> : <DairyMockup />}

      <div className="project-metrics">
        {project.metrics.map((metric, index) => {
          const Icon = metric.icon;

          return (
            <motion.div
              key={metric.label}
              className="project-metric-card"
              initial={{ opacity: 0, y: 18, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.08, duration: 0.68, ease: premiumEase }}
            >
              <Icon className="size-4 text-cyanflare" />
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ProjectCase({ project, index }: { project: Project; index: number }) {
  return (
    <article
      className={`project-case ${project.reverse ? "project-case-reverse" : ""} relative grid min-h-[720px] items-center gap-10 overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.035] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_30px_120px_rgba(0,0,0,0.36)] backdrop-blur-2xl sm:p-7 lg:grid-cols-2 lg:p-10`}
    >
      <div aria-hidden="true" className="project-case-light" />

      <motion.div
        className={`project-visual order-1 ${project.reverse ? "lg:order-2" : "lg:order-1"}`}
        initial={{ opacity: 0, y: 42 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-110px" }}
        transition={{ delay: 0.1, duration: 0.95, ease: premiumEase }}
      >
        <ProjectVisual project={project} />
      </motion.div>

      <motion.div
        className={`project-copy order-2 relative z-10 ${project.reverse ? "lg:order-1" : "lg:order-2"}`}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-110px" }}
        transition={{ delay: 0.18, duration: 0.9, ease: premiumEase }}
      >
        <p className="mb-5 inline-flex rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyanflare/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl">
          {project.eyebrow}
        </p>
        <h3 className="font-display text-5xl font-black uppercase leading-[0.9] text-white sm:text-6xl lg:text-7xl">
          {project.name}
        </h3>
        <p className="mt-5 max-w-xl text-xl font-semibold leading-8 text-white/82">
          {project.tagline}
        </p>
        <p className="mt-5 max-w-2xl text-base leading-8 text-frost/70">
          {project.description}
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {project.highlights.map((highlight) => (
            <div key={highlight} className="flex items-center gap-3 text-sm font-medium text-white/72">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-cyanflare/20 bg-cyanflare/10 text-cyanflare">
                <Check className="size-3.5" />
              </span>
              {highlight}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white/58 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ProjectButton
            href={project.primaryHref}
            variant="primary"
            projectId={project.id}
            action={project.primaryAction}
          >
            {project.primaryAction}
          </ProjectButton>
          <ProjectButton
            href={project.secondaryHref}
            variant="secondary"
            projectId={project.id}
            action={project.secondaryAction}
          >
            {project.secondaryAction}
          </ProjectButton>
        </div>

        <div className="mt-8 space-y-3">
          {project.details.map((detail, detailIndex) => (
            <details key={detail.title} className="case-detail" open={detailIndex === 0}>
              <summary>
                <span>{detail.title}</span>
                <ChevronDown className="case-detail-icon size-4" />
              </summary>
              <p>{detail.body}</p>
            </details>
          ))}
        </div>

        <div className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-white/28">
          Case Study {String(index + 1).padStart(2, "0")}
        </div>
      </motion.div>
    </article>
  );
}

export function ProjectsSection() {
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
      const headerItems = gsap.utils.toArray<HTMLElement>(".projects-header-reveal");

      gsap.fromTo(
        headerItems,
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

      gsap.utils.toArray<HTMLElement>(".project-case").forEach((caseElement) => {
        gsap.fromTo(
          caseElement,
          { y: 70, opacity: 0.78 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: caseElement,
              start: "top 82%",
              end: "top 34%",
              scrub: 0.7,
            },
          },
        );
      });

      if (runDepthMotion) {
        gsap.utils.toArray<HTMLElement>(".project-depth").forEach((depthElement) => {
          gsap.to(depthElement, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: depthElement.closest(".project-case"),
              start: "top bottom",
              end: "bottom top",
              scrub: 0.85,
            },
          });
        });

        gsap.to(".projects-bg-shift", {
          yPercent: -18,
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
      id="featured-projects"
      ref={sectionRef}
      className="projects-section relative overflow-hidden bg-ink py-28 text-pearl sm:py-36 lg:py-44"
      aria-labelledby="featured-projects-heading"
    >
      <div aria-hidden="true" className="projects-mesh absolute inset-0" />
      <div aria-hidden="true" className="projects-bg-shift absolute left-[-12%] top-[8%] size-[34rem] rounded-full bg-cyanflare/12 blur-[115px]" />
      <div aria-hidden="true" className="projects-bg-shift absolute right-[-14%] top-[42%] size-[42rem] rounded-full bg-rosegold/9 blur-[130px]" />
      <div aria-hidden="true" className="projects-bg-shift absolute bottom-[4%] left-[28%] size-[36rem] rounded-full bg-violetflare/12 blur-[120px]" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_bottom,#04050a,rgba(4,5,10,0.86)_14%,rgba(4,5,10,0.78)_84%,#04050a)]" />

      <div aria-hidden="true" className="absolute inset-0">
        {sectionParticles.map((particle) => (
          <span
            key={`${particle.left}-${particle.top}`}
            className="particle absolute rounded-full bg-cyanflare/85 shadow-[0_0_18px_rgba(97,244,255,0.45)]"
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
        <header className="mx-auto mb-20 max-w-5xl text-center lg:mb-28">
          <p className="projects-header-reveal mb-5 inline-flex rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-cyanflare/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
            Featured Work
          </p>
          <h2
            id="featured-projects-heading"
            className="projects-header-reveal font-display text-5xl font-black leading-[0.95] tracking-normal text-white sm:text-6xl md:text-7xl xl:text-8xl"
          >
            Selected Projects
            <span className="headline-accent block">Built With Purpose</span>
          </h2>
          <p className="projects-header-reveal mx-auto mt-7 max-w-3xl text-lg leading-8 text-frost/70 sm:text-xl">
            A collection of products, platforms and digital experiences designed
            to solve real business problems.
          </p>
        </header>

        <div className="space-y-12 lg:space-y-20">
          {projects.map((project, index) => (
            <ProjectCase key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

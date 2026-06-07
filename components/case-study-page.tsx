"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Code2,
  Database,
  ExternalLink,
  Factory,
  Gauge,
  Layers3,
  MonitorSmartphone,
  MousePointerClick,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { CaseStudy } from "@/lib/case-studies";
import { getNextCaseStudy } from "@/lib/case-studies";
import { trackEvent } from "@/lib/analytics";
import {
  getClientPerformanceTier,
  loadGsapScrollTrigger,
  shouldRunDepthMotion,
  shouldRunScrollMotion,
} from "@/lib/client-performance";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const particles = [
  { left: 8, top: 18, size: 2, delay: "-2s", duration: "10s", dx: "24px", dy: "-22px" },
  { left: 24, top: 72, size: 1, delay: "-7s", duration: "12s", dx: "-18px", dy: "28px" },
  { left: 48, top: 22, size: 2, delay: "-4s", duration: "9s", dx: "18px", dy: "30px" },
  { left: 72, top: 16, size: 1, delay: "-8s", duration: "13s", dx: "-26px", dy: "22px" },
  { left: 90, top: 68, size: 2, delay: "-1s", duration: "8s", dx: "24px", dy: "-24px" },
];

const visualIcons = {
  desktop: MonitorSmartphone,
  mobile: Smartphone,
  dashboard: Layers3,
  analytics: BarChart3,
  workflow: Workflow,
  lead: MousePointerClick,
};

function setMagnet(element: HTMLElement | null, event: PointerEvent<HTMLElement>) {
  if (!element) return;

  const rect = element.getBoundingClientRect();
  const x = event.clientX - rect.left - rect.width / 2;
  const y = event.clientY - rect.top - rect.height / 2;

  element.style.setProperty("--magnet-x", `${x * 0.15}px`);
  element.style.setProperty("--magnet-y", `${y * 0.22}px`);
}

function resetMagnet(element: HTMLElement | null) {
  if (!element) return;
  element.style.setProperty("--magnet-x", "0px");
  element.style.setProperty("--magnet-y", "0px");
}

function CaseButton({
  href,
  children,
  variant = "primary",
  external,
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const className =
    variant === "primary"
      ? "case-button magnetic-button group relative inline-flex min-h-[3.35rem] items-center justify-center overflow-hidden rounded-full bg-pearl px-6 text-sm font-black uppercase tracking-[0.1em] text-ink shadow-[0_0_48px_rgba(248,251,255,0.15)] transition duration-500 hover:shadow-[0_0_80px_rgba(97,244,255,0.28)]"
      : "case-button magnetic-button group relative inline-flex min-h-[3.35rem] items-center justify-center overflow-hidden rounded-full border border-white/12 bg-white/[0.055] px-6 text-sm font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl transition duration-500 hover:border-white/28 hover:bg-white/[0.085]";

  return (
    <a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={className}
      onPointerMove={(event) => setMagnet(ref.current, event)}
      onPointerLeave={() => resetMagnet(ref.current)}
      onClick={onClick}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition duration-700 group-hover:translate-x-full group-hover:opacity-100"
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {external ? (
          <ExternalLink className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        ) : (
          <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </span>
    </a>
  );
}

function ProductMockup({ project, visual, large = false }: { project: CaseStudy; visual: CaseStudy["features"][number]["visual"]; large?: boolean }) {
  const Icon = visualIcons[visual];
  const isDairy = project.slug === "majhi-dairy";

  return (
    <div className={`case-product-mockup ${large ? "case-product-mockup-large" : ""} ${project.accent === "rose" ? "case-accent-rose" : "case-accent-cyan"}`}>
      <div aria-hidden="true" className="case-product-glow" />
      <div className={`case-screen case-screen-${visual}`}>
        <div className="case-screen-top">
          <div>
            <span>{project.category}</span>
            <strong>{project.name}</strong>
          </div>
          <span className="case-screen-pill">{isDairy ? "मराठी / EN" : "Quote Ready"}</span>
        </div>

        <div className="case-screen-main">
          <div className="case-screen-hero">
            <Icon className="size-9" />
            <div>
              <span>{visual === "analytics" ? "Insights" : visual === "mobile" ? "Mobile Flow" : "Product System"}</span>
              <strong>
                {visual === "lead"
                  ? "Inquiry flow"
                  : visual === "workflow"
                    ? "Daily workflow"
                    : visual === "analytics"
                      ? "Live reporting"
                      : visual === "dashboard"
                        ? "Control center"
                        : visual === "mobile"
                          ? isDairy
                            ? "दूध संकलन"
                            : "Service preview"
                          : "Premium interface"}
              </strong>
            </div>
          </div>

          <div className="case-screen-grid">
            <div className="case-kpi-card">
              <span>{isDairy ? "Milk Today" : "Quote Flow"}</span>
              <strong>{isDairy ? "1,248 L" : "Lead-ready"}</strong>
            </div>
            <div className="case-kpi-card">
              <span>{isDairy ? "Farmers" : "Devices"}</span>
              <strong>{isDairy ? "86" : "100%"}</strong>
            </div>
          </div>

          <div className="case-chart" aria-hidden="true">
            {[52, 74, 42, 86, 64, 78].map((height, index) => (
              <i key={index} style={{ height: `${height}%` }} />
            ))}
          </div>

          <div className="case-lines" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="case-section-heading case-reveal">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {children ? <div className="case-section-copy">{children}</div> : null}
    </div>
  );
}

function OverviewSection({ project }: { project: CaseStudy }) {
  const overview = [
    { label: "Industry", value: project.industry, icon: Factory },
    { label: "Target Users", value: project.targetUsers, icon: MonitorSmartphone },
    { label: "Project Type", value: project.projectType, icon: Layers3 },
    { label: "Timeline", value: project.timeline, icon: Gauge },
    { label: "Role", value: project.role.join(" / "), icon: Code2 },
  ];

  return (
    <section className="case-section" aria-labelledby="overview-heading">
      <SectionHeader eyebrow="Overview" title="Product context before pixels." />
      <div className="case-overview-grid">
        <motion.article
          className="case-story-card case-reveal lg:col-span-2"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.78, ease: premiumEase }}
        >
          <Sparkles className="size-6 text-cyanflare" />
          <h3 id="overview-heading">Overview</h3>
          <p>{project.description}</p>
        </motion.article>
        {overview.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.article
              key={item.label}
              className="case-info-card case-reveal"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ delay: index * 0.04, duration: 0.7, ease: premiumEase }}
            >
              <Icon className="size-5 text-cyanflare" />
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function StorySection({
  title,
  intro,
  items,
  mode,
}: {
  title: string;
  intro: string;
  items: Array<{ title: string; description: string }>;
  mode: "challenge" | "solution";
}) {
  return (
    <section className={`case-section case-story-section case-story-${mode}`}>
      <div className="case-story-layout">
        <SectionHeader eyebrow={title} title={mode === "challenge" ? "The problem behind the build." : "The product strategy."}>
          <p>{intro}</p>
        </SectionHeader>

        <div className="case-story-list">
          {items.map((item, index) => (
            <motion.article
              key={item.title}
              className="case-story-step"
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ delay: index * 0.06, duration: 0.72, ease: premiumEase }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureShowcase({ project }: { project: CaseStudy }) {
  return (
    <section className="case-section">
      <SectionHeader eyebrow="Feature Showcase" title="Designed around the work users actually do." />
      <div className="case-feature-stack">
        {project.features.map((feature, index) => (
          <motion.article
            key={feature.title}
            className={`case-feature-row ${index % 2 ? "case-feature-reverse" : ""}`}
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.82, ease: premiumEase }}
          >
            <div className="case-feature-visual case-depth">
              <ProductMockup project={project} visual={feature.visual} />
            </div>
            <div className="case-feature-copy">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function GallerySection({ project }: { project: CaseStudy }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex === null ? null : project.gallery[selectedIndex];

  return (
    <section id="gallery" className="case-section">
      <SectionHeader eyebrow="Visual Gallery" title="Screens built for product clarity." />
      <div className="case-gallery-grid">
        {project.gallery.map((item, index) => (
          <motion.button
            key={item.title}
            type="button"
            className="case-gallery-card"
            onClick={() => setSelectedIndex(index)}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ delay: index * 0.05, duration: 0.74, ease: premiumEase }}
          >
            <ProductMockup project={project} visual={item.visual} />
            <div className="case-gallery-meta">
              <span>{item.type}</span>
              <strong>{item.title}</strong>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected ? (
          <motion.div
            className="case-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.title} preview`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              className="case-lightbox-panel"
              initial={{ y: 28, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.96 }}
              transition={{ duration: 0.48, ease: premiumEase }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="case-lightbox-close"
                aria-label="Close gallery preview"
                onClick={() => setSelectedIndex(null)}
              >
                <X className="size-5" />
              </button>
              <ProductMockup project={project} visual={selected.visual} large />
              <div className="case-lightbox-copy">
                <span>{selected.type}</span>
                <h3>{selected.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function StackSection({ project }: { project: CaseStudy }) {
  const orbitIcons = [Code2, Layers3, Database, ShieldCheck, Rocket, Sparkles];

  return (
    <section className="case-section">
      <SectionHeader eyebrow="Technology Stack" title="A modern technical foundation." />
      <div className="case-stack-layout">
        <div className="case-stack-orbit case-reveal" aria-hidden="true">
          <span className="case-stack-core">
            <Code2 className="size-8" />
          </span>
          {project.stack.map((item, index) => {
            const Icon = orbitIcons[index % orbitIcons.length];
            return (
              <span key={item} className={`case-stack-node node-${index + 1}`}>
                <Icon className="size-5" />
              </span>
            );
          })}
        </div>

        <div className="case-stack-grid">
          {project.stack.map((item, index) => {
            const Icon = orbitIcons[index % orbitIcons.length];
            return (
              <motion.article
                key={item}
                className="case-stack-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ delay: index * 0.05, duration: 0.68, ease: premiumEase }}
              >
                <Icon className="size-5 text-cyanflare" />
                <strong>{item}</strong>
                <span>{index < 2 ? "Interface layer" : index < 4 ? "Application layer" : "Delivery layer"}</span>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProcessSection({ project }: { project: CaseStudy }) {
  return (
    <section className="case-section">
      <SectionHeader eyebrow="Development Process" title="From research to launch." />
      <div className="case-process">
        <div aria-hidden="true" className="case-process-line">
          <div className="case-process-progress" />
        </div>
        {project.process.map((step, index) => (
          <motion.article
            key={step.phase}
            className="case-process-step"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.05, duration: 0.7, ease: premiumEase }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{step.phase}</h3>
            <p>{step.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function ResultsSection({ project }: { project: CaseStudy }) {
  return (
    <section className="case-section">
      <SectionHeader eyebrow="Results" title="Business value created through product thinking." />
      <div className="case-results-grid">
        {project.results.map((result, index) => (
          <motion.article
            key={result.label}
            className="case-result-card"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ delay: index * 0.06, duration: 0.72, ease: premiumEase }}
            whileHover={{ y: -5 }}
          >
            <strong>{result.value}</strong>
            <span>{result.label}</span>
            <p>{result.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function CaseStudyPage({ project }: { project: CaseStudy }) {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const nextProject = getNextCaseStudy(project.slug);

  useEffect(() => {
    trackEvent("project_page_visit", {
      project: project.slug,
      title: project.name,
    });
  }, [project.name, project.slug]);

  useEffect(() => {
    if (!shouldRunScrollMotion()) return;

    let cancelled = false;
    let context: { revert: () => void } | undefined;
    let delayTimer = 0;
    let idleHandle = 0;
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    const setupCaseMotion = async () => {
      const runDepthMotion = shouldRunDepthMotion();
      const { gsap } = await loadGsapScrollTrigger();

      if (cancelled) return;

      context = gsap.context(() => {
        gsap.fromTo(
          ".case-reveal",
          { y: 38, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: pageRef.current,
              start: "top 72%",
            },
          },
        );

        if (runDepthMotion) {
          gsap.utils.toArray<HTMLElement>(".case-depth").forEach((element) => {
            gsap.to(element, {
              yPercent: -7,
              ease: "none",
              scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.9,
              },
            });
          });
        }

        gsap.fromTo(
          ".case-process-progress",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".case-process",
              start: "top 74%",
              end: "bottom 58%",
              scrub: 0.8,
            },
          },
        );
      }, pageRef);
    };

    const delay = getClientPerformanceTier() === "full" ? 1200 : 2200;
    delayTimer = window.setTimeout(() => {
      if (idleWindow.requestIdleCallback) {
        idleHandle = idleWindow.requestIdleCallback(() => void setupCaseMotion(), { timeout: 1800 });
        return;
      }

      void setupCaseMotion();
    }, delay);

    return () => {
      cancelled = true;
      window.clearTimeout(delayTimer);
      if (idleHandle && idleWindow.cancelIdleCallback) idleWindow.cancelIdleCallback(idleHandle);
      context?.revert();
    };
  }, []);

  return (
    <div
      ref={pageRef}
      className={`case-page ${project.accent === "rose" ? "case-accent-rose" : "case-accent-cyan"} relative overflow-hidden bg-ink text-pearl`}
    >
      <div aria-hidden="true" className="case-mesh absolute inset-0" />
      <div aria-hidden="true" className="case-bg-shift absolute left-[-14%] top-[4%] size-[40rem] rounded-full bg-cyanflare/12 blur-[125px]" />
      <div aria-hidden="true" className="case-bg-shift absolute right-[-16%] top-[18%] size-[44rem] rounded-full bg-violetflare/14 blur-[135px]" />
      <div aria-hidden="true" className="case-bg-shift absolute bottom-[6%] left-[28%] size-[34rem] rounded-full bg-rosegold/10 blur-[120px]" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_bottom,#04050a,rgba(4,5,10,0.82)_12%,rgba(4,5,10,0.8)_86%,#04050a)]" />

      <div aria-hidden="true" className="absolute inset-0">
        {particles.map((particle) => (
          <span
            key={`${particle.left}-${particle.top}`}
            className="particle absolute rounded-full bg-cyanflare/80 shadow-[0_0_18px_rgba(97,244,255,0.48)]"
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

      <main className="relative z-10">
        <section className="case-hero mx-auto grid min-h-screen w-full max-w-[1440px] items-center gap-12 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[0.82fr_1fr] lg:px-12 xl:px-16">
          <div>
            <motion.a
              href="/#featured-projects"
              className="case-back-link"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: premiumEase }}
            >
              <ArrowLeft className="size-4" />
              Back To Portfolio
            </motion.a>
            <motion.p
              className="case-kicker"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.75, ease: premiumEase }}
            >
              {project.category}
            </motion.p>
            <motion.h1
              className="font-display text-[4.2rem] font-black uppercase leading-[0.82] tracking-normal text-white min-[390px]:text-[5rem] sm:text-[7rem] lg:text-[8.6rem] xl:text-[10rem]"
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.95, ease: premiumEase }}
            >
              {project.name}
            </motion.h1>
            <motion.p
              className="mt-7 max-w-2xl text-xl font-semibold leading-9 text-white/82 sm:text-2xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34, duration: 0.82, ease: premiumEase }}
            >
              {project.tagline}
            </motion.p>
            <motion.p
              className="mt-5 max-w-2xl text-base leading-8 text-frost/70 sm:text-lg"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.44, duration: 0.82, ease: premiumEase }}
            >
              {project.description}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.72, ease: premiumEase }}
            >
              {project.stack.map((item) => (
                <span key={item} className="case-stack-pill">
                  {item}
                </span>
              ))}
            </motion.div>

            <motion.div
              className="mt-9 flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.72, ease: premiumEase }}
            >
              <CaseButton
                href={project.liveHref}
                external={project.liveHref.startsWith("http")}
                onClick={() => trackEvent("project_click", { project: project.slug, action: project.liveLabel })}
              >
                {project.liveLabel}
              </CaseButton>
              <CaseButton href="/#featured-projects" variant="secondary">
                Back To Portfolio
              </CaseButton>
            </motion.div>
          </div>

          <motion.div
            className="case-depth"
            initial={{ opacity: 0, y: 42, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: premiumEase }}
          >
            <ProductMockup project={project} visual={project.slug === "flux3d" ? "lead" : "dashboard"} large />
          </motion.div>
        </section>

        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <OverviewSection project={project} />
          <StorySection title="The Challenge" intro={project.challenge.intro} items={project.challenge.points} mode="challenge" />
          <StorySection title="The Solution" intro={project.solution.intro} items={project.solution.pillars} mode="solution" />
          <FeatureShowcase project={project} />
          <GallerySection project={project} />
          <StackSection project={project} />
          <ProcessSection project={project} />
          <ResultsSection project={project} />

          <section className="case-section">
            <motion.article
              className="case-testimonial"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ duration: 0.82, ease: premiumEase }}
            >
              <p>Testimonial</p>
              <blockquote>{project.testimonial.quote}</blockquote>
              <div>
                <strong>{project.testimonial.author}</strong>
                <span>{project.testimonial.role}</span>
              </div>
            </motion.article>
          </section>

          <section className="case-section pb-28">
            <div className="case-final-cta">
              <div>
                <p>Next Project: {nextProject.name}</p>
                <h2>Interested In Building Something Similar?</h2>
                <span>Turn a business problem into a polished product experience.</span>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <CaseButton href="/#contact-form">Start A Project</CaseButton>
                <CaseButton href="/#contact" variant="secondary">
                  Contact Me
                </CaseButton>
                <CaseButton href="/#consultation" variant="secondary">
                  Book Consultation
                </CaseButton>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import type { ComponentType, CSSProperties, PointerEvent, ReactNode } from "react";
import {
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  Code2,
  Database,
  Factory,
  Gauge,
  Globe2,
  LayoutDashboard,
  Mail,
  MessageCircle,
  MonitorSmartphone,
  Rocket,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { loadGsapScrollTrigger, shouldRunDepthMotion, shouldRunScrollMotion } from "@/lib/client-performance";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const industries = [
  {
    title: "Dairy Businesses",
    description: "Collection tracking, farmer records, reports and mobile-first operations.",
    icon: Users,
  },
  {
    title: "Manufacturing Companies",
    description: "Modern websites, inquiry systems and internal dashboards for operations.",
    icon: Factory,
  },
  {
    title: "Startups",
    description: "Launch-ready MVPs, landing pages and scalable product foundations.",
    icon: Rocket,
  },
  {
    title: "Small Businesses",
    description: "Professional online presence and software that reduces manual work.",
    icon: Store,
  },
  {
    title: "Service Providers",
    description: "Lead-generation websites, booking flows and trust-focused interfaces.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Local Businesses",
    description: "Responsive websites, multilingual support and customer inquiry flows.",
    icon: Building2,
  },
  {
    title: "AI Startups",
    description: "AI-powered workflows, assistant interfaces and automation tools.",
    icon: Bot,
  },
  {
    title: "SaaS Founders",
    description: "Full-stack platforms with authentication, dashboards and databases.",
    icon: Database,
  },
];

const problems = [
  {
    title: "Business has no modern website",
    description: "Create a polished, mobile-responsive website that makes the business look credible and easy to contact.",
  },
  {
    title: "Manual business processes",
    description: "Replace spreadsheets and repeated manual tasks with dashboards, forms and structured workflows.",
  },
  {
    title: "Poor online presence",
    description: "Improve brand presentation, SEO basics, performance and trust signals across the website.",
  },
  {
    title: "No customer inquiry system",
    description: "Add clear conversion paths, contact forms, WhatsApp CTAs and lead capture flows.",
  },
  {
    title: "Need custom software",
    description: "Build focused software around your exact business process instead of forcing generic tools.",
  },
  {
    title: "Need admin dashboard",
    description: "Create secure admin panels for records, reports, analytics and team workflows.",
  },
  {
    title: "Need AI integration",
    description: "Add AI assistants, automation, intelligent search or content workflows where they create real value.",
  },
  {
    title: "Need multilingual support",
    description: "Design products for users who need local-language clarity, including Marathi and English workflows.",
  },
];

const packages = [
  {
    title: "Business Website",
    description: "A premium online presence built for credibility, speed and conversion.",
    includes: ["Modern design", "Mobile responsive", "SEO optimized", "Contact forms"],
    icon: Globe2,
    featured: false,
  },
  {
    title: "Business Dashboard",
    description: "A custom dashboard to manage operations, records and reporting.",
    includes: ["Admin panel", "Reporting", "User management", "Analytics"],
    icon: LayoutDashboard,
    featured: true,
  },
  {
    title: "Custom SaaS Platform",
    description: "A full-stack product foundation for scalable software businesses.",
    includes: ["Full-stack application", "Authentication", "Database", "Scalable architecture"],
    icon: LayersIcon,
    featured: false,
  },
];

function LayersIcon({ className }: { className?: string }) {
  return <Code2 className={className} />;
}

const reasons = [
  { title: "Modern Technologies", icon: Code2 },
  { title: "Business-Focused Solutions", icon: BriefcaseBusiness },
  { title: "Fast Performance", icon: Gauge },
  { title: "Mobile-First Design", icon: MonitorSmartphone },
  { title: "Clean User Experience", icon: Sparkles },
  { title: "Long-Term Scalability", icon: ShieldCheck },
];

const process = [
  {
    step: "Discovery Call",
    description: "Understand goals and requirements.",
    icon: MessageCircle,
  },
  {
    step: "Planning",
    description: "Define scope and solution.",
    icon: SearchCheck,
  },
  {
    step: "Design & Development",
    description: "Build and refine.",
    icon: Code2,
  },
  {
    step: "Launch",
    description: "Deploy and optimize.",
    icon: Rocket,
  },
  {
    step: "Support",
    description: "Ongoing improvements.",
    icon: Workflow,
  },
];

const trustSignals = [
  "Full Stack Development",
  "Next.js Expertise",
  "Business Software Development",
  "AI Integrations",
  "Responsive Design",
  "SEO Optimization",
  "Production Deployments",
  "Modern UI/UX",
];

const metrics = [
  { value: 20, suffix: "+", label: "Projects Built", icon: Rocket },
  { value: 16, suffix: "+", label: "Technologies Used", icon: Code2 },
  { value: 6, suffix: "", label: "Industries Served", icon: BriefcaseBusiness },
  { value: 10, suffix: "+", label: "Applications Deployed", icon: Zap },
];

const testimonials = [
  {
    quote: "Future client testimonial ready for project feedback and measurable business outcomes.",
    author: "Client Name",
    role: "Business Owner",
  },
  {
    quote: "Use this space for launch results, workflow improvements or product adoption feedback.",
    author: "Founder Name",
    role: "Startup Founder",
  },
  {
    quote: "Prepared for testimonials that reinforce trust, execution quality and long-term support.",
    author: "Team Lead",
    role: "Operations",
  },
];

const acquisitionParticles = [
  { left: 8, top: 18, size: 2, delay: "-4s", duration: "10s", dx: "22px", dy: "-24px" },
  { left: 23, top: 74, size: 1, delay: "-7s", duration: "12s", dx: "-18px", dy: "26px" },
  { left: 48, top: 26, size: 2, delay: "-2s", duration: "9s", dx: "18px", dy: "28px" },
  { left: 76, top: 16, size: 1, delay: "-8s", duration: "13s", dx: "-24px", dy: "20px" },
  { left: 91, top: 70, size: 2, delay: "-1s", duration: "8s", dx: "22px", dy: "-22px" },
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

function AcquisitionButton({
  href,
  children,
  variant = "primary",
  eventSource,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  eventSource: string;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const isExternal = href.startsWith("http");

  return (
    <a
      ref={ref}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className={`acquisition-button magnetic-button group ${variant === "primary" ? "acquisition-button-primary" : "acquisition-button-secondary"}`}
      onPointerMove={(event) => setMagnet(ref.current, event)}
      onPointerLeave={() => resetMagnet(ref.current)}
      onClick={() => {
        trackEvent("cta_click", { source: eventSource, label: String(children) });
        if (href === siteConfig.links.whatsapp) {
          trackEvent("whatsapp_click", { source: eventSource });
        }
        if (href.includes("consultation")) {
          trackEvent("consultation_request", { source: eventSource });
        }
      }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition duration-700 group-hover:translate-x-full group-hover:opacity-100"
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>
  );
}

function AcquisitionCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    element.style.setProperty("--acq-x", `${x * 100}%`);
    element.style.setProperty("--acq-y", `${y * 100}%`);
  };

  return (
    <div
      ref={ref}
      className={`acquisition-card ${className}`}
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        const element = ref.current;
        if (!element) return;
        element.style.setProperty("--acq-x", "50%");
        element.style.setProperty("--acq-y", "50%");
      }}
    >
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="acquisition-heading acquisition-reveal">
      {eyebrow ? <p>{eyebrow}</p> : null}
      <h3>{title}</h3>
      {children ? <div>{children}</div> : null}
    </div>
  );
}

function CountMetric({
  value,
  suffix,
  label,
  icon: Icon,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const valueRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const startedAt = performance.now();
        const duration = 1200;

        const tick = (time: number) => {
          const progress = Math.min(1, (time - startedAt) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          if (valueRef.current) valueRef.current.textContent = String(Math.round(value * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <motion.article
      ref={ref}
      className="acquisition-metric-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.06, duration: 0.72, ease: premiumEase }}
    >
      <Icon className="size-5 text-cyanflare" />
      <strong>
        <span ref={valueRef}>0</span>
        {suffix}
      </strong>
      <span>{label}</span>
    </motion.article>
  );
}

export function ClientAcquisitionSection() {
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
        ".acquisition-reveal",
        { y: 42, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 74%",
          },
        },
      );

      if (runDepthMotion) {
        gsap.to(".acquisition-bg-shift", {
          yPercent: -16,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        });
      }

      gsap.fromTo(
        ".acquisition-process-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".acquisition-process",
            start: "top 74%",
            end: "bottom 58%",
            scrub: 0.8,
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
      id="client-acquisition"
      ref={sectionRef}
      className="client-acquisition-section relative overflow-hidden bg-ink py-28 text-pearl sm:py-36 lg:py-44"
      aria-labelledby="client-acquisition-heading"
    >
      <div aria-hidden="true" className="acquisition-mesh absolute inset-0" />
      <div aria-hidden="true" className="acquisition-bg-shift absolute left-[-14%] top-[8%] size-[38rem] rounded-full bg-cyanflare/12 blur-[120px]" />
      <div aria-hidden="true" className="acquisition-bg-shift absolute right-[-16%] top-[36%] size-[42rem] rounded-full bg-violetflare/13 blur-[130px]" />
      <div aria-hidden="true" className="acquisition-bg-shift absolute bottom-[6%] left-[30%] size-[34rem] rounded-full bg-rosegold/9 blur-[120px]" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_bottom,#04050a,rgba(4,5,10,0.86)_12%,rgba(4,5,10,0.82)_86%,#04050a)]" />

      <div aria-hidden="true" className="absolute inset-0">
        {acquisitionParticles.map((particle) => (
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
        <header className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="acquisition-reveal mb-5 inline-flex rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-cyanflare/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
              Ready To Build?
            </p>
            <h2
              id="client-acquisition-heading"
              className="acquisition-reveal font-display text-5xl font-black leading-[0.95] tracking-normal text-white sm:text-6xl md:text-7xl xl:text-8xl"
            >
              Need A Modern Website,
              <span className="headline-accent block">Business Platform</span>
              Or Custom Software?
            </h2>
            <p className="acquisition-reveal mt-7 max-w-3xl text-lg leading-8 text-frost/70 sm:text-xl">
              I help businesses, startups and entrepreneurs build fast,
              scalable and visually stunning digital products.
            </p>
          </div>

          <motion.div
            className="acquisition-hero-panel"
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.82, ease: premiumEase }}
          >
            <div className="acquisition-orbit" aria-hidden="true">
              <span className="acquisition-orbit-core">
                <Sparkles className="size-7" />
              </span>
              <i />
              <i />
              <i />
            </div>
            <h3>From business problem to shipped product.</h3>
            <p>Strategy, UI, engineering, launch and ongoing improvements in one focused workflow.</p>
            <AcquisitionButton href="/#contact-form" eventSource="client_acquisition_hero">
              Start A Project
            </AcquisitionButton>
          </motion.div>
        </header>

        <div className="acquisition-block">
          <SectionHeading title="Who I Work With" />
          <div className="acquisition-industry-grid">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <motion.div
                  key={industry.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-90px" }}
                  transition={{ delay: index * 0.04, duration: 0.68, ease: premiumEase }}
                >
                  <AcquisitionCard>
                    <Icon className="size-5 text-cyanflare" />
                    <h4>{industry.title}</h4>
                    <p>{industry.description}</p>
                  </AcquisitionCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="acquisition-block acquisition-problems-layout">
          <SectionHeading title="Problems I Can Help Solve">
            <p>Expandable problem cards make it easy for a visitor to recognize their own situation.</p>
          </SectionHeading>
          <div className="acquisition-problem-list">
            {problems.map((problem, index) => (
              <motion.details
                key={problem.title}
                className="acquisition-problem-card"
                open={index === 0}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ delay: index * 0.035, duration: 0.62, ease: premiumEase }}
              >
                <summary>
                  <span>{problem.title}</span>
                  <ChevronDown className="size-4" />
                </summary>
                <p>{problem.description}</p>
              </motion.details>
            ))}
          </div>
        </div>

        <div className="acquisition-block">
          <SectionHeading title="Service Packages">
            <p>Clear starting points for common business needs without turning the work into a cheap pricing table.</p>
          </SectionHeading>
          <div className="acquisition-package-grid">
            {packages.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  className={`acquisition-package-card ${item.featured ? "acquisition-package-featured" : ""}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-90px" }}
                  transition={{ delay: index * 0.06, duration: 0.72, ease: premiumEase }}
                  whileHover={{ y: -6 }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="acquisition-package-icon">
                      <Icon className="size-6" />
                    </span>
                    {item.featured ? <span className="acquisition-package-badge">Most Flexible</span> : null}
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <div className="acquisition-package-includes">
                    {item.includes.map((include) => (
                      <span key={include}>
                        <Check className="size-4" />
                        {include}
                      </span>
                    ))}
                  </div>
                  <AcquisitionButton href="/#contact-form" variant={item.featured ? "primary" : "secondary"} eventSource={`package_${item.title}`}>
                    Discuss This
                  </AcquisitionButton>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="acquisition-block">
          <SectionHeading title="Why Clients Choose To Work With Me" />
          <div className="acquisition-reason-grid">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={reason.title}
                  className="acquisition-reason-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-90px" }}
                  transition={{ delay: index * 0.04, duration: 0.64, ease: premiumEase }}
                >
                  <Icon className="size-5 text-cyanflare" />
                  <span>{reason.title}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="acquisition-block">
          <SectionHeading title="How We Work Together" />
          <div className="acquisition-process">
            <div aria-hidden="true" className="acquisition-process-line">
              <div className="acquisition-process-progress" />
            </div>
            {process.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.article
                  key={step.step}
                  className="acquisition-process-step"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-90px" }}
                  transition={{ delay: index * 0.05, duration: 0.7, ease: premiumEase }}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Icon className="size-5 text-cyanflare" />
                  <h4>{step.step}</h4>
                  <p>{step.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="acquisition-block">
          <motion.div
            className="acquisition-inquiry"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.82, ease: premiumEase }}
          >
            <div>
              <p>Project Inquiry</p>
              <h3>Let&apos;s Discuss Your Project</h3>
            </div>
            <div className="acquisition-contact-grid">
              <AcquisitionButton href={siteConfig.links.email} variant="secondary" eventSource="inquiry_email">
                <Mail className="size-4" />
                Email
              </AcquisitionButton>
              <AcquisitionButton href={siteConfig.links.whatsapp} variant="secondary" eventSource="inquiry_whatsapp">
                <MessageCircle className="size-4" />
                WhatsApp
              </AcquisitionButton>
              <AcquisitionButton href="/#consultation" eventSource="inquiry_schedule_call">
                Schedule Call
              </AcquisitionButton>
            </div>
          </motion.div>
        </div>

        <div className="acquisition-block">
          <div className="acquisition-trust-strip">
            {trustSignals.map((signal, index) => (
              <motion.span
                key={signal}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.035, duration: 0.62, ease: premiumEase }}
              >
                <Check className="size-4 text-cyanflare" />
                {signal}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="acquisition-block">
          <div className="acquisition-metrics-grid">
            {metrics.map((metric, index) => (
              <CountMetric key={metric.label} {...metric} index={index} />
            ))}
          </div>
        </div>

        <div className="acquisition-block">
          <SectionHeading title="Testimonials Ready" />
          <div className="acquisition-testimonial-track">
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial.author}
                className="acquisition-testimonial-card"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ delay: index * 0.06, duration: 0.72, ease: premiumEase }}
              >
                <p>{testimonial.quote}</p>
                <div>
                  <strong>{testimonial.author}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          className="acquisition-final-cta"
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.86, ease: premiumEase }}
        >
          <div>
            <p>High-Conversion CTA</p>
            <h3>
              Have An Idea?
              <span>Let&apos;s Build It Together.</span>
            </h3>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <AcquisitionButton href="/#contact-form" eventSource="final_start_project">
              Start A Project
            </AcquisitionButton>
            <AcquisitionButton href="/#consultation" variant="secondary" eventSource="final_book_consultation">
              Book A Consultation
            </AcquisitionButton>
            <AcquisitionButton href={siteConfig.links.whatsapp} variant="secondary" eventSource="final_send_message">
              Send A Message
            </AcquisitionButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

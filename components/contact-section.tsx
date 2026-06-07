"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType, CSSProperties, FormEvent, PointerEvent, ReactNode } from "react";
import {
  ArrowUpRight,
  Bot,
  Check,
  Code2,
  FileDown,
  Github,
  LayoutDashboard,
  Linkedin,
  Mail,
  MessageCircle,
  MonitorSmartphone,
  Send,
  Sparkles,
  Twitter,
} from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

const premiumEase = [0.16, 1, 0.3, 1] as const;

type ContactMethod = {
  title: string;
  value: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  download?: boolean;
  analyticsEvent?: "resume_download" | "whatsapp_click";
};

type FormState = {
  fullName: string;
  email: string;
  companyName: string;
  projectType: string;
  budgetRange: string;
  projectDescription: string;
  website: string;
  startedAt: number;
};

type FormErrors = Partial<
  Record<"fullName" | "email" | "companyName" | "projectType" | "budgetRange" | "projectDescription", string>
>;

type SubmitStatus = {
  type: "success" | "error";
  message: string;
} | null;

const contactMethods: ContactMethod[] = [
  {
    title: "Email",
    value: siteConfig.email,
    href: siteConfig.links.email,
    icon: Mail,
  },
  {
    title: "WhatsApp",
    value: "Start a chat",
    href: siteConfig.links.whatsapp,
    icon: MessageCircle,
    analyticsEvent: "whatsapp_click",
  },
  {
    title: "LinkedIn",
    value: "Connect professionally",
    href: siteConfig.links.linkedin,
    icon: Linkedin,
  },
  {
    title: "GitHub",
    value: "View engineering work",
    href: siteConfig.links.github,
    icon: Github,
  },
  {
    title: "Resume Download",
    value: "Download profile",
    href: siteConfig.links.resume,
    icon: FileDown,
    download: true,
    analyticsEvent: "resume_download",
  },
];

const trustItems = [
  { label: "Full Stack Development", icon: Code2 },
  { label: "Modern Web Applications", icon: Sparkles },
  { label: "Business Platforms", icon: LayoutDashboard },
  { label: "AI Integrations", icon: Bot },
  { label: "Responsive Design", icon: MonitorSmartphone },
];

const socialLinks = [
  { label: "GitHub", href: siteConfig.links.github, icon: Github },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: Linkedin },
  { label: "Twitter/X", href: siteConfig.links.twitter, icon: Twitter },
];

const contactParticles = [
  { left: 8, top: 14, size: 2, delay: "-2s", duration: "10s", dx: "24px", dy: "-22px" },
  { left: 18, top: 72, size: 1, delay: "-7s", duration: "12s", dx: "-18px", dy: "28px" },
  { left: 37, top: 29, size: 2, delay: "-4s", duration: "9s", dx: "18px", dy: "30px" },
  { left: 62, top: 16, size: 1, delay: "-8s", duration: "13s", dx: "-26px", dy: "22px" },
  { left: 78, top: 76, size: 2, delay: "-1s", duration: "8s", dx: "24px", dy: "-24px" },
  { left: 93, top: 42, size: 1, delay: "-5s", duration: "11s", dx: "-18px", dy: "26px" },
];

function createInitialForm(): FormState {
  return {
    fullName: "",
    email: "",
    companyName: "",
    projectType: "",
    budgetRange: "",
    projectDescription: "",
    website: "",
    startedAt: Date.now(),
  };
}

function setMagnet(
  element: HTMLElement | null,
  event: PointerEvent<HTMLElement>,
  strengthX = 0.15,
  strengthY = 0.22,
) {
  if (!element) return;

  const rect = element.getBoundingClientRect();
  const x = event.clientX - rect.left - rect.width / 2;
  const y = event.clientY - rect.top - rect.height / 2;

  element.style.setProperty("--magnet-x", `${x * strengthX}px`);
  element.style.setProperty("--magnet-y", `${y * strengthY}px`);
}

function resetMagnet(element: HTMLElement | null) {
  if (!element) return;

  element.style.setProperty("--magnet-x", "0px");
  element.style.setProperty("--magnet-y", "0px");
}

function ContactCard({ method, index }: { method: ContactMethod; index: number }) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const Icon = method.icon;

  const onPointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const element = ref.current;
    if (!element) return;

    setMagnet(element, event);

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    element.style.setProperty("--contact-card-x", `${x * 100}%`);
    element.style.setProperty("--contact-card-y", `${y * 100}%`);
    element.style.setProperty("--contact-card-tilt-x", `${(y - 0.5) * -7}deg`);
    element.style.setProperty("--contact-card-tilt-y", `${(x - 0.5) * 8}deg`);
  };

  const onPointerLeave = () => {
    const element = ref.current;
    resetMagnet(element);
    if (!element) return;

    element.style.setProperty("--contact-card-x", "50%");
    element.style.setProperty("--contact-card-y", "50%");
    element.style.setProperty("--contact-card-tilt-x", "0deg");
    element.style.setProperty("--contact-card-tilt-y", "0deg");
  };

  return (
    <motion.a
      ref={ref}
      href={method.href}
      target={method.href.startsWith("http") ? "_blank" : undefined}
      rel={method.href.startsWith("http") ? "noreferrer" : undefined}
      download={method.download}
      className="contact-card magnetic-button group relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-white/[0.045] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_20px_70px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onClick={() => {
        if (method.analyticsEvent) {
          trackEvent(method.analyticsEvent, { source: "contact_card", label: method.title });
        }
      }}
      initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ delay: index * 0.05, duration: 0.7, ease: premiumEase }}
    >
      <div className="relative z-10 flex items-start justify-between gap-5">
        <span className="flex size-12 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] text-cyanflare">
          <Icon className="size-5" />
        </span>
        <ArrowUpRight className="size-4 text-white/38 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/80" />
      </div>
      <div className="relative z-10 mt-7">
        <h3 className="text-lg font-bold text-white">{method.title}</h3>
        <p className="mt-2 text-sm leading-6 text-frost/62">{method.value}</p>
      </div>
    </motion.a>
  );
}

function SubmitButton({
  children,
  isLoading,
  disabled,
}: {
  children: ReactNode;
  isLoading: boolean;
  disabled: boolean;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <button
      ref={ref}
      type="submit"
      disabled={disabled}
      aria-busy={isLoading}
      className="contact-submit magnetic-button group relative inline-flex min-h-[3.5rem] w-full items-center justify-center overflow-hidden rounded-full bg-pearl px-7 text-sm font-black uppercase tracking-[0.12em] text-ink shadow-[0_0_54px_rgba(248,251,255,0.16)] transition duration-500 hover:shadow-[0_0_90px_rgba(97,244,255,0.28)] disabled:cursor-not-allowed disabled:opacity-62 sm:w-auto"
      onPointerMove={(event) => setMagnet(ref.current, event)}
      onPointerLeave={() => resetMagnet(ref.current)}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 transition duration-700 group-hover:translate-x-full group-hover:opacity-100"
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {isLoading ? "Sending..." : children}
        <Send className={`size-4 transition-transform duration-500 group-hover:translate-x-0.5 ${isLoading ? "animate-pulse" : ""}`} />
      </span>
    </button>
  );
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [form, setForm] = useState<FormState>(() => createInitialForm());
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        ".contact-reveal",
        { y: 44, opacity: 0, filter: "blur(14px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 74%",
          },
        },
      );

      gsap.to(".contact-bg-shift", {
        yPercent: -16,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.9,
        },
      });

      gsap.fromTo(
        ".trust-pill",
        { y: 20, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.72,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: {
            trigger: ".trust-strip",
            start: "top 82%",
          },
        },
      );

      gsap.fromTo(
        ".signature-stroke",
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          transformOrigin: "left center",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".portfolio-footer",
            start: "top 82%",
          },
        },
      );
    }, sectionRef);

    return () => context.revert();
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    event.currentTarget.style.setProperty("--contact-x", `${x}px`);
    event.currentTarget.style.setProperty("--contact-y", `${y}px`);
  };

  const updateField = (field: Exclude<keyof FormState, "startedAt">, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field as keyof FormErrors];
      return next;
    });
    setStatus(null);
  };

  const validate = (candidate = form) => {
    const nextErrors: FormErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (candidate.fullName.trim().length < 2) nextErrors.fullName = "Full name is required.";
    if (!emailPattern.test(candidate.email)) nextErrors.email = "Enter a valid email address.";
    if (!candidate.projectType) nextErrors.projectType = "Select a project type.";
    if (!candidate.budgetRange) nextErrors.budgetRange = "Select a budget range.";
    if (candidate.projectDescription.trim().length < 10) {
      nextErrors.projectDescription = "Share at least 10 characters about the project.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus(null);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
        errors?: FormErrors;
      };

      if (!response.ok || !result.ok) {
        if (result.errors) setErrors(result.errors);
        setStatus({
          type: "error",
          message: result.message ?? "Something went wrong. Please try again.",
        });
        return;
      }

      trackEvent("contact_submit", {
        project_type: form.projectType,
        budget_range: form.budgetRange,
      });
      setStatus({
        type: "success",
        message: result.message ?? "Thank you for reaching out. I'll get back to you within 24 hours.",
      });
      setForm(createInitialForm());
      setErrors({});
    } catch {
      setStatus({
        type: "error",
        message: "Network error. Please email directly or try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="contact-section relative overflow-hidden bg-ink text-pearl"
      onPointerMove={handlePointerMove}
      aria-labelledby="contact-heading"
    >
      <div aria-hidden="true" className="contact-mesh absolute inset-0" />
      <div aria-hidden="true" className="contact-bg-shift absolute left-[-14%] top-[6%] size-[40rem] rounded-full bg-cyanflare/12 blur-[125px]" />
      <div aria-hidden="true" className="contact-bg-shift absolute right-[-16%] top-[38%] size-[44rem] rounded-full bg-violetflare/14 blur-[135px]" />
      <div aria-hidden="true" className="contact-bg-shift absolute bottom-[6%] left-[26%] size-[34rem] rounded-full bg-rosegold/10 blur-[120px]" />
      <div aria-hidden="true" className="contact-spotlight pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="contact-grid-layer absolute inset-x-[-18%] bottom-[-26%] h-[74vh]" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_bottom,#04050a,rgba(4,5,10,0.82)_12%,rgba(4,5,10,0.78)_82%,#04050a)]" />

      <div aria-hidden="true" className="absolute inset-0">
        {contactParticles.map((particle) => (
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

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col justify-center px-5 py-28 sm:px-8 sm:py-36 lg:px-12 xl:px-16">
        <div className="grid items-end gap-12 lg:grid-cols-[1fr_0.82fr] lg:gap-16">
          <div>
            <motion.div
              className="contact-reveal mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyanflare/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_44px_rgba(97,244,255,0.1)] backdrop-blur-2xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyanflare opacity-70" />
                <span className="relative inline-flex size-2.5 rounded-full bg-cyanflare shadow-[0_0_18px_rgba(97,244,255,0.9)]" />
              </span>
              Available For New Projects
            </motion.div>

            <h2
              id="contact-heading"
              className="contact-reveal font-display text-[2.55rem] font-black uppercase leading-[0.84] tracking-normal text-white min-[380px]:text-[3rem] sm:text-[5.2rem] md:text-[6.7rem] lg:text-[7.6rem] xl:text-[8.8rem]"
            >
              <span className="block overflow-hidden pb-[0.05em]">Let&apos;s Build</span>
              <span className="headline-accent block overflow-hidden pb-[0.05em]">Something Amazing</span>
              <span className="block overflow-hidden pb-[0.05em]">Together</span>
            </h2>

            <p className="contact-reveal mt-8 max-w-3xl text-lg leading-9 text-frost/72 sm:text-xl">
              Whether you&apos;re launching a startup, building a business
              platform, or creating a modern digital experience, I&apos;m ready
              to help bring your ideas to life.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {contactMethods.map((method, index) => (
              <ContactCard key={method.title} method={method} index={index} />
            ))}
          </div>
        </div>

        <div id="contact-form" className="mt-16 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
          <div className="contact-panel contact-reveal relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_28px_100px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:p-8">
            <Sparkles className="size-6 text-cyanflare" />
            <h3 className="mt-7 font-display text-3xl font-black leading-tight text-white sm:text-4xl">
              Tell me what you want to build.
            </h3>
            <p className="mt-5 leading-8 text-frost/68">
              A clear first message helps shape scope, timeline and the right
              product direction. Share the business goal, not just the feature
              list.
            </p>
            <div className="mt-8 grid gap-3">
              {["Product strategy", "Modern engineering", "Launch-ready execution"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-semibold text-white/72">
                  <span className="flex size-6 items-center justify-center rounded-full border border-cyanflare/20 bg-cyanflare/10 text-cyanflare">
                    <Check className="size-3.5" />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <form
            className="contact-form contact-reveal relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_28px_100px_rgba(0,0,0,0.36)] backdrop-blur-2xl sm:p-7"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(event) => updateField("website", event.target.value)}
                />
              </div>

              <div className="lux-field">
                <input
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={(event) => updateField("fullName", event.target.value)}
                  placeholder=" "
                  autoComplete="name"
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? "full-name-error" : undefined}
                />
                <label htmlFor="fullName">Full Name</label>
                {errors.fullName ? <p id="full-name-error">{errors.fullName}</p> : null}
              </div>

              <div className="lux-field">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder=" "
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                <label htmlFor="email">Email Address</label>
                {errors.email ? <p id="email-error">{errors.email}</p> : null}
              </div>

              <div className="lux-field">
                <input
                  id="companyName"
                  name="companyName"
                  value={form.companyName}
                  onChange={(event) => updateField("companyName", event.target.value)}
                  placeholder=" "
                  autoComplete="organization"
                />
                <label htmlFor="companyName">Company Name (optional)</label>
              </div>

              <div className="lux-field lux-select">
                <select
                  id="projectType"
                  name="projectType"
                  value={form.projectType}
                  onChange={(event) => updateField("projectType", event.target.value)}
                  aria-invalid={Boolean(errors.projectType)}
                  aria-describedby={errors.projectType ? "project-type-error" : undefined}
                >
                  <option value="">Select project type</option>
                  <option>Modern Website</option>
                  <option>Business Platform</option>
                  <option>AI Integration</option>
                  <option>SaaS Product</option>
                  <option>UI/UX Design</option>
                </select>
                <label htmlFor="projectType">Project Type</label>
                {errors.projectType ? <p id="project-type-error">{errors.projectType}</p> : null}
              </div>

              <div className="lux-field lux-select">
                <select
                  id="budgetRange"
                  name="budgetRange"
                  value={form.budgetRange}
                  onChange={(event) => updateField("budgetRange", event.target.value)}
                  aria-invalid={Boolean(errors.budgetRange)}
                  aria-describedby={errors.budgetRange ? "budget-range-error" : undefined}
                >
                  <option value="">Select budget range</option>
                  <option>Under ₹25,000</option>
                  <option>₹25,000 - ₹75,000</option>
                  <option>₹75,000 - ₹1,50,000</option>
                  <option>₹1,50,000+</option>
                </select>
                <label htmlFor="budgetRange">Budget Range</label>
                {errors.budgetRange ? <p id="budget-range-error">{errors.budgetRange}</p> : null}
              </div>

              <div className="lux-field sm:col-span-2">
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={form.projectDescription}
                  onChange={(event) => updateField("projectDescription", event.target.value)}
                  placeholder=" "
                  rows={5}
                  aria-invalid={Boolean(errors.projectDescription)}
                  aria-describedby={errors.projectDescription ? "project-description-error" : undefined}
                />
                <label htmlFor="projectDescription">Project Description</label>
                {errors.projectDescription ? (
                  <p id="project-description-error">{errors.projectDescription}</p>
                ) : null}
              </div>
            </div>

            <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <SubmitButton isLoading={isSubmitting} disabled={isSubmitting}>
                Start A Project
              </SubmitButton>
              {status ? (
                <motion.div
                  role={status.type === "error" ? "alert" : "status"}
                  className={`contact-status contact-status-${status.type} inline-flex items-center gap-3 rounded-full border px-4 py-3 text-sm font-semibold ${
                    status.type === "success"
                      ? "border-cyanflare/20 bg-cyanflare/10 text-cyanflare"
                      : "border-rosegold/25 bg-rosegold/10 text-rosegold"
                  }`}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.38, ease: premiumEase }}
                >
                  <Check className="size-4" />
                  {status.message}
                </motion.div>
              ) : null}
            </div>
          </form>
        </div>
      </div>

      <div className="trust-strip relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-12 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-wrap justify-center gap-3 rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl">
          {trustItems.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="trust-pill flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white/62">
                <Icon className="size-4 text-cyanflare" />
                {item.label}
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-8 px-5 pb-12 sm:px-8 lg:flex-row lg:px-12 xl:px-16">
        <div className="text-center lg:text-left">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-white/40">Social Presence</p>
          <p className="mt-3 text-lg font-semibold text-white/78">Find the work, connect, or start the conversation.</p>
        </div>
        <div className="flex items-center gap-3">
          {socialLinks.map((link) => {
            const Icon = link.icon;

            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="social-orb flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/66 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-cyanflare/35 hover:text-cyanflare hover:shadow-[0_0_50px_rgba(97,244,255,0.18)]"
              >
                <Icon className="size-5" />
              </a>
            );
          })}
        </div>
      </div>

      <footer className="portfolio-footer relative z-10 border-t border-white/10">
        <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-8 text-center sm:px-8 lg:grid-cols-3 lg:px-12 lg:text-left xl:px-16">
          <div>
            <p className="font-display text-2xl font-black text-white">Harshal</p>
            <p className="mt-2 text-sm font-medium text-frost/58">Full Stack Developer</p>
            <div aria-hidden="true" className="signature-stroke mt-4 h-px w-32 bg-gradient-to-r from-cyanflare via-rosegold to-transparent mx-auto lg:mx-0" />
          </div>

          <div className="flex items-center justify-center text-sm text-white/42">
            © 2026 Harshal. All rights reserved.
          </div>

          <div className="text-center lg:text-right">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/34">Built with</p>
            <p className="mt-2 text-sm font-semibold leading-7 text-white/62">
              Next.js · TypeScript · Tailwind CSS · Framer Motion
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}

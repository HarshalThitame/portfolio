"use client";

import { useEffect, useRef } from "react";
import type { ComponentType, CSSProperties, PointerEvent } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  MonitorSmartphone,
  PenLine,
  Rocket,
  ShieldCheck,
  Sparkles,
  Twitter,
  Workflow,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/lib/site-config";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const storySteps = [
  {
    title: "Curiosity",
    description:
      "I started by trying to understand how real websites and products are put together, then kept following the questions that came up.",
  },
  {
    title: "Learning",
    description:
      "React, Next.js, TypeScript and modern UI systems became the tools I used to turn ideas into usable interfaces.",
  },
  {
    title: "Building",
    description:
      "The learning became practical through real-world applications, experiments and product problems that needed clear solutions.",
  },
  {
    title: "Launching Real Products",
    description:
      "Flux3D and Majhi Dairy pushed the work beyond practice into business-focused products with users, workflows and outcomes.",
  },
  {
    title: "Helping Businesses",
    description:
      "Now the focus is building websites, platforms, AI features and SaaS products that make work simpler and more effective.",
  },
];

const expertise = [
  {
    title: "Web Development",
    description: "Fast, responsive websites and web applications with modern frameworks and polished execution.",
    icon: Code2,
  },
  {
    title: "Business Software",
    description: "Dashboards, admin tools and operational systems built around practical business workflows.",
    icon: Workflow,
  },
  {
    title: "AI Solutions",
    description: "AI integrations, assistants and automation features that help products become more useful.",
    icon: BrainCircuit,
  },
  {
    title: "Product Development",
    description: "From idea and architecture to interface, launch and iteration with a product-first mindset.",
    icon: Layers3,
  },
  {
    title: "UI/UX Engineering",
    description: "Interfaces that balance visual quality, usability, accessibility and performance.",
    icon: MonitorSmartphone,
  },
];

const currentlyBuilding = [
  {
    title: "Flux3D",
    description: "A modern platform for industrial 3D printing services and custom manufacturing.",
    status: "Live product",
  },
  {
    title: "Majhi Dairy",
    description: "A dairy management platform for milk collection, farmer records and reporting workflows.",
    status: "Product platform",
  },
  {
    title: "Future SaaS Products",
    description: "Focused tools that solve operational problems for small businesses and teams.",
    status: "Exploring",
  },
  {
    title: "AI Experiments",
    description: "Automation, assistants and intelligent workflows for modern web applications.",
    status: "Learning by building",
  },
];

const insights = [
  {
    title: "How I Built Majhi Dairy",
    description: "Designing a practical product around milk collection, farmer records and mobile-first workflows.",
    category: "Case Notes",
    href: "/blog/how-i-built-majhi-dairy",
  },
  {
    title: "Building Modern SaaS Applications With Next.js",
    description: "The product and engineering decisions behind scalable, polished SaaS foundations.",
    category: "Engineering",
    href: "/blog/building-modern-saas-applications-with-nextjs",
  },
  {
    title: "Lessons From Launching Flux3D",
    description: "How a manufacturing website became a focused business platform for trust and inquiries.",
    category: "Product",
    href: "/blog/lessons-from-launching-flux3d",
  },
  {
    title: "AI Integration For Business Applications",
    description: "How AI can support business workflows without making the product confusing.",
    category: "AI",
    href: "/blog/ai-integration-for-business-applications",
  },
  {
    title: "Designing Software For Real-World Businesses",
    description: "Interface lessons from building multilingual and mobile-first workflows for practical users.",
    category: "UX",
    href: "/blog/designing-software-for-real-world-businesses",
  },
];

const values = [
  {
    title: "Build For Users",
    description: "Technology should solve real problems.",
    icon: Sparkles,
  },
  {
    title: "Keep It Simple",
    description: "Simple products create better experiences.",
    icon: ShieldCheck,
  },
  {
    title: "Focus On Performance",
    description: "Fast products feel professional.",
    icon: Zap,
  },
  {
    title: "Never Stop Learning",
    description: "Technology evolves every day.",
    icon: Rocket,
  },
];

const socialHub = [
  {
    label: "GitHub",
    href: siteConfig.links.github,
    metric: "Projects",
    value: "Open work",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    metric: "Network",
    value: "Professional",
    icon: Linkedin,
  },
  {
    label: "Twitter/X",
    href: siteConfig.links.twitter,
    metric: "Ideas",
    value: "Building in public",
    icon: Twitter,
  },
  {
    label: "Email",
    href: siteConfig.links.email,
    metric: "Contact",
    value: "Project inquiries",
    icon: Mail,
  },
  {
    label: "Portfolio",
    href: siteConfig.url,
    metric: "Home",
    value: "Personal brand",
    icon: Globe2,
  },
];

const milestones = [
  "Launched Flux3D",
  "Built Majhi Dairy",
  "Created Production Applications",
  "Exploring AI Products",
];

const brandParticles = [
  { left: 7, top: 18, size: 2, delay: "-2s", duration: "10s", dx: "22px", dy: "-24px" },
  { left: 19, top: 78, size: 1, delay: "-7s", duration: "12s", dx: "-18px", dy: "28px" },
  { left: 43, top: 28, size: 2, delay: "-4s", duration: "9s", dx: "18px", dy: "28px" },
  { left: 67, top: 14, size: 1, delay: "-8s", duration: "13s", dx: "-26px", dy: "22px" },
  { left: 82, top: 68, size: 2, delay: "-1s", duration: "8s", dx: "24px", dy: "-24px" },
  { left: 94, top: 40, size: 1, delay: "-5s", duration: "11s", dx: "-18px", dy: "26px" },
];

function BrandCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    element.style.setProperty("--brand-x", `${x * 100}%`);
    element.style.setProperty("--brand-y", `${y * 100}%`);
    element.style.setProperty("--brand-tilt-x", `${(y - 0.5) * -4}deg`);
    element.style.setProperty("--brand-tilt-y", `${(x - 0.5) * 5}deg`);
  };

  const onPointerLeave = () => {
    const element = ref.current;
    if (!element) return;

    element.style.setProperty("--brand-x", "50%");
    element.style.setProperty("--brand-y", "50%");
    element.style.setProperty("--brand-tilt-x", "0deg");
    element.style.setProperty("--brand-tilt-y", "0deg");
  };

  return (
    <div
      ref={ref}
      className={`brand-card ${className}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </div>
  );
}

function IconBadge({ icon: Icon }: { icon: ComponentType<{ className?: string }> }) {
  return (
    <span className="brand-icon-badge">
      <Icon className="size-5" />
    </span>
  );
}

export function PersonalBrandSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        ".brand-reveal",
        { y: 42, opacity: 0, filter: "blur(14px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 74%",
          },
        },
      );

      gsap.to(".brand-bg-shift", {
        yPercent: -16,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.9,
        },
      });

      gsap.utils.toArray<HTMLElement>(".brand-depth").forEach((element) => {
        gsap.to(element, {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.85,
          },
        });
      });

      gsap.fromTo(
        ".brand-journey-line-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".brand-journey",
            start: "top 72%",
            end: "bottom 58%",
            scrub: 0.8,
          },
        },
      );
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      id="personal-brand"
      ref={sectionRef}
      className="personal-brand-section relative overflow-hidden bg-ink py-28 text-pearl sm:py-36 lg:py-44"
      aria-labelledby="personal-brand-heading"
    >
      <div aria-hidden="true" className="brand-mesh absolute inset-0" />
      <div aria-hidden="true" className="brand-bg-shift absolute left-[-12%] top-[6%] size-[38rem] rounded-full bg-cyanflare/12 blur-[120px]" />
      <div aria-hidden="true" className="brand-bg-shift absolute right-[-14%] top-[30%] size-[42rem] rounded-full bg-violetflare/13 blur-[130px]" />
      <div aria-hidden="true" className="brand-bg-shift absolute bottom-[6%] left-[28%] size-[36rem] rounded-full bg-rosegold/9 blur-[120px]" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_bottom,#04050a,rgba(4,5,10,0.86)_12%,rgba(4,5,10,0.82)_86%,#04050a)]" />

      <div aria-hidden="true" className="absolute inset-0">
        {brandParticles.map((particle) => (
          <span
            key={`${particle.left}-${particle.top}`}
            className="particle absolute rounded-full bg-cyanflare/80 shadow-[0_0_18px_rgba(97,244,255,0.44)]"
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
        <header className="grid gap-10 lg:grid-cols-[0.95fr_0.72fr] lg:items-end">
          <div>
            <p className="brand-reveal mb-5 inline-flex rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-cyanflare/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
              About The Builder
            </p>
            <h2
              id="personal-brand-heading"
              className="brand-reveal font-display text-5xl font-black leading-[0.95] tracking-normal text-white sm:text-6xl md:text-7xl xl:text-8xl"
            >
              Building Products,
              <span className="headline-accent block">Solving Problems,</span>
              Creating Impact.
            </h2>
            <p className="brand-reveal mt-7 max-w-3xl text-lg leading-8 text-frost/70 sm:text-xl">
              A Full Stack Developer focused on creating modern web
              applications, business platforms and AI-powered solutions that
              help people and businesses work smarter.
            </p>
          </div>

          <motion.div
            className="brand-depth"
            initial={{ opacity: 0, y: 36, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.82, ease: premiumEase }}
          >
            <BrandCard className="brand-profile-card">
              <div className="brand-photo-placeholder" aria-label="Professional photo placeholder">
                <span>H</span>
                <i />
              </div>
              <div>
                <h3>{siteConfig.name}</h3>
                <p>Full Stack Developer</p>
                <span className="brand-location">
                  <MapPin className="size-4" />
                  India / Available Remotely
                </span>
              </div>
              <div className="brand-status">
                <span />
                Building digital products with Next.js, React, AI and modern web technologies.
              </div>
            </BrandCard>
          </motion.div>
        </header>

        <div className="brand-section-block brand-journey">
          <div className="brand-block-heading brand-reveal">
            <p>My Journey</p>
            <h3>From curiosity to products people can use.</h3>
          </div>

          <div className="brand-journey-layout">
            <div aria-hidden="true" className="brand-journey-line">
              <div className="brand-journey-line-progress" />
            </div>
            {storySteps.map((step, index) => (
              <motion.article
                key={step.title}
                className="brand-journey-step"
                initial={{ opacity: 0, x: index % 2 ? 32 : -32, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ delay: index * 0.06, duration: 0.74, ease: premiumEase }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="brand-section-block">
          <div className="brand-block-heading brand-reveal">
            <p>Expertise Areas</p>
            <h3>Where product thinking meets implementation.</h3>
          </div>
          <div className="brand-expertise-grid">
            {expertise.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ delay: index * 0.05, duration: 0.72, ease: premiumEase }}
              >
                <BrandCard>
                  <IconBadge icon={item.icon} />
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </BrandCard>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="brand-section-block brand-building-layout">
          <div className="brand-block-heading brand-reveal">
            <p>Currently Building</p>
            <h3>Active products, experiments and next bets.</h3>
          </div>
          <div className="brand-building-grid">
            {currentlyBuilding.map((item, index) => (
              <motion.article
                key={item.title}
                className="brand-building-card"
                initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ delay: index * 0.05, duration: 0.7, ease: premiumEase }}
                whileHover={{ y: -5 }}
              >
                <span>{item.status}</span>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="brand-section-block">
          <div className="brand-block-heading brand-reveal">
            <p>Insights & Learnings</p>
            <h3>Writing ideas into sharper product judgment.</h3>
          </div>
          <div className="brand-insights-grid">
            {insights.map((article, index) => (
              <motion.div
                key={article.title}
                className="brand-insight-card"
                initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ delay: index * 0.05, duration: 0.72, ease: premiumEase }}
                whileHover={{ y: -5 }}
              >
                <Link href={article.href} className="brand-insight-link">
                  <span>{article.category}</span>
                  <h4>{article.title}</h4>
                  <p>{article.description}</p>
                  <ArrowUpRight className="size-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="brand-section-block">
          <div className="brand-block-heading brand-reveal">
            <p>What I Believe</p>
            <h3>Principles that shape the work.</h3>
          </div>
          <div className="brand-values-grid">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ delay: index * 0.05, duration: 0.72, ease: premiumEase }}
              >
                <BrandCard>
                  <IconBadge icon={value.icon} />
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </BrandCard>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="brand-section-block brand-social-layout">
          <div className="brand-block-heading brand-reveal">
            <p>Community & Social Presence</p>
            <h3>A growing builder footprint.</h3>
          </div>
          <div className="brand-social-grid">
            {socialHub.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="brand-social-card"
                  initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-90px" }}
                  transition={{ delay: index * 0.05, duration: 0.72, ease: premiumEase }}
                >
                  <Icon className="size-5" />
                  <strong>{item.label}</strong>
                  <span>{item.metric}</span>
                  <p>{item.value}</p>
                </motion.a>
              );
            })}
          </div>
        </div>

        <div className="brand-section-block brand-milestone-layout">
          <div className="brand-block-heading brand-reveal">
            <p>Milestones</p>
            <h3>Proof that the work keeps moving forward.</h3>
          </div>
          <div className="brand-milestone-grid">
            {milestones.map((milestone, index) => (
              <motion.article
                key={milestone}
                className="brand-milestone-card"
                initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ delay: index * 0.06, duration: 0.72, ease: premiumEase }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h4>{milestone}</h4>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          className="brand-signature"
          initial={{ opacity: 0, y: 34, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.86, ease: premiumEase }}
        >
          <PenLine className="size-6 text-cyanflare" />
          <p>
            I enjoy building products that combine technology, usability and
            business value.
          </p>
          <p>
            Whether it&apos;s a business platform, a modern website or an
            AI-powered application, my goal is always the same:
          </p>
          <h3>Create something useful.</h3>
        </motion.div>
      </div>
    </section>
  );
}

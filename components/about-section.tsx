"use client";

import { useEffect, useRef } from "react";
import type { ComponentType, CSSProperties, PointerEvent } from "react";
import {
  Bot,
  BrainCircuit,
  Braces,
  Code2,
  Container,
  Database,
  Figma,
  GitBranch,
  Github,
  Layers3,
  Network,
  ServerCog,
  Sparkles,
  Triangle,
  Workflow,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { loadGsapScrollTrigger, shouldRunDepthMotion, shouldRunScrollMotion } from "@/lib/client-performance";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: 20, suffix: "+", label: "Projects Built" },
  { value: 2, suffix: "+", label: "Years Learning & Building" },
  { value: 100, suffix: "%", label: "Responsive Experiences" },
  { value: "Full Stack", suffix: "", label: "Development" },
];

const techGroups = [
  {
    title: "Frontend",
    items: [
      { name: "React", icon: Braces },
      { name: "Next.js", icon: Sparkles },
      { name: "TypeScript", icon: Code2 },
      { name: "Tailwind CSS", icon: Layers3 },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: ServerCog },
      { name: "Express", icon: Network },
      { name: "Supabase", icon: Database },
      { name: "PostgreSQL", icon: Database },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", icon: GitBranch },
      { name: "GitHub", icon: Github },
      { name: "Docker", icon: Container },
      { name: "Vercel", icon: Triangle },
    ],
  },
  {
    title: "AI",
    items: [
      { name: "OpenAI", icon: BrainCircuit },
      { name: "AI Integrations", icon: Bot },
      { name: "Automation", icon: Workflow },
    ],
  },
];

const approaches = [
  {
    title: "Problem Solving",
    description: "Understanding business challenges before writing code.",
    icon: BrainCircuit,
  },
  {
    title: "Modern Development",
    description: "Building scalable and maintainable applications using modern technologies.",
    icon: Code2,
  },
  {
    title: "User Experience",
    description: "Creating intuitive interfaces that users enjoy interacting with.",
    icon: Figma,
  },
];

const journey = [
  "Started Learning Web Development",
  "Built First Production Website",
  "Launched Flux3D",
  "Built Majhi Dairy Platform",
  "Expanding into AI & SaaS Development",
];

const aboutParticles = [
  { left: 8, top: 12, size: 2, delay: "-2s", duration: "9s", dx: "24px", dy: "-28px" },
  { left: 19, top: 72, size: 1, delay: "-5s", duration: "11s", dx: "-18px", dy: "26px" },
  { left: 39, top: 28, size: 2, delay: "-4s", duration: "10s", dx: "18px", dy: "30px" },
  { left: 64, top: 14, size: 1, delay: "-7s", duration: "12s", dx: "-26px", dy: "24px" },
  { left: 82, top: 54, size: 2, delay: "-1s", duration: "8s", dx: "22px", dy: "-22px" },
  { left: 91, top: 82, size: 1, delay: "-6s", duration: "13s", dx: "-20px", dy: "-28px" },
];

function CountUpStat({ value, suffix, label }: (typeof stats)[number]) {
  const ref = useRef<HTMLDivElement | null>(null);
  const valueRef = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView || typeof value !== "number") return;

    let frame = 0;
    const startedAt = performance.now();
    const duration = 1400;

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      if (valueRef.current) valueRef.current.textContent = String(Math.round(value * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      className="premium-stat about-card group relative overflow-hidden rounded-[1.65rem] border border-white/10 bg-white/[0.045] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_24px_80px_rgba(0,0,0,0.26)] backdrop-blur-2xl transition duration-500 hover:-translate-y-1 hover:border-cyanflare/35 hover:bg-white/[0.07] sm:p-7"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.82, ease: premiumEase }}
    >
      <div aria-hidden="true" className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-60" />
      <div className="relative z-10">
        <p className="font-display text-4xl font-black leading-none text-white sm:text-5xl">
          <span ref={valueRef}>{typeof value === "number" ? 0 : value}</span>
          {suffix}
        </p>
        <p className="mt-4 max-w-44 text-sm font-medium leading-6 text-frost/70">{label}</p>
      </div>
      <div aria-hidden="true" className="absolute -right-12 -top-12 size-32 rounded-full bg-cyanflare/10 blur-2xl transition duration-500 group-hover:bg-cyanflare/20" />
    </motion.div>
  );
}

function TiltTechCard({
  name,
  icon: Icon,
}: {
  name: string;
  icon: ComponentType<{ className?: string }>;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    element.style.setProperty("--tilt-x", `${y * -7}deg`);
    element.style.setProperty("--tilt-y", `${x * 9}deg`);
    element.style.setProperty("--glow-x", `${(x + 0.5) * 100}%`);
    element.style.setProperty("--glow-y", `${(y + 0.5) * 100}%`);
  };

  const onPointerLeave = () => {
    const element = ref.current;
    if (!element) return;

    element.style.setProperty("--tilt-x", "0deg");
    element.style.setProperty("--tilt-y", "0deg");
    element.style.setProperty("--glow-x", "50%");
    element.style.setProperty("--glow-y", "50%");
  };

  return (
    <motion.div
      ref={ref}
      className="tech-tile group relative min-h-28 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-2xl"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      whileHover={{ scale: 1.035 }}
      transition={{ duration: 0.32, ease: premiumEase }}
    >
      <div className="relative z-10 flex h-full flex-col justify-between gap-7">
        <span className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-cyanflare shadow-[0_0_34px_rgba(97,244,255,0.11)]">
          <Icon className="size-5" />
        </span>
        <span className="text-sm font-semibold text-white/82">{name}</span>
      </div>
    </motion.div>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!shouldRunScrollMotion()) return;

    const runDepthMotion = shouldRunDepthMotion();
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const setupMotion = async () => {
      const { gsap, ScrollTrigger } = await loadGsapScrollTrigger();

      if (cancelled) return;

      const context = gsap.context(() => {
        const revealElements = gsap.utils.toArray<HTMLElement>(".about-reveal");

        gsap.set(revealElements, { y: 34, opacity: 0 });

        ScrollTrigger.batch(revealElements, {
          start: "top 82%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              duration: 0.95,
              ease: "power3.out",
              stagger: 0.08,
            });
          },
        });

        gsap.fromTo(
          ".about-intro-line",
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            y: 0,
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 74%",
            },
          },
        );

        if (runDepthMotion) {
          gsap.to(".about-parallax", {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }

        gsap.fromTo(
          ".timeline-progress",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".journey-timeline",
              start: "top 72%",
              end: "bottom 58%",
              scrub: 0.7,
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
      id="about"
      ref={sectionRef}
      className="about-section relative overflow-hidden bg-ink py-28 text-pearl sm:py-36 lg:py-44"
      aria-labelledby="about-heading"
    >
      <div aria-hidden="true" className="about-mesh absolute inset-0" />
      <div aria-hidden="true" className="about-parallax absolute left-[-10%] top-[8%] size-[32rem] rounded-full bg-cyanflare/10 blur-[110px]" />
      <div aria-hidden="true" className="about-parallax absolute bottom-[18%] right-[-12%] size-[38rem] rounded-full bg-violetflare/14 blur-[120px]" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(4,5,10,0.2),rgba(4,5,10,0.92)_14%,rgba(4,5,10,0.82)_82%,#04050a)]" />

      <div aria-hidden="true" className="absolute inset-0">
        {aboutParticles.map((particle) => (
          <span
            key={`${particle.left}-${particle.top}`}
            className="particle absolute rounded-full bg-white/70 shadow-[0_0_18px_rgba(97,244,255,0.45)]"
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
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1fr] lg:gap-20">
          <div className="about-reveal">
            <p className="mb-5 inline-flex rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-cyanflare/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
              About Me
            </p>
            <h2
              id="about-heading"
              className="font-display text-4xl font-black leading-[0.95] tracking-normal text-white sm:text-5xl md:text-6xl xl:text-7xl"
            >
              Crafting digital experiences with code, creativity and problem solving.
            </h2>
            <span
              aria-hidden="true"
              className="about-intro-line mt-8 block h-px w-full max-w-md bg-gradient-to-r from-cyanflare via-violetflare to-transparent"
            />
          </div>

          <motion.div
            className="about-reveal flex items-end"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: premiumEase }}
          >
            <p className="max-w-3xl text-lg leading-9 text-frost/74 sm:text-xl">
              I design and develop modern web applications that combine beautiful
              user experiences with scalable engineering. My focus is creating
              products that solve real-world problems while maintaining
              exceptional performance and usability.
            </p>
          </motion.div>
        </div>

        <div className="mt-[4.5rem] grid gap-4 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <CountUpStat key={stat.label} {...stat} />
          ))}
        </div>

        <div className="mt-28 grid gap-10 lg:grid-cols-[0.68fr_1fr] lg:gap-16">
          <div className="about-reveal lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-white/45">
              Technology Experience
            </p>
            <h3 className="font-display text-3xl font-black leading-tight text-white sm:text-4xl">
              Tools chosen for product quality, speed and scale.
            </h3>
            <p className="mt-6 max-w-xl text-base leading-8 text-frost/68">
              The stack is intentionally modern: strong frontend foundations,
              practical backend services, disciplined delivery tools and AI
              workflows that move products faster.
            </p>
          </div>

          <div className="space-y-7">
            {techGroups.map((group, groupIndex) => (
              <motion.div
                key={group.title}
                className="about-reveal"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: groupIndex * 0.06, duration: 0.72, ease: premiumEase }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-px w-8 bg-gradient-to-r from-cyanflare/70 to-transparent" />
                  <h4 className="text-xs font-bold uppercase tracking-[0.24em] text-white/48">
                    {group.title}
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {group.items.map((tech) => (
                    <TiltTechCard key={tech.name} {...tech} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-28">
          <div className="about-reveal mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-white/45">
                My Approach
              </p>
              <h3 className="font-display text-3xl font-black leading-tight text-white sm:text-5xl">
                Product thinking before pixels and code.
              </h3>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {approaches.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  className="approach-card group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-90px" }}
                  transition={{ delay: index * 0.08, duration: 0.78, ease: premiumEase }}
                  whileHover={{ y: -6 }}
                >
                  <span className="relative z-10 flex size-12 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] text-cyanflare">
                    <Icon className="size-5" />
                  </span>
                  <h4 className="relative z-10 mt-8 text-xl font-bold text-white">{item.title}</h4>
                  <p className="relative z-10 mt-4 leading-7 text-frost/68">{item.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="mt-28 grid gap-12 lg:grid-cols-[0.6fr_1fr] lg:gap-16">
          <div className="about-reveal">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-white/45">
              Journey
            </p>
            <h3 className="font-display text-3xl font-black leading-tight text-white sm:text-5xl">
              A practical path from learning to shipping.
            </h3>
          </div>

          <div className="journey-timeline relative">
            <div className="absolute left-4 top-3 h-[calc(100%-1.5rem)] w-px origin-top bg-white/10">
              <div className="timeline-progress h-full origin-top bg-gradient-to-b from-cyanflare via-violetflare to-rosegold shadow-[0_0_24px_rgba(97,244,255,0.4)]" />
            </div>

            <div className="space-y-5">
              {journey.map((milestone, index) => (
                <motion.div
                  key={milestone}
                  className="relative pl-12"
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.08, duration: 0.72, ease: premiumEase }}
                >
                  <span className="absolute left-[0.42rem] top-4 z-10 flex size-5 items-center justify-center rounded-full border border-cyanflare/35 bg-ink shadow-[0_0_28px_rgba(97,244,255,0.28)]">
                    <span className="size-2 rounded-full bg-cyanflare" />
                  </span>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition duration-500 hover:border-white/20 hover:bg-white/[0.065]">
                    <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white/38">
                      Milestone {String(index + 1).padStart(2, "0")}
                    </div>
                    <p className="text-lg font-semibold text-white/86">{milestone}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

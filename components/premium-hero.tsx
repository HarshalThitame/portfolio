import type { CSSProperties, ReactNode } from "react";
import { ArrowDown, ArrowUpRight, MessageCircle } from "lucide-react";

type MagneticButtonProps = {
  href: string;
  variant: "primary" | "secondary";
  children: ReactNode;
};

const headlineLines = ["BUILDING DIGITAL", "PRODUCTS THAT", "PEOPLE LOVE TO USE"];
const headlineLabel = headlineLines.join(" ");

const particles = [
  { left: 7, top: 18, size: 2, delay: "-1s", duration: "7s", dx: "28px", dy: "-34px" },
  { left: 16, top: 73, size: 3, delay: "-4s", duration: "9s", dx: "-24px", dy: "38px" },
  { left: 28, top: 28, size: 2, delay: "-2s", duration: "8s", dx: "18px", dy: "-28px" },
  { left: 37, top: 84, size: 2, delay: "-5s", duration: "10s", dx: "-28px", dy: "20px" },
  { left: 49, top: 14, size: 3, delay: "-6s", duration: "11s", dx: "32px", dy: "42px" },
  { left: 58, top: 64, size: 2, delay: "-3s", duration: "8s", dx: "-18px", dy: "-36px" },
  { left: 68, top: 26, size: 2, delay: "-7s", duration: "12s", dx: "22px", dy: "-26px" },
  { left: 76, top: 79, size: 3, delay: "-1s", duration: "9s", dx: "-34px", dy: "24px" },
  { left: 88, top: 20, size: 2, delay: "-5s", duration: "10s", dx: "-20px", dy: "-30px" },
  { left: 93, top: 57, size: 2, delay: "-8s", duration: "12s", dx: "18px", dy: "35px" },
  { left: 12, top: 46, size: 1, delay: "-3s", duration: "8s", dx: "30px", dy: "18px" },
  { left: 44, top: 48, size: 1, delay: "-9s", duration: "13s", dx: "-22px", dy: "32px" },
  { left: 83, top: 42, size: 1, delay: "-4s", duration: "9s", dx: "24px", dy: "-25px" },
  { left: 62, top: 88, size: 1, delay: "-2s", duration: "7s", dx: "-18px", dy: "-28px" },
];

const heroMetrics = [
  "Product-grade UI",
  "AI-ready builds",
  "Scalable systems",
];

function MagneticButton({ href, variant, children }: MagneticButtonProps) {
  const baseClass =
    "magnetic-button group relative inline-flex min-h-14 items-center justify-center overflow-hidden rounded-full px-7 text-sm font-semibold tracking-[0.01em] outline-none transition-[transform,box-shadow,border-color,background,color] duration-500 ease-expo focus-visible:ring-2 focus-visible:ring-cyanflare/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:min-h-16 sm:px-8";
  const variantClass =
    variant === "primary"
      ? "bg-pearl text-ink shadow-[0_0_48px_rgba(248,251,255,0.18)] hover:shadow-[0_0_70px_rgba(97,244,255,0.35)]"
      : "border border-white/15 bg-white/[0.055] text-pearl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl hover:border-white/30 hover:bg-white/[0.09] hover:shadow-[0_0_52px_rgba(139,92,246,0.2)]";

  return (
    <a
      href={href}
      className={`${baseClass} ${variantClass}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition duration-700 group-hover:translate-x-full group-hover:opacity-100"
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {variant === "primary" ? (
          <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        ) : (
          <MessageCircle className="size-4 transition-transform duration-500 group-hover:rotate-6" />
        )}
      </span>
    </a>
  );
}

function AbstractOrb() {
  return (
    <div className="orb-stage hero-orb-stage pointer-events-none relative mx-auto hidden aspect-square w-[min(36vw,30rem)] items-center justify-center lg:flex">
      <div className="hero-orb-glow absolute inset-0 rounded-full bg-[conic-gradient(from_120deg,transparent,rgba(97,244,255,0.2),transparent,rgba(255,178,199,0.16),transparent)] blur-2xl" />
      <div className="hero-orb-core absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_35%_28%,rgba(255,255,255,0.72),rgba(97,244,255,0.23)_20%,rgba(139,92,246,0.18)_46%,rgba(255,255,255,0.045)_68%,rgba(255,255,255,0.015)_100%)] shadow-[inset_-28px_-38px_70px_rgba(0,0,0,0.35),inset_24px_20px_58px_rgba(255,255,255,0.08),0_0_100px_rgba(97,244,255,0.28)] backdrop-blur-2xl" />
      <div className="holo-ring hero-ring-one absolute inset-[6%] rounded-full" />
      <div className="holo-ring hero-ring-two absolute inset-[18%] rounded-full" />
      <div className="holo-ring hero-ring-three absolute inset-[27%] rounded-full border-cyanflare/35" />
      <div className="hero-scanline absolute left-[18%] right-[18%] top-1/2 h-px bg-gradient-to-r from-transparent via-cyanflare/75 to-transparent shadow-[0_0_30px_rgba(97,244,255,0.55)]" />
      <div className="hero-float-one absolute left-[8%] top-[22%] h-20 w-20 rounded-full border border-white/20 bg-white/[0.055] shadow-[0_0_48px_rgba(255,178,199,0.2)] backdrop-blur-2xl" />
      <div className="hero-float-two absolute bottom-[14%] right-[4%] h-24 w-24 rounded-3xl border border-cyanflare/20 bg-cyanflare/[0.06] shadow-[0_0_48px_rgba(97,244,255,0.22)] backdrop-blur-xl" />
      <div className="hero-float-three absolute right-[18%] top-[4%] h-14 w-14 rounded-2xl border border-violetflare/30 bg-violetflare/[0.08] shadow-[0_0_44px_rgba(139,92,246,0.26)] backdrop-blur-xl" />
      <div className="absolute inset-[31%] rounded-full border border-white/10 bg-white/[0.025] blur-sm" />
    </div>
  );
}

export function PremiumHero() {
  return (
    <section
      id="hero"
      className="hero-shell relative flex min-h-screen overflow-hidden bg-ink text-pearl"
      aria-label="Portfolio introduction"
    >
      <div
        aria-hidden="true"
        className="mesh-layer absolute inset-0"
      />
      <div aria-hidden="true" className="aurora-layer absolute -inset-24" />
      <div aria-hidden="true" className="grid-layer absolute inset-x-[-16%] bottom-[-24%] h-[74vh]" />
      <div aria-hidden="true" className="spotlight-layer pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-follower pointer-events-none absolute z-[4] hidden size-52 rounded-full lg:block"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.08),transparent_38%),linear-gradient(to_bottom,rgba(4,5,10,0.04),rgba(4,5,10,0.78))]" />
      <div aria-hidden="true" className="fine-noise pointer-events-none absolute inset-0" />

      <div aria-hidden="true" className="absolute inset-0">
        {particles.map((particle) => (
          <span
            key={`${particle.left}-${particle.top}`}
            className="particle absolute rounded-full bg-cyanflare shadow-[0_0_18px_rgba(97,244,255,0.55)]"
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

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] items-center justify-center px-5 py-24 sm:px-8 lg:px-12 xl:px-16">
        <div
          className="hero-content relative z-20 mx-auto flex max-w-[86rem] flex-col items-center text-center"
        >
          <div
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.055] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-frost/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_44px_rgba(97,244,255,0.12)] backdrop-blur-2xl sm:text-xs"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyanflare opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-cyanflare shadow-[0_0_16px_rgba(97,244,255,0.9)]" />
            </span>
            Available for freelance projects
          </div>

          <h1
            className="font-display text-[1.78rem] font-black uppercase leading-[0.84] tracking-normal min-[360px]:text-[2.04rem] min-[420px]:text-[2.4rem] sm:text-[3.45rem] md:text-[4.45rem] lg:text-[5.6rem] xl:text-[7rem] 2xl:text-[8.2rem]"
            aria-label={headlineLabel}
          >
            {headlineLines.map((line, lineIndex) => (
              <span
                key={line}
                className={`block overflow-hidden pb-[0.05em] ${lineIndex === 2 ? "headline-accent" : "headline-gradient"}`}
                aria-hidden="true"
              >
                {line.split("").map((character, characterIndex) => (
                  <span
                    key={`${line}-${characterIndex}`}
                    className="inline-block will-change-transform"
                  >
                    {character === " " ? "\u00A0" : character}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p
            className="mt-8 max-w-2xl text-balance text-base leading-8 text-frost/78 sm:text-lg lg:text-xl"
          >
            Full Stack Developer focused on building modern web applications,
            AI-powered solutions and exceptional user experiences.
          </p>

          <div
            className="mt-10 flex w-full flex-col items-stretch justify-center gap-4 sm:w-auto sm:flex-row"
          >
            <MagneticButton href="#featured-projects" variant="primary">
              View My Work
            </MagneticButton>
            <MagneticButton href="#contact-form" variant="secondary">
              Let&apos;s Talk
            </MagneticButton>
          </div>

          <div
            className="mt-9 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3"
            aria-label="Engineering strengths"
          >
            {heroMetrics.map((metric) => (
              <div
                key={metric}
                className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white/62 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl"
              >
                {metric}
              </div>
            ))}
          </div>
        </div>

        <div className="parallax-orb absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center opacity-80 lg:flex xl:right-8">
          <AbstractOrb />
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to next section"
        className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 text-white/52 outline-none transition-colors duration-300 hover:text-white focus-visible:text-white"
      >
        <span className="h-12 w-7 rounded-full border border-white/18 bg-white/[0.03] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl">
          <span
            className="block size-1.5 rounded-full bg-white/80"
          />
        </span>
        <ArrowDown className="size-4 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}

import type { ComponentType } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Code2,
  Factory,
  Gauge,
  Globe2,
  Layers3,
  LayoutDashboard,
  Linkedin,
  Mail,
  MessageCircle,
  Rocket,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Sprout,
  Workflow,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";

type StudioIcon = ComponentType<{ className?: string }>;

const studioServices: Array<{
  title: string;
  description: string;
  icon: StudioIcon;
  features: string[];
  className: string;
}> = [
  {
    title: "Business Websites & Web Apps",
    description:
      "Premium web experiences that make companies look credible, load fast, and convert visitors into qualified inquiries.",
    icon: Globe2,
    features: ["Next.js websites", "Lead funnels", "SEO foundations", "Responsive UX"],
    className: "studio-service-large",
  },
  {
    title: "Business Platforms & Dashboards",
    description:
      "Operational software for teams that need cleaner workflows, reporting, role-based access, and better visibility.",
    icon: LayoutDashboard,
    features: ["Admin dashboards", "Reports", "Data workflows", "User management"],
    className: "studio-service-tall",
  },
  {
    title: "SaaS Product Development",
    description:
      "From product architecture to launch-ready interfaces for modern subscription and workflow products.",
    icon: Rocket,
    features: ["Product MVPs", "Auth flows", "Database design", "Launch support"],
    className: "",
  },
  {
    title: "AI Integrations & Automation",
    description:
      "Practical AI features that reduce manual work, improve discovery, and create smarter customer experiences.",
    icon: Bot,
    features: ["AI assistants", "Automation", "Intelligent search", "Workflow agents"],
    className: "",
  },
  {
    title: "UI/UX Engineering",
    description:
      "Interfaces that feel polished, purposeful, and easy to use across mobile, tablet, and desktop.",
    icon: Sparkles,
    features: ["Design systems", "Motion UI", "Mobile-first flows", "Interaction design"],
    className: "",
  },
  {
    title: "Product Support & Iteration",
    description:
      "Post-launch improvements, performance tuning, monitoring readiness, and long-term product growth.",
    icon: ShieldCheck,
    features: ["Optimization", "Maintenance", "Analytics", "Feature planning"],
    className: "",
  },
];

const industries: Array<{
  title: string;
  description: string;
  icon: StudioIcon;
  proof: string;
}> = [
  {
    title: "Dairy & Agriculture",
    description:
      "Collection tracking, farmer records, multilingual interfaces, and mobile-first field workflows.",
    icon: Sprout,
    proof: "Majhi Dairy",
  },
  {
    title: "Manufacturing",
    description:
      "Industrial service websites, inquiry funnels, product showcases, and operational visibility.",
    icon: Factory,
    proof: "Flux3D",
  },
  {
    title: "Small Business",
    description:
      "Modern websites, customer inquiry systems, booking flows, and local business software.",
    icon: BriefcaseBusiness,
    proof: "Lead generation",
  },
  {
    title: "Startups",
    description:
      "MVP planning, fast product builds, landing pages, dashboards, and investor-ready demos.",
    icon: Rocket,
    proof: "Launch support",
  },
  {
    title: "SaaS",
    description:
      "Authentication, subscriptions-ready architecture, admin tooling, and scalable product foundations.",
    icon: Layers3,
    proof: "Product systems",
  },
  {
    title: "AI Products",
    description:
      "AI workflows, assistants, search experiences, and business automation built into real products.",
    icon: Bot,
    proof: "Automation",
  },
];

const caseStudies = [
  {
    title: "Flux3D",
    category: "Industrial Manufacturing Platform",
    description:
      "A premium digital presence for professional 3D printing services, built to explain capabilities, build trust, and generate qualified business inquiries.",
    outcome: "Modernized brand presentation for a technical manufacturing service.",
    href: "/projects/flux3d",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Lead Generation"],
    visual: "flux",
  },
  {
    title: "Majhi Dairy",
    category: "Dairy Management Platform",
    description:
      "A business platform for milk collection, farmer management, reports, multilingual usage, and mobile-first dairy operations.",
    outcome: "Turned manual dairy workflows into a structured digital operating system.",
    href: "/projects/majhi-dairy",
    tags: ["Next.js", "Supabase", "PostgreSQL", "Marathi + English"],
    visual: "dairy",
  },
];

const processSteps = [
  {
    title: "Discover",
    description: "Understand business goals, users, constraints, and what success should look like.",
    icon: SearchCheck,
  },
  {
    title: "Strategy",
    description: "Shape scope, user flows, architecture, milestones, and the launch path.",
    icon: Workflow,
  },
  {
    title: "Design",
    description: "Create the interface system, interaction model, and conversion-focused screens.",
    icon: Sparkles,
  },
  {
    title: "Develop",
    description: "Build the product with clean code, scalable structure, and performance in mind.",
    icon: Code2,
  },
  {
    title: "Launch",
    description: "Deploy, test, optimize, and prepare the experience for real users.",
    icon: Rocket,
  },
  {
    title: "Improve",
    description: "Use feedback, analytics, and business needs to keep evolving the product.",
    icon: Gauge,
  },
];

const faqs = [
  {
    question: "What type of projects can you build?",
    answer:
      "I build modern websites, web applications, business dashboards, SaaS MVPs, AI-powered workflows, and internal tools for real business operations.",
  },
  {
    question: "Can you build complete business software, not just websites?",
    answer:
      "Yes. The studio experience is built around complete product thinking: data models, user flows, dashboards, reports, authentication, deployment, and long-term maintainability.",
  },
  {
    question: "Do you support multilingual workflows like Marathi and English?",
    answer:
      "Yes. Majhi Dairy is designed around Marathi and English workflows, which is useful for local businesses, field teams, and rural-first users.",
  },
  {
    question: "Can AI be added to an existing product?",
    answer:
      "Yes. AI can be integrated for assistants, workflow automation, intelligent search, summaries, recommendations, and internal productivity features.",
  },
  {
    question: "How does the consultation work?",
    answer:
      "Start with a short project discussion. We define your goal, required features, timeline, and the best first version before development begins.",
  },
  {
    question: "What happens after launch?",
    answer:
      "The product can be monitored, improved, optimized, and expanded over time so it keeps supporting the business instead of becoming a one-time handoff.",
  },
];

const trustItems = [
  "Full Stack Development",
  "Next.js Expertise",
  "Business Software",
  "AI Integrations",
  "SEO Foundations",
  "Mobile-First UX",
];

function StudioSectionHeading({
  id,
  label,
  title,
  description,
}: {
  id: string;
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="studio-section-heading">
      <span>{label}</span>
      <h2 id={id}>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function VisualMockup({ type }: { type: string }) {
  return (
    <div className={`studio-case-visual studio-case-visual-${type}`} aria-hidden="true">
      <div className="studio-device studio-device-desktop">
        <div className="studio-device-top">
          <i aria-hidden="true" />
          <i aria-hidden="true" />
          <i aria-hidden="true" />
        </div>
        <div className="studio-device-body">
          <span className="studio-device-chart" />
          <span className="studio-device-line studio-device-line-wide" />
          <span className="studio-device-line" />
          <div className="studio-device-grid">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
      <div className="studio-device studio-device-mobile">
        <span />
        <strong>{type === "flux" ? "3D" : "Milk"}</strong>
        <em>{type === "flux" ? "Quote ready" : "Daily report"}</em>
      </div>
    </div>
  );
}

export function StudioPage() {
  return (
    <main id="studio" className="studio-page">
      <div className="studio-background" aria-hidden="true">
        <div className="studio-mesh" />
        <div className="studio-grid-layer" />
      </div>

      <section className="studio-hero studio-container" aria-labelledby="studio-hero-title">
        <div className="studio-hero-copy">
          <span className="studio-kicker">DIGITAL STUDIO</span>
          <h1 id="studio-hero-title">
            <span>Building Software</span>
            <span>For Real</span>
            <span>Businesses.</span>
          </h1>
          <p>
            I help businesses, startups, and entrepreneurs turn operational problems into fast,
            scalable, beautifully designed digital products.
          </p>
          <div className="studio-hero-actions">
            <Link href="/#contact-form" className="studio-primary-link">
              Start A Project
              <ArrowUpRight className="size-4" />
            </Link>
            <Link href="#studio-case-studies" className="studio-secondary-link">
              View Case Studies
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="studio-proof-row" aria-label="Studio proof points">
            <span>Business-first strategy</span>
            <span>Modern full-stack execution</span>
            <span>Launch-ready systems</span>
          </div>
        </div>

        <div className="studio-command-shell" aria-label="Studio project command center">
          <div className="studio-command-top">
            <span>Studio OS</span>
            <strong>Project Pipeline</strong>
          </div>
          <div className="studio-command-grid">
            <article>
              <span>Inquiry</span>
              <strong>Qualified lead flow</strong>
              <i aria-hidden="true" />
            </article>
            <article>
              <span>Build</span>
              <strong>Dashboard + automation</strong>
              <i aria-hidden="true" />
            </article>
            <article>
              <span>Launch</span>
              <strong>Performance-ready</strong>
              <i aria-hidden="true" />
            </article>
          </div>
          <div className="studio-command-panel">
            <div>
              <span>Consultation ready</span>
              <strong>30 min</strong>
            </div>
            <div>
              <span>Focus</span>
              <strong>Software that works</strong>
            </div>
          </div>
        </div>
      </section>

      <section
        id="studio-services"
        className="studio-section studio-container"
        aria-labelledby="studio-services-title"
      >
        <StudioSectionHeading
          id="studio-services-title"
          label="SERVICES"
          title="A focused software studio for modern product builds."
          description="From premium websites to full business platforms, each engagement is designed around outcomes, usability, and long-term value."
        />
        <div className="studio-services-grid">
          {studioServices.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className={`studio-card studio-service-card ${service.className}`}
              >
                <div className="studio-card-icon">
                  <Icon className="size-5" />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="studio-feature-list">
                  {service.features.map((feature) => (
                    <span key={feature}>{feature}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="studio-industries"
        className="studio-section studio-container"
        aria-labelledby="studio-industries-title"
      >
        <StudioSectionHeading
          id="studio-industries-title"
          label="INDUSTRIES"
          title="Built for businesses that need practical software."
          description="The work is strongest where product design, operations, and engineering meet: real users, real workflows, and measurable business needs."
        />
        <div className="studio-industries-grid">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <article
                key={industry.title}
                className="studio-card studio-industry-card"
              >
                <div className="studio-card-icon">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3>{industry.title}</h3>
                  <p>{industry.description}</p>
                  <span>{industry.proof}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="studio-case-studies"
        className="studio-section studio-container"
        aria-labelledby="studio-case-studies-title"
      >
        <StudioSectionHeading
          id="studio-case-studies-title"
          label="CASE STUDIES"
          title="Product thinking proven through real builds."
          description="These projects show the studio approach in action: business context, polished interfaces, technical execution, and conversion-focused outcomes."
        />
        <div className="studio-case-grid">
          {caseStudies.map((project) => (
            <article key={project.title} className="studio-case-card">
              <VisualMockup type={project.visual} />
              <div className="studio-case-copy">
                <span>{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <strong>{project.outcome}</strong>
                <div className="studio-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <Link href={project.href}>
                  Open Case Study
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="studio-process"
        className="studio-section studio-container"
        aria-labelledby="studio-process-title"
      >
        <StudioSectionHeading
          id="studio-process-title"
          label="PROCESS"
          title="A clear path from idea to launch."
          description="A premium experience is not only about visuals. It comes from a disciplined process that keeps business goals, users, and engineering aligned."
        />
        <div className="studio-process-grid">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article
                key={step.title}
                className="studio-process-card"
              >
                <span className="studio-process-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="studio-card-icon">
                  <Icon className="size-5" />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="studio-faq"
        className="studio-section studio-container studio-faq-section"
        aria-labelledby="studio-faq-title"
      >
        <div className="studio-faq-intro">
          <span className="studio-kicker">FAQ</span>
          <h2 id="studio-faq-title">Questions before we build.</h2>
          <p>
            The goal is to make the first conversation simple: understand the business, define the
            best version to build, and move with clarity.
          </p>
        </div>
        <div className="studio-faq-list">
          {faqs.map((item, index) => (
            <details key={item.question} className="studio-faq-item" open={index === 0}>
              <summary>
                {item.question}
                <span aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section
        id="studio-consultation"
        className="studio-consultation studio-container"
        aria-labelledby="studio-consultation-title"
      >
        <div className="studio-consult-panel">
          <div className="studio-consult-copy">
            <span className="studio-kicker">CONSULTATION BOOKING</span>
            <h2 id="studio-consultation-title">Have a business problem worth solving?</h2>
            <p>
              Share the project goal, current workflow, and the result you want. I will help shape
              the first useful version and the best route to launch.
            </p>
            <div className="studio-consult-actions">
              <Link href="/#contact-form" className="studio-primary-link">
                Book A Free Consultation
                <CalendarDays className="size-4" />
              </Link>
              <a
                href={siteConfig.links.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="studio-secondary-link"
              >
                WhatsApp
                <MessageCircle className="size-4" />
              </a>
            </div>
          </div>

          <div className="studio-booking-card" aria-label="Consultation options">
            <div className="studio-booking-top">
              <span>Available for new projects</span>
              <i aria-hidden="true" />
            </div>
            <div className="studio-booking-slots">
              <span>Discovery call</span>
              <strong>30 minutes</strong>
              <span>Project fit</span>
              <strong>Website, platform, SaaS, AI</strong>
              <span>Best next step</span>
              <strong>Scope and launch plan</strong>
            </div>
            <div className="studio-contact-options">
              <a href={siteConfig.links.email}>
                <Mail className="size-4" />
                Email
              </a>
              <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="size-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="studio-trust-strip" aria-label="Trust signals">
          {trustItems.map((item) => (
            <span key={item}>
              <CheckCircle2 className="size-4" />
              {item}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}

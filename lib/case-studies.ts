import { absoluteUrl } from "@/lib/site-config";

export type CaseStudySlug = "flux3d" | "majhi-dairy";

export type CaseStudy = {
  slug: CaseStudySlug;
  name: string;
  category: string;
  tagline: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  industry: string;
  targetUsers: string;
  projectType: string;
  timeline: string;
  role: string[];
  stack: string[];
  liveHref: string;
  liveLabel: string;
  accent: "cyan" | "rose";
  highlights: string[];
  challenge: {
    intro: string;
    points: Array<{ title: string; description: string }>;
  };
  solution: {
    intro: string;
    pillars: Array<{ title: string; description: string }>;
  };
  features: Array<{
    title: string;
    description: string;
    visual: "desktop" | "mobile" | "dashboard" | "analytics" | "workflow" | "lead";
  }>;
  gallery: Array<{
    title: string;
    type: "Desktop" | "Tablet" | "Mobile" | "Dashboard" | "Analytics";
    visual: "desktop" | "mobile" | "dashboard" | "analytics" | "workflow" | "lead";
  }>;
  process: Array<{ phase: string; description: string }>;
  results: Array<{ value: string; label: string; description: string }>;
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "flux3d",
    name: "FLUX3D",
    category: "Industrial Manufacturing Platform",
    tagline: "Transforming Ideas Into Precision 3D Printed Solutions",
    description:
      "A premium business platform for professional 3D printing services, rapid prototyping and custom manufacturing solutions.",
    seoTitle: "Flux3D Case Study | Industrial 3D Printing Website by Harshal",
    seoDescription:
      "Case study for Flux3D, a modern industrial 3D printing services platform built with Next.js, React, TypeScript, Tailwind CSS and Vercel.",
    industry: "Manufacturing & Industrial",
    targetUsers: "Founders, product teams, engineers and businesses needing custom parts or rapid prototypes.",
    projectType: "Business website and lead-generation platform",
    timeline: "3-4 weeks",
    role: ["Full Stack Developer", "Technology Lead", "Product Designer"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    liveHref: "https://flux3d.in",
    liveLabel: "Live Website",
    accent: "cyan",
    highlights: [
      "Service showcase",
      "Lead generation",
      "Responsive design",
      "Modern UI",
      "SEO optimization",
      "Performance optimization",
    ],
    challenge: {
      intro:
        "3D printing services need to translate technical manufacturing capabilities into a website that feels trustworthy, easy to understand and conversion focused.",
      points: [
        {
          title: "Technical offer, unclear buyer journey",
          description:
            "Visitors needed to understand materials, services and use cases quickly before deciding whether to start a quote conversation.",
        },
        {
          title: "Trust needed to happen fast",
          description:
            "Manufacturing buyers evaluate quality and reliability in seconds. The interface needed to communicate professionalism without becoming visually heavy.",
        },
        {
          title: "Mobile discovery mattered",
          description:
            "Potential customers might discover the brand from social links or referrals, so the core pitch and inquiry flow needed to work cleanly on phones.",
        },
      ],
    },
    solution: {
      intro:
        "The solution positions Flux3D as a modern manufacturing partner through a sharp product narrative, responsive service presentation and direct inquiry paths.",
      pillars: [
        {
          title: "Conversion-led information architecture",
          description:
            "Services, materials and proof points were ordered around how a customer decides to request a quote.",
        },
        {
          title: "Premium technical visual language",
          description:
            "Dark UI, glass panels and crisp product mockups create a high-quality industrial technology feel.",
        },
        {
          title: "Fast, responsive implementation",
          description:
            "The site was built with a modern Next.js stack to keep loading, SEO and device responsiveness strong.",
        },
      ],
    },
    features: [
      {
        title: "Service Showcase",
        description:
          "A structured service narrative helps visitors understand 3D printing capabilities without needing technical background.",
        visual: "lead",
      },
      {
        title: "Lead-Ready Inquiry Flow",
        description:
          "Primary CTAs guide users toward quote discussions while keeping the page focused and low friction.",
        visual: "desktop",
      },
      {
        title: "Responsive Product Presence",
        description:
          "The experience scales from large desktop presentations to mobile-first browsing without losing hierarchy.",
        visual: "mobile",
      },
    ],
    gallery: [
      { title: "Homepage Service Pitch", type: "Desktop", visual: "desktop" },
      { title: "Quote Conversion Panel", type: "Tablet", visual: "lead" },
      { title: "Mobile Service Flow", type: "Mobile", visual: "mobile" },
      { title: "Performance & SEO System", type: "Analytics", visual: "analytics" },
    ],
    process: [
      {
        phase: "Research",
        description: "Mapped the customer decision path for prototype and manufacturing service inquiries.",
      },
      {
        phase: "Planning",
        description: "Defined page hierarchy, CTA placement and content sections around conversion.",
      },
      {
        phase: "UI/UX Design",
        description: "Created a premium industrial visual direction with strong service clarity.",
      },
      {
        phase: "Development",
        description: "Built the responsive Next.js interface with reusable components and polished motion.",
      },
      {
        phase: "Testing",
        description: "Checked responsiveness, interaction states and performance-sensitive animation behavior.",
      },
      {
        phase: "Deployment",
        description: "Prepared the site for fast production delivery on Vercel.",
      },
    ],
    results: [
      {
        value: "100%",
        label: "Responsive",
        description: "Core presentation and inquiry paths work across desktop, tablet and mobile.",
      },
      {
        value: "Lead",
        label: "Focused",
        description: "The site is structured to move visitors from interest to quote discussion.",
      },
      {
        value: "Modern",
        label: "Brand Presence",
        description: "Flux3D now feels like a polished industrial technology business.",
      },
    ],
    testimonial: {
      quote:
        "Placeholder testimonial area prepared for Flux3D feedback, launch notes or customer success metrics.",
      author: "Flux3D",
      role: "Future client testimonial",
    },
  },
  {
    slug: "majhi-dairy",
    name: "Majhi Dairy",
    category: "Dairy Management Platform",
    tagline: "Digitizing Dairy Operations For Modern Farmers",
    description:
      "A dairy operations platform for milk collection tracking, farmer records, multilingual workflows, reporting and mobile-first management.",
    seoTitle: "Majhi Dairy Case Study | Dairy Management Platform by Harshal",
    seoDescription:
      "Case study for Majhi Dairy, a multilingual dairy management platform built with Next.js, React, TypeScript, Supabase, PostgreSQL and Tailwind CSS.",
    industry: "Dairy & Agriculture",
    targetUsers: "Dairy owners, collection centers, farmers, operators and field teams.",
    projectType: "Business operations platform",
    timeline: "6-8 weeks",
    role: ["Full Stack Developer", "Technology Lead", "Product Designer"],
    stack: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    liveHref: "/projects/majhi-dairy#gallery",
    liveLabel: "View Demo Preview",
    accent: "rose",
    highlights: [
      "Multi-language support",
      "Marathi & English interface",
      "Milk collection tracking",
      "Farmer management",
      "Reports & analytics",
      "Mobile-first workflows",
    ],
    challenge: {
      intro:
        "Dairy operations depend on accurate daily collection data, reliable farmer records and simple reporting across teams that may not work from a desktop.",
      points: [
        {
          title: "Manual records slowed decisions",
          description:
            "Milk collection, farmer details and production records needed a more reliable system than scattered paper or spreadsheet workflows.",
        },
        {
          title: "Language accessibility was essential",
          description:
            "The product needed to support Marathi and English so operators and business owners could use it comfortably.",
        },
        {
          title: "The workflow had to be mobile-first",
          description:
            "Collection and farmer management often happen away from a desk, so speed and clarity on smaller screens became a product requirement.",
        },
      ],
    },
    solution: {
      intro:
        "Majhi Dairy centralizes operational records into a product designed around daily collection, farmer management and practical reporting.",
      pillars: [
        {
          title: "Operational dashboard",
          description:
            "Collection, farmer and reporting views are organized around the most repeated daily workflows.",
        },
        {
          title: "Multilingual UX",
          description:
            "Marathi and English interface patterns make the application more usable for local dairy operations.",
        },
        {
          title: "Scalable data foundation",
          description:
            "Supabase and PostgreSQL support structured records, authentication-ready workflows and future analytics expansion.",
        },
      ],
    },
    features: [
      {
        title: "Milk Collection Tracking",
        description:
          "Daily collection entries capture milk quantity, quality context and farmer associations for reliable records.",
        visual: "workflow",
      },
      {
        title: "Farmer Management",
        description:
          "Farmer profiles centralize operational details so teams can manage records without manual searching.",
        visual: "dashboard",
      },
      {
        title: "Reports & Analytics",
        description:
          "Analytics views turn collection records into practical reporting for business decisions.",
        visual: "analytics",
      },
      {
        title: "Marathi & English Interface",
        description:
          "The interface supports bilingual workflows for users who need local-language clarity.",
        visual: "mobile",
      },
    ],
    gallery: [
      { title: "Collection Dashboard", type: "Dashboard", visual: "dashboard" },
      { title: "Mobile Milk Entry", type: "Mobile", visual: "mobile" },
      { title: "Farmer Records", type: "Tablet", visual: "workflow" },
      { title: "Reports & Analytics", type: "Analytics", visual: "analytics" },
    ],
    process: [
      {
        phase: "Research",
        description: "Understood dairy collection workflows, farmer records and reporting needs.",
      },
      {
        phase: "Planning",
        description: "Mapped the product around collection, farmer management and analytics modules.",
      },
      {
        phase: "UI/UX Design",
        description: "Designed a practical bilingual interface for mobile and dashboard workflows.",
      },
      {
        phase: "Development",
        description: "Implemented the frontend, database-ready structure and responsive product flows.",
      },
      {
        phase: "Testing",
        description: "Validated mobile usability, data entry flows and responsive dashboard layouts.",
      },
      {
        phase: "Deployment",
        description: "Prepared the platform for demo, iteration and business workflow expansion.",
      },
    ],
    results: [
      {
        value: "2",
        label: "Languages",
        description: "Marathi and English workflows support broader operational adoption.",
      },
      {
        value: "Mobile",
        label: "First",
        description: "Core collection and management flows are designed for real field usage.",
      },
      {
        value: "Ops",
        label: "Ready",
        description: "The system gives dairy teams a clearer foundation for records and reports.",
      },
    ],
    testimonial: {
      quote:
        "Placeholder testimonial area ready for dairy operator feedback, adoption notes or operational metrics.",
      author: "Majhi Dairy",
      role: "Future client testimonial",
    },
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((project) => project.slug === slug);
}

export function getNextCaseStudy(slug: CaseStudySlug) {
  const currentIndex = caseStudies.findIndex((project) => project.slug === slug);
  return caseStudies[(currentIndex + 1) % caseStudies.length];
}

export function getCaseStudyUrl(slug: CaseStudySlug) {
  return absoluteUrl(`/projects/${slug}`);
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@example.com";
const whatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "910000000000";
const whatsAppMessage =
  "Hi Harshal,\nI visited your portfolio and would like to discuss a project.";

export const siteConfig = {
  name: "Harshal",
  role: "Full Stack Developer",
  url: siteUrl,
  email,
  phoneDisplay: "+91 00000 00000",
  whatsAppNumber,
  whatsAppMessage,
  seoTitle: "Harshal | Full Stack Developer | Next.js, React & AI Solutions",
  seoDescription:
    "Full Stack Developer specializing in modern web applications, business platforms, AI integrations and custom software solutions.",
  links: {
    email: `mailto:${email}`,
    whatsapp: `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(whatsAppMessage)}`,
    linkedin: "https://www.linkedin.com/in/harshal",
    github: "https://github.com/harshal",
    twitter: "https://x.com/harshal",
    resume: "/resume",
  },
  keywords: [
    "Harshal Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "AI Integrations",
    "Business Software Development",
    "SaaS Development",
    "Custom Web Applications",
  ],
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

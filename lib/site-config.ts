const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://harshaldevwork.vercel.app";
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "harshal.dev.work@gmail.com";
const whatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919623023477";
const whatsAppMessage =
  "Hi Harshal,\nI visited your portfolio and would like to discuss a project. Please let me know when we can connect.";

export const siteConfig = {
  name: "Harshal",
  role: "Full Stack Developer",
  url: siteUrl,
  email,
  phoneDisplay: "+91 96230 23477",
  whatsAppNumber,
  whatsAppMessage,
  seoTitle: "Harshal | Full Stack Developer | Next.js, React & AI Solutions",
  seoDescription:
    "Full Stack Developer specializing in modern web applications, business platforms, AI integrations and custom software solutions.",
  links: {
    email: `mailto:${email}`,
    whatsapp: `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(whatsAppMessage)}`,
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

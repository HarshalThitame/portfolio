import Link from "next/link";
import { ArrowUpRight, Mail, Menu, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const navItems = [
  { label: "Home", href: "/#hero" },
  { label: "Studio", href: "/studio" },
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#featured-projects" },
  { label: "Services", href: "/#services" },
  { label: "Clients", href: "/#client-acquisition" },
  { label: "Labs", href: "/labs" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export function StaticSiteChrome() {
  return (
    <div className="static-site-chrome" aria-label="Primary quick navigation">
      <div aria-hidden="true" className="scroll-progress-shell">
        <div className="scroll-progress-bar" />
      </div>

      <header className="site-nav">
        <nav aria-label="Primary navigation" className="site-nav-inner">
          <Link href="/#hero" className="site-mark" aria-label="Go to top">
            <span className="site-monogram">H</span>
            <small>Harshal</small>
          </Link>

          <div className="site-nav-links">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <Link href="/#contact-form" className="site-nav-cta">
            Start
            <ArrowUpRight className="size-3.5" />
          </Link>

          <Link href="/#contact-form" className="site-mobile-toggle" aria-label="Start a project">
            <Menu className="size-5" />
          </Link>
        </nav>
      </header>

      <aside className="quick-contact-bar" aria-label="Quick contact links">
        <a href={siteConfig.links.email} aria-label="Email Harshal">
          <Mail className="size-4" />
          <span>Email</span>
        </a>
        <a
          href={siteConfig.links.whatsapp}
          target="_blank"
          rel="noreferrer"
          aria-label="Message Harshal on WhatsApp"
        >
          <MessageCircle className="size-4" />
          <span>WhatsApp</span>
        </a>
      </aside>

      <a
        href={siteConfig.links.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp group"
        aria-label="Let's discuss your project on WhatsApp"
      >
        <MessageCircle className="size-5" />
        <span>Let&apos;s discuss your project</span>
      </a>
    </div>
  );
}

import type { Metadata, Viewport } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import { StaticSiteChrome } from "@/components/static-site-chrome";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import "./globals.css";

const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "Arial"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "Arial"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.seoTitle,
  description: siteConfig.seoDescription,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.seoTitle,
    description: siteConfig.seoDescription,
    url: siteConfig.url,
    siteName: `${siteConfig.name} Portfolio`,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seoTitle,
    description: siteConfig.seoDescription,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
  themeColor: "#04050a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteConfig.name,
      jobTitle: siteConfig.role,
      url: siteConfig.url,
      email: siteConfig.email,
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "AI Integrations",
        "Business Software",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: `${siteConfig.name} Portfolio`,
      url: siteConfig.url,
      description: siteConfig.seoDescription,
      inLanguage: "en",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: `${siteConfig.name} Software Consulting`,
      url: siteConfig.url,
      founder: {
        "@type": "Person",
        name: siteConfig.name,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: `${siteConfig.name} - Full Stack Development Services`,
      url: siteConfig.url,
      email: siteConfig.email,
      areaServed: "Worldwide",
      serviceType: [
        "Full Stack Development",
        "Modern Web Applications",
        "Business Platforms",
        "AI Integrations",
        "SaaS Development",
      ],
      image: absoluteUrl("/opengraph-image"),
      provider: {
        "@type": "Person",
        name: siteConfig.name,
      },
    },
  ];
  const analyticsScript = `
    (() => {
      const send = () => {
        const payload = JSON.stringify({
          type: "portfolio_visit",
          path: location.pathname,
          name: "portfolio_visit",
          page_path: location.pathname,
          page_title: document.title,
          timestamp: new Date().toISOString()
        });
        if (navigator.sendBeacon) {
          navigator.sendBeacon("/api/monitoring", new Blob([payload], { type: "application/json" }));
        } else {
          fetch("/api/monitoring", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload,
            keepalive: true
          }).catch(() => {});
        }
      };
      const schedule = window.requestIdleCallback
        ? () => window.requestIdleCallback(send, { timeout: 6000 })
        : () => window.setTimeout(send, 3500);
      schedule();
    })();
  `;
  const googleAnalyticsScript = googleAnalyticsId
    ? `
      window.setTimeout(() => {
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}";
        document.head.appendChild(script);
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag("js", new Date());
        gtag("config", "${googleAnalyticsId}", { page_path: window.location.pathname });
      }, 4500);
    `
    : "";

  return (
    <html lang="en" data-performance="balanced" className={`${geist.variable} ${spaceGrotesk.variable}`}>
      <body>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <StaticSiteChrome />
        {children}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: `${analyticsScript}${googleAnalyticsScript}` }}
        />
      </body>
    </html>
  );
}

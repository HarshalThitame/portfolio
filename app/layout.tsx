import type { Metadata, Viewport } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { PerformanceMonitor } from "@/components/performance-monitor";
import { SiteExperience } from "@/components/site-experience";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import "./globals.css";

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

  return (
    <html lang="en" className={`${geist.variable} ${spaceGrotesk.variable}`}>
      <body>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Analytics />
        <PerformanceMonitor />
        <SiteExperience />
        {children}
      </body>
    </html>
  );
}

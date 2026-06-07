import type { Metadata } from "next";
import { StudioPage } from "@/components/studio-page";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

const title = "Digital Studio | Business Software, SaaS & AI Products | Harshal";
const description =
  "Premium software studio experience by Harshal, building modern websites, business platforms, SaaS products and AI integrations for real businesses.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/studio",
  },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/studio"),
    siteName: `${siteConfig.name} Digital Studio`,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Digital Studio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
};

export default function StudioRoute() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${siteConfig.name} Digital Studio`,
    url: absoluteUrl("/studio"),
    email: siteConfig.email,
    description,
    areaServed: "Worldwide",
    serviceType: [
      "Business Website Development",
      "Business Platform Development",
      "SaaS Development",
      "AI Integration",
      "UI/UX Engineering",
      "Software Consulting",
    ],
    provider: {
      "@type": "Person",
      name: siteConfig.name,
      jobTitle: siteConfig.role,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <StudioPage />
    </>
  );
}

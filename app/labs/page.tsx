import type { Metadata } from "next";
import { LabsPageExperience } from "@/components/labs-section";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Experiments & Labs | ${siteConfig.name} | Interactive Developer Portfolio`,
  description:
    "Interactive technical labs showcasing AI experiments, UI concepts, data visualizations, 3D interactions and creative coding projects.",
  alternates: {
    canonical: "/labs",
  },
  keywords: [
    "developer experiments",
    "interactive portfolio",
    "AI experiments",
    "UI concepts",
    "data visualization",
    "creative coding",
    "3D interactions",
  ],
  openGraph: {
    title: `Experiments & Labs | ${siteConfig.name}`,
    description:
      "A premium interactive lab showcasing AI, UI, data, 3D and creative coding experiments.",
    url: `${siteConfig.url}/labs`,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Experiments and Labs`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Experiments & Labs | ${siteConfig.name}`,
    description:
      "Interactive labs for AI experiments, UI concepts, data visualizations, 3D interactions and creative coding.",
    images: ["/opengraph-image"],
  },
};

export default function LabsPage() {
  return <LabsPageExperience />;
}

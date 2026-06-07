import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/case-study-page";
import { caseStudies, getCaseStudy, getCaseStudyUrl } from "@/lib/case-studies";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudy(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.seoTitle,
    description: project.seoDescription,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    keywords: [
      project.name,
      project.category,
      project.industry,
      "case study",
      "Next.js project",
      "React portfolio project",
      "business software development",
    ],
    openGraph: {
      title: project.seoTitle,
      description: project.seoDescription,
      url: getCaseStudyUrl(project.slug),
      siteName: `${siteConfig.name} Portfolio`,
      type: "article",
      images: [
        {
          url: `/projects/${project.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${project.name} case study by ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.seoTitle,
      description: project.seoDescription,
      images: [`/projects/${project.slug}/opengraph-image`],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getCaseStudy(slug);

  if (!project) notFound();

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: `${project.name} Case Study`,
      headline: project.tagline,
      description: project.seoDescription,
      url: getCaseStudyUrl(project.slug),
      image: absoluteUrl(`/projects/${project.slug}/opengraph-image`),
      author: {
        "@type": "Person",
        name: siteConfig.name,
        jobTitle: siteConfig.role,
        url: siteConfig.url,
      },
      about: project.category,
      keywords: project.stack.join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: project.name,
      applicationCategory: project.projectType,
      operatingSystem: "Web",
      description: project.description,
      creator: {
        "@type": "Person",
        name: siteConfig.name,
      },
      url: getCaseStudyUrl(project.slug),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Portfolio",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Projects",
          item: absoluteUrl("/#featured-projects"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: project.name,
          item: getCaseStudyUrl(project.slug),
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CaseStudyPage project={project} />
    </>
  );
}

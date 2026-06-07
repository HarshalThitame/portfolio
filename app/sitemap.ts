import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { caseStudies } from "@/lib/case-studies";
import { absoluteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date("2026-06-07"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/resume"),
      lastModified: new Date("2026-06-07"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/studio"),
      lastModified: new Date("2026-06-07"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: new Date("2026-06-07"),
      changeFrequency: "weekly",
      priority: 0.82,
    },
    {
      url: absoluteUrl("/labs"),
      lastModified: new Date("2026-06-07"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...caseStudies.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: new Date("2026-06-07"),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: post.featured ? 0.78 : 0.72,
    })),
  ];
}

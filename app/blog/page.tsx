import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog-index";
import { getAllCategories, getAllPosts, getAllTags } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Blog | ${siteConfig.name} | Full Stack Developer`,
  description:
    "Practical articles on Next.js, SaaS development, AI integrations, product design and business software from Harshal.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description:
      "Practical articles on building modern web applications, SaaS platforms and AI-powered business software.",
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  return <BlogIndex posts={posts} categories={categories} tags={tags} />;
}

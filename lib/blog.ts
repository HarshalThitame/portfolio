import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { absoluteUrl } from "@/lib/site-config";

const blogDirectory = path.join(process.cwd(), "content", "blog");

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  featured: boolean;
  readingTime: string;
  wordCount: number;
};

export type BlogPost = BlogPostMeta & {
  content: string;
  toc: Array<{ id: string; title: string; level: number }>;
};

type Frontmatter = {
  title?: string;
  description?: string;
  date?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getPostSlugs() {
  if (!fs.existsSync(blogDirectory)) return [];
  return fs
    .readdirSync(blogDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function extractToc(content: string) {
  return content
    .split("\n")
    .filter((line) => /^#{2,3}\s/.test(line))
    .map((line) => {
      const level = line.startsWith("###") ? 3 : 2;
      const title = line.replace(/^#{2,3}\s/, "").trim();
      return {
        id: slugify(title),
        title,
        level,
      };
    });
}

function readPost(slug: string): BlogPost {
  const filePath = path.join(blogDirectory, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as Frontmatter;
  const stats = readingTime(content);

  return {
    slug,
    title: frontmatter.title ?? slug,
    description: frontmatter.description ?? "",
    date: frontmatter.date ?? new Date().toISOString(),
    category: frontmatter.category ?? "Writing",
    tags: frontmatter.tags ?? [],
    featured: Boolean(frontmatter.featured),
    readingTime: stats.text,
    wordCount: content.split(/\s+/).filter(Boolean).length,
    content,
    toc: extractToc(content),
  };
}

export function getAllPosts() {
  return getPostSlugs()
    .map(readPost)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export function getPostBySlug(slug: string) {
  if (!getPostSlugs().includes(slug)) return null;
  return readPost(slug);
}

export function getFeaturedPosts() {
  return getAllPosts().filter((post) => post.featured);
}

export function getAllCategories() {
  return Array.from(new Set(getAllPosts().map((post) => post.category))).sort();
}

export function getAllTags() {
  return Array.from(new Set(getAllPosts().flatMap((post) => post.tags))).sort();
}

export function getRelatedPosts(post: BlogPost, limit = 3) {
  return getAllPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) => post.tags.includes(tag)).length;
      const categoryMatch = candidate.category === post.category ? 2 : 0;
      return {
        post: candidate,
        score: sharedTags + categoryMatch,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

export function getBlogPostUrl(slug: string) {
  return absoluteUrl(`/blog/${slug}`);
}

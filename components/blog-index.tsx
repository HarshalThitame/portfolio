"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Mail,
  Search,
  Sparkles,
  Tags,
} from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";

const premiumEase = [0.16, 1, 0.3, 1] as const;

export function BlogIndex({
  posts,
  categories,
  tags,
}: {
  posts: BlogPostMeta[];
  categories: string[];
  tags: string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [activeTag, setActiveTag] = useState("All");

  const featuredPosts = posts.filter((post) => post.featured);
  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      const matchesTag = activeTag === "All" || post.tags.includes(activeTag);
      const matchesQuery =
        !normalizedQuery ||
        [post.title, post.description, post.category, ...post.tags]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesTag && matchesQuery;
    });
  }, [activeTag, category, posts, query]);

  return (
    <main id="blog" className="blog-page relative overflow-hidden bg-ink text-pearl">
      <div aria-hidden="true" className="blog-mesh absolute inset-0" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_bottom,#04050a,rgba(4,5,10,0.84)_14%,rgba(4,5,10,0.82)_86%,#04050a)]" />

      <section className="relative z-10 mx-auto min-h-screen w-full max-w-[1440px] px-5 pb-20 pt-32 sm:px-8 lg:px-12 xl:px-16">
        <header className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <motion.p
              className="blog-kicker"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, ease: premiumEase }}
            >
              Insights & Learnings
            </motion.p>
            <motion.h1
              className="font-display text-5xl font-black leading-[0.92] tracking-normal text-white sm:text-6xl md:text-7xl xl:text-8xl"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.88, ease: premiumEase }}
            >
              Practical writing for
              <span className="headline-accent block">builders and businesses.</span>
            </motion.h1>
            <motion.p
              className="mt-7 max-w-3xl text-lg leading-8 text-frost/70 sm:text-xl"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.78, ease: premiumEase }}
            >
              Articles on building real products, SaaS platforms, AI features,
              performance and software for practical business workflows.
            </motion.p>
          </div>

          <motion.form
            className="blog-newsletter"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.82, ease: premiumEase }}
            onSubmit={(event) => event.preventDefault()}
          >
            <Mail className="size-6 text-cyanflare" />
            <h2>Get product notes</h2>
            <p>Newsletter UI ready for future integrations and audience building.</p>
            <div className="blog-newsletter-row">
              <input type="email" placeholder="Email address" aria-label="Email address" />
              <button type="submit">Join</button>
            </div>
          </motion.form>
        </header>

        <section className="mt-16">
          <div className="blog-search-shell">
            <Search className="size-5" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search articles, topics or tags"
              aria-label="Search articles"
            />
          </div>

          <div className="blog-filter-row" aria-label="Blog categories">
            {["All", ...categories].map((item) => (
              <button
                key={item}
                type="button"
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="blog-tag-row" aria-label="Blog tags">
            <span>
              <Tags className="size-4" />
              Tags
            </span>
            {["All", ...tags].map((tag) => (
              <button
                key={tag}
                type="button"
                className={activeTag === tag ? "active" : ""}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        {featuredPosts.length > 0 ? (
          <section className="mt-16">
            <div className="blog-section-heading">
              <p>Featured Articles</p>
              <h2>Start here.</h2>
            </div>
            <div className="blog-featured-grid">
              {featuredPosts.map((post, index) => (
                <ArticleCard key={post.slug} post={post} index={index} featured />
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-20">
          <div className="blog-section-heading">
            <p>All Articles</p>
            <h2>{filteredPosts.length} posts found.</h2>
          </div>
          <div className="blog-grid">
            {filteredPosts.map((post, index) => (
              <ArticleCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

function ArticleCard({
  post,
  index,
  featured,
}: {
  post: BlogPostMeta;
  index: number;
  featured?: boolean;
}) {
  return (
    <motion.article
      className={`blog-card ${featured ? "blog-card-featured" : ""}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.05, duration: 0.72, ease: premiumEase }}
      whileHover={{ y: -6 }}
    >
      <Link href={`/blog/${post.slug}`} className="blog-card-link">
        <div className="blog-card-top">
          <span>{post.category}</span>
          <ArrowUpRight className="size-4" />
        </div>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <div className="blog-card-meta">
          <span>
            <BookOpen className="size-4" />
            {post.readingTime}
          </span>
          <span>{new Date(post.date).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}</span>
        </div>
        <div className="blog-card-tags">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {featured ? (
          <span className="blog-featured-mark">
            <Sparkles className="size-4" />
            Featured
          </span>
        ) : null}
      </Link>
    </motion.article>
  );
}

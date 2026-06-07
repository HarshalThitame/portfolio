import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { ReadingProgress, ShareButtons } from "@/components/blog-reading-tools";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { getAllPosts, getBlogPostUrl, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${post.title} | ${siteConfig.name}`,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    keywords: [...post.tags, post.category, "Next.js", "software consultant", "full stack developer"],
    openGraph: {
      title: post.title,
      description: post.description,
      url: getBlogPostUrl(post.slug),
      siteName: `${siteConfig.name} Portfolio`,
      type: "article",
      publishedTime: post.date,
      authors: [siteConfig.name],
      tags: post.tags,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post);
  const url = getBlogPostUrl(post.slug);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      jobTitle: siteConfig.role,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: `${siteConfig.name} Software Consulting`,
      url: siteConfig.url,
    },
    mainEntityOfPage: url,
    keywords: post.tags.join(", "),
  };

  return (
    <main id="blog" className="article-page relative overflow-hidden bg-ink text-pearl">
      <ReadingProgress />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div aria-hidden="true" className="blog-mesh absolute inset-0" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_bottom,#04050a,rgba(4,5,10,0.86)_14%,rgba(4,5,10,0.82)_86%,#04050a)]" />

      <article className="relative z-10 mx-auto grid w-full max-w-[1440px] gap-12 px-5 pb-24 pt-32 sm:px-8 lg:grid-cols-[0.68fr_minmax(0,1fr)_0.32fr] lg:px-12 xl:px-16">
        <aside className="article-sidebar article-sidebar-left">
          <Link href="/blog" className="article-back-link">
            Back to Blog
          </Link>
          <ShareButtons title={post.title} url={url} />
        </aside>

        <div className="min-w-0">
          <header className="article-hero">
            <p>{post.category}</p>
            <h1>{post.title}</h1>
            <span>{post.description}</span>
            <div className="article-meta-row">
              <span>{post.readingTime}</span>
              <span>{post.wordCount} words</span>
              <span>
                {new Date(post.date).toLocaleDateString("en", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="article-tags">
              {post.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </header>

          <div className="article-prose">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    [
                      rehypePrettyCode,
                      {
                        theme: "github-dark",
                        keepBackground: false,
                      },
                    ],
                  ],
                },
              }}
            />
          </div>

          {relatedPosts.length > 0 ? (
            <section className="article-related">
              <p>Related Posts</p>
              <div>
                {relatedPosts.map((related) => (
                  <Link key={related.slug} href={`/blog/${related.slug}`}>
                    <span>{related.category}</span>
                    <strong>{related.title}</strong>
                    <small>{related.readingTime}</small>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="article-sidebar article-toc">
          <p>On This Page</p>
          <nav aria-label="Table of contents">
            {post.toc.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={item.level === 3 ? "nested" : ""}>
                {item.title}
              </a>
            ))}
          </nav>
          <div className="article-newsletter">
            <strong>Build notes</strong>
            <span>Newsletter UI ready for future publishing workflows.</span>
            <input type="email" placeholder="Email address" aria-label="Email address" />
          </div>
        </aside>
      </article>
    </main>
  );
}

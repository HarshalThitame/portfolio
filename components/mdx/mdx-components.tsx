import type { MDXComponents } from "mdx/types";

function createHeading(level: 2 | 3) {
  const Heading = ({ children }: { children?: React.ReactNode }) => {
    const text = String(children ?? "");
    const id = text
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    const Tag = `h${level}` as const;

    return <Tag id={id}>{children}</Tag>;
  };

  Heading.displayName = `MdxH${level}`;
  return Heading;
}

export const mdxComponents: MDXComponents = {
  h2: createHeading(2),
  h3: createHeading(3),
  a: ({ children, href }) => (
    <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noreferrer" : undefined}>
      {children}
    </a>
  ),
};

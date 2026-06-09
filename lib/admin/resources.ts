export type AdminFieldType =
  | "text"
  | "textarea"
  | "email"
  | "url"
  | "number"
  | "date"
  | "datetime"
  | "select"
  | "boolean"
  | "tags"
  | "json";

export type AdminField = {
  name: string;
  label: string;
  type: AdminFieldType;
  required?: boolean;
  placeholder?: string;
  help?: string;
  options?: string[];
  rows?: number;
  defaultValue?: string | number | boolean | string[] | Record<string, unknown> | Array<Record<string, unknown>>;
  wide?: boolean;
};

export type AdminResourceConfig = {
  slug: string;
  title: string;
  singular: string;
  description: string;
  table: string;
  icon: string;
  orderBy?: string;
  orderAscending?: boolean;
  createLabel?: string;
  readOnly?: boolean;
  archiveField?: string;
  archiveValue?: string;
  titleField: string;
  listFields: string[];
  fields: AdminField[];
};

const seoField: AdminField = {
  name: "seo_metadata",
  label: "SEO Metadata",
  type: "json",
  rows: 7,
  wide: true,
  defaultValue: {
    title: "",
    description: "",
    keywords: [],
    ogImage: "",
  },
};

export const adminResources: AdminResourceConfig[] = [
  {
    slug: "projects",
    title: "Projects",
    singular: "Project",
    description: "Manage featured projects, portfolio order, links, stacks, and SEO metadata.",
    table: "projects",
    icon: "PanelsTopLeft",
    orderBy: "display_order",
    orderAscending: true,
    archiveField: "project_status",
    archiveValue: "archived",
    titleField: "project_name",
    listFields: ["project_name", "project_category", "project_status", "featured", "display_order"],
    fields: [
      { name: "project_name", label: "Project Name", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true, placeholder: "majhi-dairy" },
      { name: "short_description", label: "Short Description", type: "textarea", rows: 3, wide: true },
      { name: "long_description", label: "Long Description", type: "textarea", rows: 7, wide: true },
      { name: "cover_image_url", label: "Cover Image URL", type: "url", wide: true },
      { name: "project_logo_url", label: "Project Logo URL", type: "url" },
      { name: "live_url", label: "Live URL", type: "url" },
      { name: "github_url", label: "GitHub URL", type: "url" },
      { name: "technology_stack", label: "Technology Stack", type: "tags", help: "Comma separated list." },
      { name: "project_category", label: "Category", type: "text" },
      { name: "project_status", label: "Status", type: "select", options: ["draft", "published", "archived"], defaultValue: "draft" },
      { name: "featured", label: "Featured Project", type: "boolean" },
      { name: "display_order", label: "Display Order", type: "number", defaultValue: 0 },
      seoField,
    ],
  },
  {
    slug: "case-studies",
    title: "Case Studies",
    singular: "Case Study",
    description: "Manage long-form product storytelling, challenge, solution, architecture, and outcomes.",
    table: "case_studies",
    icon: "BookOpenText",
    orderBy: "updated_at",
    titleField: "overview",
    listFields: ["overview", "architecture", "updated_at"],
    fields: [
      { name: "project_id", label: "Project ID", type: "text", required: true, help: "Use the UUID from the Projects table." },
      { name: "overview", label: "Overview", type: "textarea", rows: 5, wide: true },
      { name: "challenge", label: "Challenge", type: "textarea", rows: 6, wide: true },
      { name: "solution", label: "Solution", type: "textarea", rows: 6, wide: true },
      { name: "architecture", label: "Architecture", type: "textarea", rows: 5, wide: true },
      { name: "features", label: "Features", type: "json", rows: 8, wide: true, defaultValue: [] },
      { name: "results", label: "Results", type: "json", rows: 8, wide: true, defaultValue: [] },
      { name: "screenshots", label: "Screenshots", type: "json", rows: 8, wide: true, defaultValue: [] },
      { name: "videos", label: "Videos", type: "json", rows: 6, wide: true, defaultValue: [] },
      { name: "testimonials", label: "Testimonials", type: "json", rows: 6, wide: true, defaultValue: [] },
      { name: "timeline", label: "Timeline", type: "json", rows: 7, wide: true, defaultValue: [] },
      { name: "technology_stack", label: "Technology Stack", type: "tags" },
    ],
  },
  {
    slug: "gallery",
    title: "Project Gallery",
    singular: "Gallery Item",
    description: "Manage desktop, tablet, mobile, dashboard, and mockup screenshots.",
    table: "project_gallery",
    icon: "Images",
    orderBy: "display_order",
    orderAscending: true,
    titleField: "title",
    listFields: ["title", "device_type", "media_type", "display_order"],
    fields: [
      { name: "project_id", label: "Project ID", type: "text", required: true },
      { name: "title", label: "Title", type: "text" },
      { name: "image_url", label: "Image or Video URL", type: "url", required: true, wide: true },
      { name: "alt_text", label: "Alt Text", type: "text", wide: true },
      { name: "media_type", label: "Media Type", type: "select", options: ["image", "video"], defaultValue: "image" },
      { name: "device_type", label: "Device Type", type: "select", options: ["desktop", "tablet", "mobile", "dashboard", "mockup"], defaultValue: "desktop" },
      { name: "display_order", label: "Display Order", type: "number", defaultValue: 0 },
      { name: "metadata", label: "Metadata", type: "json", rows: 5, wide: true, defaultValue: {} },
    ],
  },
  {
    slug: "services",
    title: "Services",
    singular: "Service",
    description: "Manage services, icons, feature lists, ordering, and visibility.",
    table: "services",
    icon: "BriefcaseBusiness",
    orderBy: "display_order",
    orderAscending: true,
    titleField: "title",
    listFields: ["title", "icon", "is_visible", "display_order"],
    fields: [
      { name: "title", label: "Service Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", rows: 4, wide: true },
      { name: "icon", label: "Icon", type: "text", placeholder: "Code2" },
      { name: "features", label: "Features", type: "tags" },
      { name: "display_order", label: "Display Order", type: "number", defaultValue: 0 },
      { name: "is_visible", label: "Visible", type: "boolean", defaultValue: true },
    ],
  },
  {
    slug: "skills",
    title: "Skills",
    singular: "Skill",
    description: "Manage frontend, backend, database, AI, DevOps, and tool skills.",
    table: "skills",
    icon: "Cpu",
    orderBy: "display_order",
    orderAscending: true,
    titleField: "name",
    listFields: ["name", "category", "level", "is_visible"],
    fields: [
      { name: "name", label: "Skill Name", type: "text", required: true },
      { name: "category", label: "Category", type: "select", options: ["Frontend", "Backend", "Database", "AI", "DevOps", "Tools"], defaultValue: "Tools" },
      { name: "level", label: "Level", type: "number", defaultValue: 80 },
      { name: "icon", label: "Icon", type: "text" },
      { name: "display_order", label: "Display Order", type: "number", defaultValue: 0 },
      { name: "is_visible", label: "Visible", type: "boolean", defaultValue: true },
      { name: "metadata", label: "Metadata", type: "json", rows: 5, wide: true, defaultValue: {} },
    ],
  },
  {
    slug: "blog",
    title: "Blog Posts",
    singular: "Post",
    description: "Manage articles, drafts, scheduled posts, tags, categories, and SEO.",
    table: "blog_posts",
    icon: "Newspaper",
    orderBy: "updated_at",
    archiveField: "status",
    archiveValue: "archived",
    titleField: "title",
    listFields: ["title", "status", "featured", "published_at"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "excerpt", label: "Excerpt", type: "textarea", rows: 3, wide: true },
      { name: "content", label: "MDX Content", type: "textarea", rows: 16, wide: true },
      { name: "tags", label: "Tags", type: "tags" },
      { name: "featured_image_url", label: "Featured Image URL", type: "url", wide: true },
      { name: "status", label: "Status", type: "select", options: ["draft", "scheduled", "published", "archived"], defaultValue: "draft" },
      { name: "featured", label: "Featured", type: "boolean" },
      { name: "published_at", label: "Published At", type: "datetime" },
      { name: "scheduled_at", label: "Scheduled At", type: "datetime" },
      seoField,
    ],
  },
  {
    slug: "categories",
    title: "Blog Categories",
    singular: "Category",
    description: "Manage article categories.",
    table: "blog_categories",
    icon: "FolderTree",
    orderBy: "name",
    orderAscending: true,
    titleField: "name",
    listFields: ["name", "slug", "description"],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", rows: 3, wide: true },
    ],
  },
  {
    slug: "tags",
    title: "Blog Tags",
    singular: "Tag",
    description: "Manage blog tags.",
    table: "blog_tags",
    icon: "Tags",
    orderBy: "name",
    orderAscending: true,
    titleField: "name",
    listFields: ["name", "slug"],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
    ],
  },
  {
    slug: "messages",
    title: "Contact Messages",
    singular: "Message",
    description: "Review and manage contact form submissions.",
    table: "contact_messages",
    icon: "Inbox",
    orderBy: "created_at",
    titleField: "full_name",
    listFields: ["full_name", "email", "project_type", "status", "created_at"],
    fields: [
      { name: "full_name", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "company_name", label: "Company", type: "text" },
      { name: "project_type", label: "Project Type", type: "text" },
      { name: "budget_range", label: "Budget Range", type: "text" },
      { name: "message", label: "Message", type: "textarea", rows: 8, wide: true, required: true },
      { name: "status", label: "Status", type: "select", options: ["new", "read", "replied", "archived"], defaultValue: "new" },
      { name: "metadata", label: "Metadata", type: "json", rows: 5, wide: true, defaultValue: {} },
    ],
  },
  {
    slug: "leads",
    title: "Leads",
    singular: "Lead",
    description: "Manage client pipeline status, notes, and follow-up dates.",
    table: "leads",
    icon: "Handshake",
    orderBy: "updated_at",
    titleField: "full_name",
    listFields: ["full_name", "email", "status", "follow_up_date", "budget_range"],
    fields: [
      { name: "full_name", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "company_name", label: "Company", type: "text" },
      { name: "project_type", label: "Project Type", type: "text" },
      { name: "budget_range", label: "Budget Range", type: "text" },
      { name: "message", label: "Message", type: "textarea", rows: 6, wide: true },
      { name: "status", label: "Lead Status", type: "select", options: ["new", "contacted", "interested", "proposal_sent", "closed_won", "closed_lost"], defaultValue: "new" },
      { name: "notes", label: "Notes", type: "textarea", rows: 6, wide: true },
      { name: "follow_up_date", label: "Follow-up Date", type: "date" },
      { name: "value_estimate", label: "Value Estimate", type: "number" },
    ],
  },
  {
    slug: "testimonials",
    title: "Testimonials",
    singular: "Testimonial",
    description: "Manage client social proof, ratings, and featured reviews.",
    table: "testimonials",
    icon: "MessageSquareQuote",
    orderBy: "display_order",
    orderAscending: true,
    titleField: "client_name",
    listFields: ["client_name", "company", "rating", "featured", "is_visible"],
    fields: [
      { name: "client_name", label: "Client Name", type: "text", required: true },
      { name: "company", label: "Company", type: "text" },
      { name: "position", label: "Position", type: "text" },
      { name: "photo_url", label: "Photo URL", type: "url" },
      { name: "rating", label: "Rating", type: "number", defaultValue: 5 },
      { name: "review", label: "Review", type: "textarea", rows: 6, wide: true, required: true },
      { name: "featured", label: "Featured", type: "boolean" },
      { name: "display_order", label: "Display Order", type: "number", defaultValue: 0 },
      { name: "is_visible", label: "Visible", type: "boolean", defaultValue: true },
    ],
  },
  {
    slug: "social-links",
    title: "Social Links",
    singular: "Social Link",
    description: "Manage external presence, email, WhatsApp, and portfolio links.",
    table: "social_links",
    icon: "Share2",
    orderBy: "display_order",
    orderAscending: true,
    titleField: "label",
    listFields: ["platform", "label", "url", "is_visible"],
    fields: [
      { name: "platform", label: "Platform", type: "select", options: ["GitHub", "LinkedIn", "Twitter/X", "Instagram", "Email", "WhatsApp", "YouTube", "Portfolio"], required: true },
      { name: "label", label: "Label", type: "text", required: true },
      { name: "url", label: "URL", type: "url", required: true, wide: true },
      { name: "icon", label: "Icon", type: "text" },
      { name: "display_order", label: "Display Order", type: "number", defaultValue: 0 },
      { name: "is_visible", label: "Visible", type: "boolean", defaultValue: true },
    ],
  },
  {
    slug: "seo",
    title: "SEO Settings",
    singular: "SEO Entry",
    description: "Manage page metadata, OG images, canonical URLs, and structured data.",
    table: "seo_settings",
    icon: "SearchCheck",
    orderBy: "page_path",
    orderAscending: true,
    titleField: "page_path",
    listFields: ["page_path", "meta_title", "canonical_url"],
    fields: [
      { name: "page_path", label: "Page Path", type: "text", required: true, placeholder: "/" },
      { name: "meta_title", label: "Meta Title", type: "text", wide: true },
      { name: "meta_description", label: "Meta Description", type: "textarea", rows: 4, wide: true },
      { name: "keywords", label: "Keywords", type: "tags" },
      { name: "open_graph_image_url", label: "Open Graph Image URL", type: "url", wide: true },
      { name: "twitter_card", label: "Twitter Card", type: "select", options: ["summary", "summary_large_image"], defaultValue: "summary_large_image" },
      { name: "canonical_url", label: "Canonical URL", type: "url", wide: true },
      { name: "structured_data", label: "Structured Data", type: "json", rows: 9, wide: true, defaultValue: {} },
    ],
  },
  {
    slug: "media",
    title: "Media Library",
    singular: "Media File",
    description: "Upload, preview, search, and organize images or videos stored in Supabase Storage.",
    table: "media_files",
    icon: "Image",
    orderBy: "created_at",
    titleField: "file_name",
    listFields: ["file_name", "folder", "file_type", "file_size"],
    fields: [
      { name: "file_name", label: "File Name", type: "text", required: true },
      { name: "public_url", label: "Public URL", type: "url", wide: true },
      { name: "path", label: "Storage Path", type: "text", required: true, wide: true },
      { name: "folder", label: "Folder", type: "text" },
      { name: "alt_text", label: "Alt Text", type: "text", wide: true },
      { name: "metadata", label: "Metadata", type: "json", rows: 5, wide: true, defaultValue: {} },
    ],
  },
  {
    slug: "analytics",
    title: "Analytics Events",
    singular: "Analytics Event",
    description: "Inspect tracked page views, project views, CTA clicks, downloads, and WhatsApp clicks.",
    table: "analytics_events",
    icon: "ChartNoAxesCombined",
    orderBy: "created_at",
    readOnly: true,
    titleField: "event_name",
    listFields: ["event_name", "page_path", "source", "device_type", "created_at"],
    fields: [
      { name: "event_name", label: "Event", type: "text" },
      { name: "page_path", label: "Page", type: "text" },
      { name: "source", label: "Source", type: "text" },
      { name: "device_type", label: "Device", type: "text" },
      { name: "metadata", label: "Metadata", type: "json", rows: 8, wide: true, defaultValue: {} },
    ],
  },
  {
    slug: "settings",
    title: "Site Settings",
    singular: "Setting",
    description: "Manage global portfolio settings, contact info, branding, theme, and animation preferences.",
    table: "site_settings",
    icon: "Settings2",
    orderBy: "key",
    orderAscending: true,
    titleField: "key",
    listFields: ["key", "scope", "updated_at"],
    fields: [
      { name: "key", label: "Key", type: "text", required: true },
      { name: "scope", label: "Scope", type: "text", defaultValue: "global" },
      { name: "value", label: "Value", type: "json", rows: 14, wide: true, defaultValue: {} },
    ],
  },
];

export const navResourceSlugs = [
  "projects",
  "case-studies",
  "gallery",
  "services",
  "skills",
  "blog",
  "messages",
  "leads",
  "testimonials",
  "media",
  "seo",
  "settings",
  "analytics",
];

export function getResourceConfig(slug: string) {
  return adminResources.find((resource) => resource.slug === slug) ?? null;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

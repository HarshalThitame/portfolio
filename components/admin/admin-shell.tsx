import Link from "next/link";
import {
  BarChart3,
  BookOpenText,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Cpu,
  FolderTree,
  Handshake,
  Home,
  Image,
  Images,
  Inbox,
  LayoutDashboard,
  MessageSquareQuote,
  Newspaper,
  PanelsTopLeft,
  SearchCheck,
  Settings2,
  Share2,
  Sparkles,
  Tags,
  UserRound,
} from "lucide-react";
import { AdminCommandMenu } from "@/components/admin/admin-command-menu";
import { signOutAction } from "@/app/(admin)/admin/actions";
import { adminResources, navResourceSlugs, type AdminResourceConfig } from "@/lib/admin/resources";
import { cn } from "@/lib/utils";

const icons = {
  BarChart3,
  BookOpenText,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Cpu,
  FolderTree,
  Handshake,
  Home,
  Image,
  Images,
  Inbox,
  LayoutDashboard,
  MessageSquareQuote,
  Newspaper,
  PanelsTopLeft,
  SearchCheck,
  Settings2,
  Share2,
  Sparkles,
  Tags,
  UserRound,
};

type IconName = keyof typeof icons;

const primaryItems = [
  { href: "/admin", label: "Dashboard", icon: "LayoutDashboard" as IconName },
  { href: "/admin/hero", label: "Hero", icon: "Sparkles" as IconName },
  { href: "/admin/about", label: "About", icon: "UserRound" as IconName },
];

export function AdminShell({
  children,
  email,
  role,
}: {
  children: React.ReactNode;
  email: string;
  role: string;
}) {
  const resourceItems = navResourceSlugs
    .map((slug) => adminResources.find((resource) => resource.slug === slug))
    .filter((resource): resource is AdminResourceConfig => Boolean(resource));

  const commandItems = [
    ...primaryItems,
    ...resourceItems.map((item) => ({
      href: `/admin/${item.slug}`,
      label: item.title,
      icon: item.icon as IconName,
    })),
  ];

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-brand" aria-label="Admin dashboard">
          <span>H</span>
          <div>
            <strong>Harshal CMS</strong>
            <small>Enterprise Admin</small>
          </div>
        </Link>

        <nav className="admin-nav" aria-label="Admin navigation">
          {primaryItems.map((item) => {
            const Icon = icons[item.icon];
            return (
              <Link key={item.href} href={item.href}>
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}

          <div className="admin-nav-divider" />

          {resourceItems.map((resource) => {
            const Icon = icons[resource.icon as IconName] ?? LayoutDashboard;
            return (
              <Link key={resource.slug} href={`/admin/${resource.slug}`}>
                <Icon className="size-4" />
                {resource.title}
              </Link>
            );
          })}
        </nav>

        <div className="admin-user-panel">
          <span>{email.slice(0, 1).toUpperCase()}</span>
          <div>
            <strong>{email}</strong>
            <small>{role}</small>
          </div>
          <form action={signOutAction}>
            <button type="submit">Sign out</button>
          </form>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <span className="admin-kicker">Portfolio Control Center</span>
            <p>Manage content, leads, media, SEO, analytics, and business operations.</p>
          </div>
          <div className="admin-topbar-actions">
            <AdminCommandMenu items={commandItems} />
            <Link href="/" className={cn("admin-view-site")}>
              View Site
              <Home className="size-4" />
            </Link>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}

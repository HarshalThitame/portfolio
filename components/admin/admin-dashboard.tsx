import Link from "next/link";
import { ArrowUpRight, BarChart3, Download, Inbox, MessageCircle, MousePointerClick, PanelsTopLeft, UsersRound } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DashboardStats } from "@/lib/admin/data";

const metricCards = [
  { key: "totalProjects", label: "Total Projects", icon: PanelsTopLeft },
  { key: "totalMessages", label: "Total Messages", icon: Inbox },
  { key: "totalBlogPosts", label: "Total Blog Posts", icon: BarChart3 },
  { key: "portfolioViews", label: "Portfolio Views", icon: MousePointerClick },
  { key: "resumeDownloads", label: "Resume Downloads", icon: Download },
  { key: "whatsAppClicks", label: "WhatsApp Clicks", icon: MessageCircle },
  { key: "contactSubmissions", label: "Contact Submissions", icon: Inbox },
  { key: "totalLeads", label: "Pipeline Leads", icon: UsersRound },
] as const;

export function AdminDashboard({ stats }: { stats: DashboardStats }) {
  return (
    <div className="admin-page">
      <section className="admin-hero-card">
        <div>
          <Badge>Production CMS</Badge>
          <h1>Operate the portfolio like a premium SaaS product.</h1>
          <p>
            Manage content, projects, case studies, media, SEO, leads, and analytics with a secure
            Supabase-backed admin system.
          </p>
        </div>
        <Link href="/admin/projects/new">
          Create Project
          <ArrowUpRight className="size-4" />
        </Link>
      </section>

      <section className="admin-metrics-grid">
        {metricCards.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.key} className="admin-metric-card">
              <CardHeader>
                <span>
                  <Icon className="size-4" />
                </span>
                <p>{metric.label}</p>
              </CardHeader>
              <CardContent>
                <strong>{stats[metric.key].toLocaleString()}</strong>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="admin-two-column">
        <Card>
          <CardHeader className="admin-card-title">
            <h2>Recent Activity</h2>
            <p>Changes made through the admin panel.</p>
          </CardHeader>
          <CardContent className="admin-activity-list">
            {stats.recentActivity.length > 0 ? (
              stats.recentActivity.map((activity) => (
                <div key={String(activity.id)}>
                  <span>{String(activity.action ?? "activity")}</span>
                  <p>{String(activity.description ?? "No description")}</p>
                  <small>{activity.created_at ? new Date(activity.created_at).toLocaleString() : ""}</small>
                </div>
              ))
            ) : (
              <p className="admin-empty-text">No activity yet.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="admin-card-title">
            <h2>Fast Actions</h2>
            <p>Common content and conversion tasks.</p>
          </CardHeader>
          <CardContent className="admin-action-list">
            <Link href="/admin/hero">Update hero message</Link>
            <Link href="/admin/projects">Manage featured work</Link>
            <Link href="/admin/messages">Review inquiries</Link>
            <Link href="/admin/media">Upload media</Link>
            <Link href="/admin/seo">Tune SEO metadata</Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

import "server-only";

import { getResourceConfig } from "@/lib/admin/resources";
import { requireAdmin } from "@/lib/supabase/admin-auth";

export type AdminRow = Record<string, unknown> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type DashboardStats = {
  totalProjects: number;
  totalMessages: number;
  totalBlogPosts: number;
  portfolioViews: number;
  resumeDownloads: number;
  whatsAppClicks: number;
  contactSubmissions: number;
  totalLeads: number;
  recentActivity: AdminRow[];
};

async function countRows(table: string, filter?: { column: string; value: string | boolean }) {
  const { supabase } = await requireAdmin();
  let query = supabase.from(table).select("id", { count: "exact", head: true });

  if (filter) {
    query = query.eq(filter.column, filter.value);
  }

  const { count, error } = await query;

  if (error) {
    console.error(`Failed to count ${table}`, error);
    return 0;
  }

  return count ?? 0;
}

async function countEvents(eventName: string) {
  const { supabase } = await requireAdmin();
  const { count, error } = await supabase
    .from("analytics_events")
    .select("id", { count: "exact", head: true })
    .eq("event_name", eventName);

  if (error) {
    console.error(`Failed to count ${eventName}`, error);
    return 0;
  }

  return count ?? 0;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const { supabase } = await requireAdmin();

  const [
    totalProjects,
    totalMessages,
    totalBlogPosts,
    portfolioViews,
    resumeDownloads,
    whatsAppClicks,
    contactSubmissions,
    totalLeads,
  ] = await Promise.all([
    countRows("projects"),
    countRows("contact_messages"),
    countRows("blog_posts"),
    countEvents("portfolio_visit"),
    countEvents("resume_download"),
    countEvents("whatsapp_click"),
    countEvents("contact_submit"),
    countRows("leads"),
  ]);

  const { data: recentActivity, error } = await supabase
    .from("activity_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(8);

  if (error) {
    console.error("Failed to load recent activity", error);
  }

  return {
    totalProjects,
    totalMessages,
    totalBlogPosts,
    portfolioViews,
    resumeDownloads,
    whatsAppClicks,
    contactSubmissions,
    totalLeads,
    recentActivity: (recentActivity ?? []) as AdminRow[],
  };
}

export async function getResourceRows(resourceSlug: string) {
  const resource = getResourceConfig(resourceSlug);
  if (!resource) return { resource: null, rows: [] as AdminRow[], error: null as string | null };

  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from(resource.table)
    .select("*")
    .order(resource.orderBy ?? "created_at", { ascending: resource.orderAscending ?? false })
    .limit(200);

  return {
    resource,
    rows: (data ?? []) as AdminRow[],
    error: error?.message ?? null,
  };
}

export async function getResourceRow(resourceSlug: string, id: string) {
  const resource = getResourceConfig(resourceSlug);
  if (!resource) return { resource: null, row: null, error: null as string | null };

  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from(resource.table)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  return {
    resource,
    row: (data as AdminRow | null) ?? null,
    error: error?.message ?? null,
  };
}

export async function getSiteSetting(key: string) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .maybeSingle<{ value: Record<string, unknown> }>();

  if (error) {
    console.error(`Failed to load ${key} settings`, error);
  }

  return data?.value ?? {};
}

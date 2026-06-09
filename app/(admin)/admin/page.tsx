import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { getDashboardStats } from "@/lib/admin/data";
import { getSupabasePublicConfig } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  if (!getSupabasePublicConfig().isConfigured) return null;

  const stats = await getDashboardStats();
  return <AdminDashboard stats={stats} />;
}

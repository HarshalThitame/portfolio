import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { SupabaseSetupNotice } from "@/components/admin/supabase-setup-notice";
import { getSupabasePublicConfig } from "@/lib/supabase/config";
import { requireAdmin } from "@/lib/supabase/admin-auth";

export const metadata: Metadata = {
  title: "Admin | Harshal CMS",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const config = getSupabasePublicConfig();

  if (!config.isConfigured) {
    return <SupabaseSetupNotice />;
  }

  const { user, admin } = await requireAdmin();

  return (
    <AdminShell email={user.email ?? admin.email} role={admin.role}>
      {children}
    </AdminShell>
  );
}

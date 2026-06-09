import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { SupabaseSetupNotice } from "@/components/admin/supabase-setup-notice";
import { getSupabasePublicConfig } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Admin Login | Harshal CMS",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  const config = getSupabasePublicConfig();

  if (!config.isConfigured) {
    return <SupabaseSetupNotice />;
  }

  return (
    <main className="admin-auth-page">
      <AdminLoginForm configured={config.isConfigured} />
    </main>
  );
}

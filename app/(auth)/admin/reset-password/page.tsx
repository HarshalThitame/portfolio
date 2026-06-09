import type { Metadata } from "next";
import { AdminResetPasswordForm } from "@/components/admin/admin-reset-password-form";
import { SupabaseSetupNotice } from "@/components/admin/supabase-setup-notice";
import { getSupabasePublicConfig } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Reset Admin Password | Harshal CMS",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminResetPasswordPage() {
  const config = getSupabasePublicConfig();

  if (!config.isConfigured) {
    return <SupabaseSetupNotice />;
  }

  return (
    <main className="admin-auth-page">
      <AdminResetPasswordForm configured={config.isConfigured} />
    </main>
  );
}

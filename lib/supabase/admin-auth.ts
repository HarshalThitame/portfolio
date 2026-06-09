import "server-only";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AdminUserRecord = {
  id: string;
  user_id: string;
  email: string;
  role: string;
  status: "invited" | "active" | "disabled";
  permissions: Record<string, unknown>;
};

export async function getCurrentAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { supabase, user: null, admin: null };
  }

  const { data: admin } = await supabase
    .from("admin_users")
    .select("id,user_id,email,role,status,permissions")
    .eq("user_id", user.id)
    .eq("status", "active")
    .maybeSingle<AdminUserRecord>();

  return { supabase, user, admin: admin ?? null };
}

export async function requireAdmin() {
  const auth = await getCurrentAdmin();

  if (!auth.user) {
    redirect("/admin/login");
  }

  if (!auth.admin) {
    redirect("/admin/login?error=not-approved");
  }

  return {
    supabase: auth.supabase,
    user: auth.user,
    admin: auth.admin,
  };
}

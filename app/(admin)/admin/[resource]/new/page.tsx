import { notFound } from "next/navigation";
import { AdminResourceForm } from "@/components/admin/admin-resource-form";
import { getResourceConfig } from "@/lib/admin/resources";
import { getSupabasePublicConfig } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

type NewResourcePageProps = {
  params: Promise<{ resource: string }>;
};

export default async function NewResourcePage({ params }: NewResourcePageProps) {
  if (!getSupabasePublicConfig().isConfigured) return null;

  const { resource: resourceSlug } = await params;
  const resource = getResourceConfig(resourceSlug);

  if (!resource || resource.readOnly) notFound();

  return <AdminResourceForm resource={resource} />;
}

import { notFound } from "next/navigation";
import { AdminResourceForm } from "@/components/admin/admin-resource-form";
import { getResourceRow } from "@/lib/admin/data";
import { getSupabasePublicConfig } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

type EditResourcePageProps = {
  params: Promise<{ resource: string; id: string }>;
};

export default async function EditResourcePage({ params }: EditResourcePageProps) {
  if (!getSupabasePublicConfig().isConfigured) return null;

  const { resource: resourceSlug, id } = await params;
  const { resource, row } = await getResourceRow(resourceSlug, id);

  if (!resource || !row || resource.readOnly) notFound();

  return <AdminResourceForm resource={resource} row={row} />;
}

import { notFound } from "next/navigation";
import { AdminMediaUpload } from "@/components/admin/admin-media-upload";
import { AdminResourceTable } from "@/components/admin/admin-resource-table";
import { getResourceRows } from "@/lib/admin/data";
import { getSupabasePublicConfig } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

type ResourcePageProps = {
  params: Promise<{ resource: string }>;
};

export default async function AdminResourcePage({ params }: ResourcePageProps) {
  if (!getSupabasePublicConfig().isConfigured) return null;

  const { resource: resourceSlug } = await params;
  const { resource, rows, error } = await getResourceRows(resourceSlug);

  if (!resource) notFound();

  return (
    <>
      {resource.slug === "media" ? <AdminMediaUpload /> : null}
      <AdminResourceTable resource={resource} rows={rows} error={error} />
    </>
  );
}

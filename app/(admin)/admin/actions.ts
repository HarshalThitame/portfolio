"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getResourceConfig, slugify, type AdminField } from "@/lib/admin/resources";
import { requireAdmin } from "@/lib/supabase/admin-auth";

type ParsedRecord = Record<string, string | number | boolean | string[] | Record<string, unknown> | Array<unknown> | null>;

function getString(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function parseJsonValue(value: string) {
  if (!value.trim()) return {};

  try {
    return JSON.parse(value) as Record<string, unknown> | Array<unknown>;
  } catch {
    return {};
  }
}

function parseField(field: AdminField, formData: FormData) {
  const value = getString(formData, field.name);

  switch (field.type) {
    case "boolean":
      return formData.get(field.name) === "on";
    case "number":
      return value ? Number(value) : null;
    case "tags":
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    case "json":
      return parseJsonValue(value);
    case "datetime":
      return value ? new Date(value).toISOString() : null;
    case "date":
      return value || null;
    default:
      return value || null;
  }
}

function parseResourceForm(resourceSlug: string, formData: FormData) {
  const resource = getResourceConfig(resourceSlug);
  if (!resource) throw new Error("Unknown admin resource.");

  const record: ParsedRecord = {};

  for (const field of resource.fields) {
    record[field.name] = parseField(field, formData);
  }

  if ("slug" in record && !record.slug) {
    const title = record[resource.titleField];
    if (typeof title === "string") {
      record.slug = slugify(title);
    }
  }

  return { resource, record };
}

async function logActivity(action: string, table: string, entityId: string | null, description: string) {
  const { supabase, user } = await requireAdmin();

  await supabase.from("activity_logs").insert({
    actor_id: user.id,
    action,
    entity_table: table,
    entity_id: entityId,
    description,
  });
}

export async function createResourceAction(resourceSlug: string, formData: FormData) {
  const { resource, record } = parseResourceForm(resourceSlug, formData);
  const { supabase, user } = await requireAdmin();

  if ("created_by" in record === false && ["projects", "blog_posts"].includes(resource.table)) {
    record.created_by = user.id;
  }

  const { data, error } = await supabase
    .from(resource.table)
    .insert(record)
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  await logActivity("created", resource.table, String(data.id), `Created ${resource.singular}`);
  revalidatePath(`/admin/${resource.slug}`);
  redirect(`/admin/${resource.slug}`);
}

export async function updateResourceAction(resourceSlug: string, id: string, formData: FormData) {
  const { resource, record } = parseResourceForm(resourceSlug, formData);
  const { supabase, user } = await requireAdmin();

  const { data: previous } = await supabase
    .from(resource.table)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (previous) {
    const { count } = await supabase
      .from("content_versions")
      .select("id", { count: "exact", head: true })
      .eq("entity_table", resource.table)
      .eq("entity_id", id);

    await supabase.from("content_versions").insert({
      entity_table: resource.table,
      entity_id: id,
      version_number: (count ?? 0) + 1,
      snapshot: previous,
      created_by: user.id,
    });
  }

  const { error } = await supabase.from(resource.table).update(record).eq("id", id);

  if (error) throw new Error(error.message);

  await logActivity("updated", resource.table, id, `Updated ${resource.singular}`);
  revalidatePath(`/admin/${resource.slug}`);
  redirect(`/admin/${resource.slug}`);
}

export async function deleteResourceAction(resourceSlug: string, id: string) {
  const resource = getResourceConfig(resourceSlug);
  if (!resource) throw new Error("Unknown admin resource.");

  const { supabase } = await requireAdmin();
  const { error } = await supabase.from(resource.table).delete().eq("id", id);

  if (error) throw new Error(error.message);

  await logActivity("deleted", resource.table, id, `Deleted ${resource.singular}`);
  revalidatePath(`/admin/${resource.slug}`);
}

export async function duplicateResourceAction(resourceSlug: string, id: string) {
  const resource = getResourceConfig(resourceSlug);
  if (!resource) throw new Error("Unknown admin resource.");

  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.from(resource.table).select("*").eq("id", id).single<Record<string, unknown>>();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Record not found.");

  const copy = { ...data };
  delete copy.id;
  delete copy.created_at;
  delete copy.updated_at;

  const titleValue = copy[resource.titleField];
  if (typeof titleValue === "string") {
    copy[resource.titleField] = `${titleValue} Copy`;
  }

  if (typeof copy.slug === "string") {
    copy.slug = `${copy.slug}-copy-${Date.now()}`;
  }

  const { data: inserted, error: insertError } = await supabase
    .from(resource.table)
    .insert(copy)
    .select("id")
    .single();

  if (insertError) throw new Error(insertError.message);

  await logActivity("duplicated", resource.table, String(inserted.id), `Duplicated ${resource.singular}`);
  revalidatePath(`/admin/${resource.slug}`);
}

export async function archiveResourceAction(resourceSlug: string, id: string) {
  const resource = getResourceConfig(resourceSlug);
  if (!resource?.archiveField || !resource.archiveValue) return;

  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from(resource.table)
    .update({ [resource.archiveField]: resource.archiveValue })
    .eq("id", id);

  if (error) throw new Error(error.message);

  await logActivity("archived", resource.table, id, `Archived ${resource.singular}`);
  revalidatePath(`/admin/${resource.slug}`);
}

export async function updateSiteSettingAction(settingKey: string, path: string, formData: FormData) {
  const { supabase } = await requireAdmin();
  const value: Record<string, string | boolean | string[]> = {};

  for (const [key, entryValue] of formData.entries()) {
    if (key.startsWith("_")) continue;

    if (key.endsWith("[]")) {
      value[key.slice(0, -2)] = String(entryValue)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      continue;
    }

    if (entryValue === "on") {
      value[key] = true;
      continue;
    }

    value[key] = String(entryValue);
  }

  for (const key of formData.getAll("_boolean")) {
    const name = String(key);
    if (!(name in value)) value[name] = false;
  }

  const { error } = await supabase
    .from("site_settings")
    .upsert({ key: settingKey, scope: "content", value }, { onConflict: "key" });

  if (error) throw new Error(error.message);

  await logActivity("updated", "site_settings", null, `Updated ${settingKey} settings`);
  revalidatePath(path);
  redirect(path);
}

export async function uploadMediaAction(formData: FormData) {
  const { supabase, user } = await requireAdmin();
  const file = formData.get("file");
  const folder = getString(formData, "folder") || "uploads";
  const altText = getString(formData, "alt_text");

  if (!(file instanceof File) || file.size === 0) {
    throw new Error("Choose a file to upload.");
  }

  const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const path = `${folder}/${Date.now()}-${cleanName}`;
  const { error: uploadError } = await supabase.storage
    .from("portfolio-media")
    .upload(path, file, {
      cacheControl: "31536000",
      upsert: false,
    });

  if (uploadError) throw new Error(uploadError.message);

  const { data: publicUrlData } = supabase.storage.from("portfolio-media").getPublicUrl(path);
  const { error: insertError } = await supabase.from("media_files").insert({
    bucket: "portfolio-media",
    path,
    public_url: publicUrlData.publicUrl,
    file_name: file.name,
    file_type: file.type,
    file_size: file.size,
    folder,
    alt_text: altText,
    uploaded_by: user.id,
  });

  if (insertError) throw new Error(insertError.message);

  await logActivity("uploaded", "media_files", null, `Uploaded ${file.name}`);
  revalidatePath("/admin/media");
  redirect("/admin/media");
}

export async function signOutAction() {
  const { supabase } = await requireAdmin();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

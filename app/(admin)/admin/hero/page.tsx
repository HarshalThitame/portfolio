import { AdminSectionSettingsForm, type SectionSettingField } from "@/components/admin/admin-section-settings-form";
import { getSiteSetting } from "@/lib/admin/data";
import { getSupabasePublicConfig } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

const fields: SectionSettingField[] = [
  { name: "badge", label: "Badge", type: "text" },
  { name: "headline", label: "Headline", type: "textarea", rows: 4 },
  { name: "subheadline", label: "Subheadline", type: "textarea", rows: 4 },
  { name: "description", label: "Description", type: "textarea", rows: 4 },
  { name: "primaryCtaText", label: "Primary CTA Text", type: "text" },
  { name: "primaryCtaUrl", label: "Primary CTA URL", type: "text" },
  { name: "secondaryCtaText", label: "Secondary CTA Text", type: "text" },
  { name: "secondaryCtaUrl", label: "Secondary CTA URL", type: "text" },
  { name: "profileImage", label: "Profile Image URL", type: "url" },
  { name: "backgroundMedia", label: "Background Media URL", type: "url" },
  { name: "socialLinks", label: "Social Links", type: "tags", help: "Comma separated URLs or labels." },
  { name: "resumeLink", label: "Resume Link", type: "text" },
  { name: "visible", label: "Visible", type: "boolean" },
];

export default async function AdminHeroPage() {
  if (!getSupabasePublicConfig().isConfigured) return null;

  const values = await getSiteSetting("hero");

  return (
    <AdminSectionSettingsForm
      title="Hero Management"
      description="Edit the first-screen portfolio message, CTAs, media, links, and visibility."
      settingKey="hero"
      path="/admin/hero"
      fields={fields}
      values={values}
    />
  );
}

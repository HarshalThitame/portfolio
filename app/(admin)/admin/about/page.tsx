import { AdminSectionSettingsForm, type SectionSettingField } from "@/components/admin/admin-section-settings-form";
import { getSiteSetting } from "@/lib/admin/data";
import { getSupabasePublicConfig } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

const fields: SectionSettingField[] = [
  { name: "name", label: "Name", type: "text" },
  { name: "role", label: "Role", type: "text" },
  { name: "biography", label: "Biography", type: "textarea", rows: 6 },
  { name: "location", label: "Location", type: "text" },
  { name: "experience", label: "Experience", type: "text" },
  { name: "skills", label: "Skills", type: "tags" },
  { name: "technologies", label: "Technologies", type: "tags" },
  { name: "profileImage", label: "Profile Image URL", type: "url" },
  { name: "statistics", label: "Statistics", type: "textarea", rows: 7, help: "Use JSON or simple notes for stats until you split them into individual records." },
  { name: "visible", label: "Visible", type: "boolean" },
];

export default async function AdminAboutPage() {
  if (!getSupabasePublicConfig().isConfigured) return null;

  const values = await getSiteSetting("about");

  return (
    <AdminSectionSettingsForm
      title="About Section CMS"
      description="Manage personal profile content, skills, technologies, location, and stats."
      settingKey="about"
      path="/admin/about"
      fields={fields}
      values={values}
    />
  );
}

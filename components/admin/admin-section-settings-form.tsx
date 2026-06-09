import Link from "next/link";
import { Save } from "lucide-react";
import { updateSiteSettingAction } from "@/app/(admin)/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type SectionSettingField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "url" | "boolean" | "tags";
  rows?: number;
  help?: string;
};

function valueForField(value: unknown) {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "on" : "";
  return String(value ?? "");
}

export function AdminSectionSettingsForm({
  title,
  description,
  settingKey,
  path,
  fields,
  values,
}: {
  title: string;
  description: string;
  settingKey: string;
  path: string;
  fields: SectionSettingField[];
  values: Record<string, unknown>;
}) {
  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <div>
          <span className="admin-kicker">Live Content</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </header>

      <form action={updateSiteSettingAction.bind(null, settingKey, path)} className="admin-form-card">
        <div className="admin-form-grid">
          {fields.map((field) => {
            const id = `setting-${field.name}`;
            const name = field.type === "tags" ? `${field.name}[]` : field.name;

            return (
              <label key={field.name} className="admin-form-field admin-form-field-wide" htmlFor={id}>
                <span>{field.label}</span>
                {field.type === "textarea" ? (
                  <Textarea id={id} name={name} rows={field.rows ?? 5} defaultValue={valueForField(values[field.name])} />
                ) : field.type === "boolean" ? (
                  <>
                    <input type="hidden" name="_boolean" value={field.name} />
                    <input id={id} name={field.name} type="checkbox" defaultChecked={Boolean(values[field.name])} className="admin-checkbox" />
                  </>
                ) : (
                  <Input id={id} name={name} type={field.type === "url" ? "url" : "text"} defaultValue={valueForField(values[field.name])} />
                )}
                {field.help ? <small>{field.help}</small> : null}
              </label>
            );
          })}
        </div>

        <div className="admin-form-actions">
          <Link href="/admin">Cancel</Link>
          <Button type="submit">
            <Save className="size-4" />
            Save Section
          </Button>
        </div>
      </form>
    </div>
  );
}

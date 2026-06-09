import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { createResourceAction, updateResourceAction } from "@/app/(admin)/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { AdminField, AdminResourceConfig } from "@/lib/admin/resources";
import type { AdminRow } from "@/lib/admin/data";

function valueForField(field: AdminField, row?: AdminRow | null) {
  const value = row?.[field.name] ?? field.defaultValue ?? "";

  if (field.type === "tags") {
    return Array.isArray(value) ? value.join(", ") : String(value ?? "");
  }

  if (field.type === "json") {
    return JSON.stringify(value || field.defaultValue || {}, null, 2);
  }

  if (field.type === "datetime" && typeof value === "string" && value) {
    return value.slice(0, 16);
  }

  return String(value ?? "");
}

function FieldControl({ field, row }: { field: AdminField; row?: AdminRow | null }) {
  const value = valueForField(field, row);
  const id = `field-${field.name}`;

  return (
    <label className={field.wide ? "admin-form-field admin-form-field-wide" : "admin-form-field"} htmlFor={id}>
      <span>
        {field.label}
        {field.required ? <i>*</i> : null}
      </span>

      {field.type === "textarea" || field.type === "json" ? (
        <Textarea
          id={id}
          name={field.name}
          rows={field.rows ?? 5}
          defaultValue={value}
          required={field.required}
          placeholder={field.placeholder}
        />
      ) : field.type === "select" ? (
        <select id={id} name={field.name} defaultValue={value} required={field.required}>
          <option value="">Select...</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.type === "boolean" ? (
        <input
          id={id}
          name={field.name}
          type="checkbox"
          defaultChecked={Boolean(row?.[field.name] ?? field.defaultValue)}
          className="admin-checkbox"
        />
      ) : (
        <Input
          id={id}
          name={field.name}
          type={field.type === "datetime" ? "datetime-local" : field.type}
          defaultValue={value}
          required={field.required}
          placeholder={field.placeholder}
        />
      )}

      {field.help ? <small>{field.help}</small> : null}
    </label>
  );
}

export function AdminResourceForm({
  resource,
  row,
}: {
  resource: AdminResourceConfig;
  row?: AdminRow | null;
}) {
  const action = row?.id
    ? updateResourceAction.bind(null, resource.slug, String(row.id))
    : createResourceAction.bind(null, resource.slug);

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <div>
          <Link href={`/admin/${resource.slug}`} className="admin-back-link">
            <ArrowLeft className="size-4" />
            Back to {resource.title}
          </Link>
          <h1>{row?.id ? `Edit ${resource.singular}` : `Create ${resource.singular}`}</h1>
          <p>{resource.description}</p>
        </div>
      </header>

      <form action={action} className="admin-form-card">
        <div className="admin-form-grid">
          {resource.fields.map((field) => (
            <FieldControl key={field.name} field={field} row={row} />
          ))}
        </div>

        <div className="admin-form-actions">
          <Link href={`/admin/${resource.slug}`}>Cancel</Link>
          <Button type="submit">
            <Save className="size-4" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

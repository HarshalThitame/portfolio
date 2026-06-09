import Link from "next/link";
import { Archive, Copy, Edit3, Plus, Trash2 } from "lucide-react";
import { archiveResourceAction, deleteResourceAction, duplicateResourceAction } from "@/app/(admin)/admin/actions";
import { Badge } from "@/components/ui/badge";
import type { AdminResourceConfig } from "@/lib/admin/resources";
import type { AdminRow } from "@/lib/admin/data";

function formatValue(value: unknown) {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return "JSON";
  if (typeof value === "string" && value.includes("T") && !Number.isNaN(Date.parse(value))) {
    return new Date(value).toLocaleString();
  }
  return String(value);
}

export function AdminResourceTable({
  resource,
  rows,
  error,
}: {
  resource: AdminResourceConfig;
  rows: AdminRow[];
  error?: string | null;
}) {
  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <div>
          <span className="admin-kicker">CMS Module</span>
          <h1>{resource.title}</h1>
          <p>{resource.description}</p>
        </div>
        {!resource.readOnly ? (
          <Link href={`/admin/${resource.slug}/new`} className="admin-primary-link">
            <Plus className="size-4" />
            {resource.createLabel ?? `New ${resource.singular}`}
          </Link>
        ) : null}
      </header>

      {error ? <div className="admin-error-banner">{error}</div> : null}

      <div className="admin-table-card">
        <div className="admin-table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                {resource.listFields.map((field) => (
                  <th key={field}>{field.replaceAll("_", " ")}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={String(row.id)}>
                  {resource.listFields.map((field) => (
                    <td key={field}>
                      {field.includes("status") ? (
                        <Badge>{formatValue(row[field])}</Badge>
                      ) : (
                        formatValue(row[field])
                      )}
                    </td>
                  ))}
                  <td>
                    <div className="admin-row-actions">
                      {!resource.readOnly ? (
                        <Link href={`/admin/${resource.slug}/${row.id}/edit`} aria-label={`Edit ${resource.singular}`}>
                          <Edit3 className="size-4" />
                        </Link>
                      ) : null}
                      {!resource.readOnly ? (
                        <form action={duplicateResourceAction.bind(null, resource.slug, String(row.id))}>
                          <button type="submit" aria-label={`Duplicate ${resource.singular}`}>
                            <Copy className="size-4" />
                          </button>
                        </form>
                      ) : null}
                      {resource.archiveField ? (
                        <form action={archiveResourceAction.bind(null, resource.slug, String(row.id))}>
                          <button type="submit" aria-label={`Archive ${resource.singular}`}>
                            <Archive className="size-4" />
                          </button>
                        </form>
                      ) : null}
                      {!resource.readOnly ? (
                        <form action={deleteResourceAction.bind(null, resource.slug, String(row.id))}>
                          <button type="submit" aria-label={`Delete ${resource.singular}`}>
                            <Trash2 className="size-4" />
                          </button>
                        </form>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={resource.listFields.length + 1}>
                    <div className="admin-empty-state">
                      <h2>No records yet</h2>
                      <p>Create the first {resource.singular.toLowerCase()} to start managing this module.</p>
                      {!resource.readOnly ? (
                        <Link href={`/admin/${resource.slug}/new`} className="admin-primary-link">
                          Create Record
                        </Link>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

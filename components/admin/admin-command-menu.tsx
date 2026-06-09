"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Command, Search, X } from "lucide-react";

type CommandItem = {
  href: string;
  label: string;
  icon: string;
};

export function AdminCommandMenu({ items }: { items: CommandItem[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) return items;
    return items.filter((item) => item.label.toLowerCase().includes(normalized));
  }, [items, query]);

  return (
    <>
      <button type="button" className="admin-command-trigger" onClick={() => setOpen(true)}>
        <Search className="size-4" />
        Search
        <kbd>⌘K</kbd>
      </button>

      {open ? (
        <div className="admin-command-backdrop" role="dialog" aria-modal="true" aria-label="Command palette">
          <div className="admin-command-panel">
            <div className="admin-command-input">
              <Command className="size-4" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search admin pages..."
                autoFocus
              />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close command palette">
                <X className="size-4" />
              </button>
            </div>
            <div className="admin-command-results">
              {filtered.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  <span>{item.icon.slice(0, 2)}</span>
                  {item.label}
                </Link>
              ))}
              {filtered.length === 0 ? <p>No matching pages.</p> : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

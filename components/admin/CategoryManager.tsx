"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Category } from "@/lib/types";

export default function CategoryManager({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [newTitle, setNewTitle] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    });
    if (res.ok) {
      setNewTitle("");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({ error: "Failed." }));
      setError(data.error || "Failed.");
    }
    setBusy(false);
  }

  function startEdit(c: Category) {
    if (!c._id) return;
    setEditingId(c._id);
    setEditValue(c.title);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditValue("");
  }

  async function saveEdit(id: string) {
    if (!editValue.trim()) return;
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/category", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id, title: editValue }),
    });
    if (res.ok) {
      cancelEdit();
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({ error: "Failed." }));
      setError(data.error || "Failed.");
    }
    setBusy(false);
  }

  return (
    <div>
      {categories.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {categories.map((c) =>
            editingId === c._id ? (
              <li key={c._id} className="flex items-center gap-1">
                <input
                  autoFocus
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit(c._id!);
                    if (e.key === "Escape") cancelEdit();
                  }}
                  className="rounded-full border border-accent bg-white px-3 py-1 text-sm outline-none"
                />
                <button
                  onClick={() => saveEdit(c._id!)}
                  disabled={busy}
                  className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-paper hover:bg-accent-dark disabled:opacity-60"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="rounded-full border border-line px-3 py-1 text-xs text-muted hover:border-accent hover:text-accent"
                >
                  Cancel
                </button>
              </li>
            ) : (
              <li
                key={c._id}
                className="group flex items-center gap-1 rounded-full border border-line px-3 py-1 text-sm text-muted"
              >
                {c.title}
                <button
                  onClick={() => startEdit(c)}
                  aria-label={`Edit ${c.title}`}
                  className="ml-1 opacity-0 transition-opacity group-hover:opacity-100 hover:text-accent"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </li>
            )
          )}
        </ul>
      ) : (
        <p className="text-muted">No categories yet.</p>
      )}

      <form onSubmit={add} className="mt-5 flex gap-2">
        <input
          className="w-full rounded-md border border-line bg-white px-3 py-2 outline-none focus:border-accent"
          placeholder="New category (e.g. Documentary)"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button
          type="submit"
          disabled={busy}
          className="shrink-0 rounded-full bg-accent px-5 py-2 text-sm font-medium text-paper hover:bg-accent-dark disabled:opacity-60"
        >
          {busy ? "…" : "Add"}
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-accent">{error}</p>}
    </div>
  );
}

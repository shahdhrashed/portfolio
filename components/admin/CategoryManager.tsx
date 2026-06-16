"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Category } from "@/lib/types";

export default function CategoryManager({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (res.ok) {
      setTitle("");
      router.refresh();
    } else {
      const { error } = await res.json().catch(() => ({ error: "Failed." }));
      setError(error || "Failed.");
    }
    setBusy(false);
  }

  return (
    <div>
      {categories.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <li
              key={c._id}
              className="rounded-full border border-line px-3 py-1 text-sm text-muted"
            >
              {c.title}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No categories yet.</p>
      )}

      <form onSubmit={add} className="mt-5 flex gap-2">
        <input
          className="w-full rounded-md border border-line bg-white px-3 py-2 outline-none focus:border-accent"
          placeholder="New category (e.g. Documentary)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="submit"
          disabled={busy}
          className="shrink-0 rounded-full bg-accent px-5 py-2 text-sm font-medium text-paper hover:bg-accent-dark disabled:opacity-60"
        >
          {busy ? "Adding…" : "Add"}
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-accent">{error}</p>}
    </div>
  );
}

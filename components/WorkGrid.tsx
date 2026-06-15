"use client";

import { useMemo, useState } from "react";
import type { WorkItem, Category, WorkType } from "@/lib/types";
import WorkCard from "./WorkCard";

type TypeFilter = WorkType | "all";

const typeFilters: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "All work" },
  { value: "video", label: "Video" },
  { value: "article", label: "Writing" },
  { value: "photo", label: "Photo" },
];

export default function WorkGrid({
  items,
  categories,
  initialType = "all",
}: {
  items: WorkItem[];
  categories: Category[];
  initialType?: TypeFilter;
}) {
  const [type, setType] = useState<TypeFilter>(initialType);
  const [category, setCategory] = useState<string | "all">("all");

  const filtered = useMemo(() => {
    return items.filter((it) => {
      if (type !== "all" && it.type !== type) return false;
      if (category !== "all" && it.category?.slug !== category) return false;
      return true;
    });
  }, [items, type, category]);

  const chip = (active: boolean) =>
    `rounded-full px-4 py-1.5 text-sm transition-colors ${
      active
        ? "bg-accent text-paper"
        : "border border-accent text-accent hover:bg-accent hover:text-paper"
    }`;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {typeFilters.map((f) => (
          <button key={f.value} className={chip(type === f.value)} onClick={() => setType(f.value)}>
            {f.label}
          </button>
        ))}
      </div>

      {categories.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            className={`text-xs ${category === "all" ? "text-accent" : "text-muted hover:text-ink"}`}
            onClick={() => setCategory("all")}
          >
            All topics
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              className={`text-xs ${
                category === c.slug ? "text-accent" : "text-muted hover:text-ink"
              }`}
              onClick={() => setCategory(c.slug)}
            >
              · {c.title}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="mt-12 text-muted">No work here yet — check back soon.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <WorkCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

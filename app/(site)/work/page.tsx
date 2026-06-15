import type { Metadata } from "next";
import { getAllWork, getCategories } from "@/lib/content";
import WorkGrid from "@/components/WorkGrid";
import type { WorkType } from "@/lib/types";

export const metadata: Metadata = {
  title: "Work",
  description: "The full archive — video reports, documentaries, articles, and photo stories.",
};

const validTypes: WorkType[] = ["video", "article", "photo"];

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const [{ type }, items, categories] = await Promise.all([
    searchParams,
    getAllWork(),
    getCategories(),
  ]);

  const initialType =
    type && validTypes.includes(type as WorkType) ? (type as WorkType) : "all";

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <header className="mb-10">
        <p className="eyebrow text-accent">Archive</p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">All work</h1>
        <p className="mt-3 max-w-xl text-muted">
          Everything in one place. Filter by format or topic.
        </p>
      </header>

      <WorkGrid items={items} categories={categories} initialType={initialType} />
    </div>
  );
}

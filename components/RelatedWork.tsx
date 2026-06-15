import type { WorkItem } from "@/lib/types";
import WorkCard from "./WorkCard";

export default function RelatedWork({ items }: { items: WorkItem[] }) {
  if (!items.length) return null;
  return (
    <section className="mx-auto mt-20 max-w-6xl px-5 sm:px-8">
      <h2 className="border-t border-line pt-8 font-serif text-2xl">Related work</h2>
      <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <WorkCard key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
}

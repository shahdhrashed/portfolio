import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/admin/auth";
import { getCategories } from "@/lib/content";
import CategoryManager from "@/components/admin/CategoryManager";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  if (!(await isAuthed())) redirect("/admin/login");
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-2xl px-5 py-10 sm:px-8">
      <Link href="/admin" className="text-sm text-muted hover:text-accent">
        ← Back
      </Link>
      <h1 className="mb-2 mt-4 font-serif text-3xl text-accent">Categories</h1>
      <p className="mb-6 text-sm text-muted">
        Topics used to group and filter your work.
      </p>
      <CategoryManager categories={categories} />
    </div>
  );
}

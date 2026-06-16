import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { isAuthed } from "@/lib/admin/auth";
import { getCategories } from "@/lib/content";
import { getDocForEdit } from "@/lib/admin/read";
import ContentForm from "@/components/admin/ContentForm";

export const dynamic = "force-dynamic";

const valid = ["video", "article", "photo"] as const;
type Friendly = (typeof valid)[number];

const heading: Record<Friendly, string> = {
  video: "video",
  article: "post",
  photo: "photo story",
};

export default async function EditorPage({
  params,
}: {
  params: Promise<{ type: string; id: string }>;
}) {
  if (!(await isAuthed())) redirect("/admin/login");
  const { type, id } = await params;
  if (!valid.includes(type as Friendly)) notFound();
  const friendly = type as Friendly;

  const [categories, doc] = await Promise.all([
    getCategories(),
    id === "new" ? Promise.resolve(null) : getDocForEdit(id),
  ]);

  return (
    <div className="mx-auto max-w-2xl px-5 py-10 sm:px-8">
      <Link href="/admin" className="text-sm text-muted hover:text-accent">
        ← Back
      </Link>
      <h1 className="mb-8 mt-4 font-serif text-3xl text-accent">
        {id === "new" ? `New ${heading[friendly]}` : `Edit ${heading[friendly]}`}
      </h1>
      <ContentForm friendly={friendly} doc={doc} categories={categories} />
    </div>
  );
}

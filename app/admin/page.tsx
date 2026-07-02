import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/admin/auth";
import { hasWriteToken } from "@/sanity/writeClient";
import { getAdminList } from "@/lib/admin/read";
import { formatDate } from "@/lib/format";
import LogoutButton from "@/components/admin/LogoutButton";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

const friendly: Record<string, string> = {
  videoWork: "video",
  article: "article",
  photoStory: "photo",
};
const typeLabel: Record<string, string> = {
  videoWork: "Video",
  article: "Article",
  photoStory: "Photo story",
};

export default async function AdminDashboard() {
  if (!(await isAuthed())) redirect("/admin/login");
  const items = await getAdminList();

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
      <header className="flex items-center justify-between border-b border-line pb-5">
        <span
          className="text-2xl font-bold text-accent"
          style={{ fontFamily: "var(--font-modernline), cursive" }}
        >
          SHR.
        </span>
        <div className="flex items-center gap-5">
          <Link href="/" className="text-sm text-muted hover:text-accent">
            View site ↗
          </Link>
          <LogoutButton />
        </div>
      </header>

      {!hasWriteToken && (
        <p className="mt-6 rounded-md border border-accent/40 bg-paper-dim p-4 text-sm">
          Saving is disabled — the server is missing <code>SANITY_API_TOKEN</code>.
          Add it to <code>.env.local</code> and restart.
        </p>
      )}

      <section className="mt-8">
        <h1 className="font-serif text-3xl text-accent">Your work</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          <NewButton href="/admin/video/new" label="+ Add video" />
          <NewButton href="/admin/article/new" label="+ Write post" />
          <NewButton href="/admin/photo/new" label="+ Add photo story" />
          <NewButton href="/admin/profile" label="Edit profile" subtle />
          <NewButton href="/admin/categories" label="Categories" subtle />
          <NewButton href="/admin/messages" label="Messages" subtle />
        </div>
      </section>

      <section className="mt-8">
        {items.length === 0 ? (
          <p className="rounded-md border border-line bg-paper-dim p-6 text-muted">
            Nothing here yet. Use the buttons above to add your first piece.
          </p>
        ) : (
          <ul className="divide-y divide-line rounded-md border border-line bg-white">
            {items.map((it) => (
              <li
                key={it._id}
                className="flex items-center justify-between gap-4 px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{it.title}</p>
                  <p className="text-xs text-muted">
                    {typeLabel[it.type]} · {formatDate(it.date)}
                    {it.category ? ` · ${it.category}` : ""}
                    {it.featured ? " · ★ featured" : ""}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <Link
                    href={`/admin/${friendly[it.type]}/${it._id}`}
                    className="text-xs text-accent hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteButton id={it._id} title={it.title} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function NewButton({
  href,
  label,
  subtle,
}: {
  href: string;
  label: string;
  subtle?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        subtle
          ? "rounded-full border border-line px-4 py-2 text-sm hover:border-accent hover:text-accent"
          : "rounded-full bg-accent px-4 py-2 text-sm font-medium text-paper hover:bg-accent-dark"
      }
    >
      {label}
    </Link>
  );
}

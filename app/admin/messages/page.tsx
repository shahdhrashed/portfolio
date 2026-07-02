import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/admin/auth";
import { client } from "@/sanity/client";
import { formatDate } from "@/lib/format";
import LogoutButton from "@/components/admin/LogoutButton";

export const dynamic = "force-dynamic";

interface Message {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  body: string;
  sentAt: string;
  read: boolean;
}

export default async function MessagesPage() {
  if (!(await isAuthed())) redirect("/admin/login");

  const messages: Message[] = await client.fetch(
    `*[_type == "message"] | order(sentAt desc) { _id, name, email, subject, body, sentAt, read }`
  );

  const unread = messages.filter((m) => !m.read).length;

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
          <Link href="/admin" className="text-sm text-muted hover:text-accent">
            ← Dashboard
          </Link>
          <Link href="/" className="text-sm text-muted hover:text-accent">
            View site ↗
          </Link>
          <LogoutButton />
        </div>
      </header>

      <section className="mt-8">
        <div className="flex items-baseline gap-3">
          <h1 className="font-serif text-3xl text-accent">Messages</h1>
          {unread > 0 && (
            <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-paper">
              {unread} new
            </span>
          )}
        </div>

        {messages.length === 0 ? (
          <p className="mt-6 rounded-md border border-line bg-paper-dim p-6 text-muted">
            No messages yet.
          </p>
        ) : (
          <ul className="mt-5 divide-y divide-line rounded-md border border-line bg-white">
            {messages.map((msg) => (
              <li key={msg._id} className={`px-5 py-4 ${msg.read ? "opacity-60" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {!msg.read && (
                        <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
                      )}
                      <p className="font-semibold text-ink">{msg.name}</p>
                      <span className="text-muted">·</span>
                      <a
                        href={`mailto:${msg.email}`}
                        className="truncate text-sm text-muted hover:text-accent"
                      >
                        {msg.email}
                      </a>
                    </div>
                    {msg.subject && (
                      <p className="mt-0.5 text-sm font-medium text-ink/70">{msg.subject}</p>
                    )}
                    <p className="mt-2 whitespace-pre-wrap text-sm text-muted">{msg.body}</p>
                  </div>
                  <time className="shrink-0 text-xs text-muted">
                    {msg.sentAt ? formatDate(msg.sentAt) : "—"}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

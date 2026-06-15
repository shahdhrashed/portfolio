import Link from "next/link";
import type { Profile } from "@/lib/types";

const platformLabels: Record<string, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  x: "X",
  email: "Email",
};

export default function Footer({ profile }: { profile: Profile }) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-serif text-lg">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">{profile.headline}</p>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          {profile.socials?.map((s) => (
            <a
              key={s.platform + s.url}
              href={s.platform === "email" ? `mailto:${s.url}` : s.url}
              target={s.platform === "email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              {platformLabels[s.platform] ?? s.platform}
            </a>
          ))}
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              {profile.email}
            </a>
          )}
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 text-xs text-muted sm:px-8">
          <span>© {year} {profile.name}. All rights reserved.</span>
          <Link href="/studio" className="hover:text-accent">
            Manage content
          </Link>
        </div>
      </div>
    </footer>
  );
}

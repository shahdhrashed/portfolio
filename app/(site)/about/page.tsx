import type { Metadata } from "next";
import Image from "next/image";
import { getProfile } from "@/lib/content";
import HtmlBody from "@/components/HtmlBody";
import { imageUrl } from "@/sanity/image";

export const metadata: Metadata = {
  title: "About",
  description: "About me — background, focus, and how to get in touch.",
};

export default async function AboutPage() {
  const profile = await getProfile();
  const headshot = imageUrl(profile.headshot, { width: 700 });

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.4fr] md:gap-14">
        <div>
          {headshot && (
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-paper-dim">
              <Image
                src={headshot}
                alt={profile.headshot?.alt || profile.name}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
                priority
              />
            </div>
          )}
          <div className="mt-6 space-y-2 text-sm">
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="block text-muted hover:text-accent">
                {profile.email}
              </a>
            )}
            {profile.socials?.map((s) => (
              <a
                key={s.platform + s.url}
                href={s.platform === "email" ? `mailto:${s.url}` : s.url}
                target={s.platform === "email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="block text-muted capitalize hover:text-accent"
              >
                {s.platform}
              </a>
            ))}
            {profile.cvUrl && (
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block rounded-full border border-accent px-5 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-paper"
              >
                Download CV
              </a>
            )}
          </div>
        </div>

        <div>
          <p className="eyebrow text-accent">{profile.headline}</p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">{profile.name}</h1>
          <div className="mt-6">
            {profile.bioHtml ? (
              <HtmlBody html={profile.bioHtml} />
            ) : (
              <p className="prose-body">{profile.shortBio}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

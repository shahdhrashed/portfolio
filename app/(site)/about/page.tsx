import type { Metadata } from "next";
import Image from "next/image";
import { getProfile } from "@/lib/content";
import HtmlBody from "@/components/HtmlBody";
import { imageUrl } from "@/sanity/image";
import ContactButton from "@/components/ContactModal";

function SocialIcon({ platform }: { platform: string }) {
  const p = platform.toLowerCase();
  if (p === "instagram")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    );
  if (p === "linkedin")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  if (p === "youtube")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon fill="currentColor" stroke="none" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    );
  if (p === "twitter" || p === "x")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  if (p === "behance")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M7.5 11.5c.828 0 1.5-.672 1.5-1.5S8.328 8.5 7.5 8.5H5v3h2.5zM5 13v3.5h3c.828 0 1.5-.672 1.5-1.5v-.5c0-.828-.672-1.5-1.5-1.5H5zM16.5 11c-1.38 0-2.5.895-2.5 2h5c0-1.105-1.12-2-2.5-2zM2 6h9c2.209 0 4 1.567 4 3.5 0 1.116-.61 2.095-1.5 2.676C15 12.87 16 14.09 16 15.5 16 17.433 14.209 19 12 19H2V6zm12.5 2H21v1h-6.5V8zM14 14h5.5c-.25 1.657-1.792 3-3.5 3S13.75 15.657 14 14z" />
      </svg>
    );
  if (p === "github")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    );
  // fallback
  return <span className="text-[11px] font-semibold uppercase">{platform.slice(0, 2)}</span>;
}

export const metadata: Metadata = {
  title: "About",
  description: "About me — background, focus, and how to get in touch.",
};

export default async function AboutPage() {
  const profile = await getProfile();
  const headshot = imageUrl(profile.headshot, { width: 700 });

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-16">

        {/* Left: text content */}
        <div className="order-2 md:order-1">
          <p className="text-sm text-muted">Hello, I'm</p>
          <h1 className="mt-1 font-serif text-5xl leading-tight sm:text-6xl">
            {profile.name}
          </h1>
          {profile.headline && (
            <p className="mt-2 text-base font-medium text-ink/60">{profile.headline}</p>
          )}

          <div className="mt-5 leading-relaxed text-muted">
            {profile.bioHtml ? (
              <HtmlBody html={profile.bioHtml} />
            ) : (
              <p>{profile.shortBio}</p>
            )}
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <ContactButton />
            {profile.cvUrl && (
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-accent px-6 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-paper"
              >
                Download CV
              </a>
            )}
          </div>

          {/* Socials */}
          {profile.socials && profile.socials.length > 0 && (
            <div className="mt-5 flex items-center gap-3">
              <span className="text-sm text-muted">Find me on</span>
              <div className="flex gap-2">
                {profile.socials.map((s) => (
                  <a
                    key={s.platform + s.url}
                    href={s.platform === "email" ? `mailto:${s.url}` : s.url}
                    target={s.platform === "email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    <SocialIcon platform={s.platform} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: photo with decorative shape */}
        <div className="order-1 flex justify-center md:order-2 md:justify-end">
          <div className="relative w-full max-w-[320px]">
            {/* Offset accent background */}
            <div className="absolute -bottom-4 -right-4 h-full w-full rounded-3xl bg-accent/15" />
            {/* Photo */}
            {headshot ? (
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-paper-dim">
                <Image
                  src={headshot}
                  alt={profile.headshot?.alt || profile.name}
                  fill
                  sizes="(max-width: 768px) 80vw, 320px"
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="relative aspect-[3/4] rounded-3xl bg-paper-dim" />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

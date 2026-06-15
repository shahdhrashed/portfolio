import Link from "next/link";
import { getFeaturedWork, getProfile } from "@/lib/content";
import WorkCard from "@/components/WorkCard";

export default async function HomePage() {
  const [profile, featured] = await Promise.all([getProfile(), getFeaturedWork()]);

  return (
    <div>
      <section className="mx-auto max-w-6xl px-5 pt-16 pb-12 sm:px-8 sm:pt-24">
        <p className="eyebrow text-accent">{profile.headline}</p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.08] sm:text-6xl">
          Stories told in video, words, and image.
        </h1>
        {profile.shortBio && (
          <p className="mt-6 max-w-xl text-lg text-muted">{profile.shortBio}</p>
        )}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/work"
            className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent-dark"
          >
            View all work
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-accent px-6 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-paper"
          >
            About me
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex items-baseline justify-between border-t border-line pt-8">
          <h2 className="font-serif text-2xl">Featured work</h2>
          <Link href="/work" className="text-sm text-muted transition-colors hover:text-accent">
            See everything →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <WorkCard key={item._id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

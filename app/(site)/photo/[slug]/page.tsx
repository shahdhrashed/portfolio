import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPhotoStory, getSlugs, getRelated } from "@/lib/content";
import Gallery from "@/components/Gallery";
import RelatedWork from "@/components/RelatedWork";
import { formatDate } from "@/lib/format";

export async function generateStaticParams() {
  return (await getSlugs("photoStory")).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = await getPhotoStory(slug);
  if (!story) return {};
  return { title: story.title, description: story.excerpt };
}

export default async function PhotoStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = await getPhotoStory(slug);
  if (!story) notFound();

  const related = await getRelated(story);

  return (
    <article>
      <div className="mx-auto max-w-4xl px-5 pt-12 sm:px-8">
        <Link href="/work?type=photo" className="text-sm text-muted hover:text-accent">
          ← Back to photo stories
        </Link>
        <p className="eyebrow mt-6 text-accent">
          {story.category?.title ?? "Photo story"} · {formatDate(story.date)}
        </p>
        <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-5xl">{story.title}</h1>
        {story.description && (
          <p className="mt-4 max-w-2xl text-lg text-muted">{story.description}</p>
        )}
      </div>

      <div className="mx-auto mt-10 max-w-4xl px-5 sm:px-8">
        <Gallery images={story.gallery} />
      </div>

      <RelatedWork items={related} />
    </article>
  );
}

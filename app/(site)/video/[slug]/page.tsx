import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVideo, getSlugs, getRelated } from "@/lib/content";
import VideoEmbed from "@/components/VideoEmbed";
import RelatedWork from "@/components/RelatedWork";
import { formatDate } from "@/lib/format";

export async function generateStaticParams() {
  return (await getSlugs("videoWork")).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const video = await getVideo(slug);
  if (!video) return {};
  return { title: video.title, description: video.excerpt };
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const video = await getVideo(slug);
  if (!video) notFound();

  const related = await getRelated(video);

  return (
    <article>
      <div className="mx-auto max-w-4xl px-5 pt-12 sm:px-8">
        <Link href="/work?type=video" className="text-sm text-muted hover:text-accent">
          ← Back to videos
        </Link>
        <p className="eyebrow mt-6 text-accent">
          {video.category?.title ?? "Video"} · {formatDate(video.date)}
        </p>
        <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-5xl">{video.title}</h1>
      </div>

      <div className="mx-auto mt-8 max-w-4xl px-5 sm:px-8">
        <VideoEmbed url={video.videoUrl} title={video.title} />
      </div>

      {video.description && (
        <div className="mx-auto mt-8 max-w-2xl px-5 sm:px-8">
          <p className="prose-body whitespace-pre-line">{video.description}</p>
        </div>
      )}

      <RelatedWork items={related} />
    </article>
  );
}

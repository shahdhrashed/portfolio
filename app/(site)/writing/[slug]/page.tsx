import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, getSlugs, getRelated } from "@/lib/content";
import HtmlBody from "@/components/HtmlBody";
import RelatedWork from "@/components/RelatedWork";
import { imageUrl } from "@/sanity/image";
import { formatDate } from "@/lib/format";

export async function generateStaticParams() {
  return (await getSlugs("article")).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const related = await getRelated(article);
  // Hero renders at aspect-[16/9] — a different box than the 16/10 work
  // card, but the same stored hotspot serves both accurately.
  const cover = imageUrl(article.coverImage, { width: 1400, height: 788 });

  return (
    <article>
      <div className="mx-auto max-w-3xl px-5 pt-12 sm:px-8">
        <Link href="/work?type=article" className="text-sm text-muted hover:text-accent">
          ← Back to writing
        </Link>
        <p className="eyebrow mt-6 text-accent">
          {article.category?.title ?? "Article"} · {formatDate(article.date)}
        </p>
        <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-5xl">{article.title}</h1>
        {article.excerpt && (
          <p className="mt-4 font-serif text-xl italic text-muted">{article.excerpt}</p>
        )}
      </div>

      {cover && (
        <div className="mx-auto mt-8 max-w-4xl px-5 sm:px-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-paper-dim">
            <Image
              src={cover}
              alt={article.coverImage?.alt || article.title}
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <div className="mx-auto mt-10 max-w-2xl px-5 sm:px-8">
        {article.bodyHtml ? (
          <HtmlBody html={article.bodyHtml} />
        ) : (
          <p className="text-muted">This article has no content yet.</p>
        )}
      </div>

      <RelatedWork items={related} />
    </article>
  );
}

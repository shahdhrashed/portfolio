import Image from "next/image";
import Link from "next/link";
import type { WorkItem } from "@/lib/types";
import { imageUrl } from "@/sanity/image";
import { parseVideo } from "@/lib/video";
import { formatDate, typeLabels, typeHref } from "@/lib/format";

function coverFor(item: WorkItem): string | undefined {
  const fromCover = imageUrl(item.coverImage, { width: 800 });
  if (fromCover) return fromCover;
  if (item.type === "video") return parseVideo(item.videoUrl).thumbnail ?? undefined;
  if (item.type === "photo" && item.gallery?.length)
    return imageUrl(item.gallery[0], { width: 800 });
  return undefined;
}

export default function WorkCard({ item }: { item: WorkItem }) {
  const href = `${typeHref[item.type]}/${item.slug}`;
  const cover = coverFor(item);
  const isVideo = item.type === "video";

  return (
    <Link href={href} className="group flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-paper-dim">
        {cover ? (
          <Image
            src={cover}
            alt={item.coverImage?.alt || item.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted">
            <span className="text-sm">No image</span>
          </div>
        )}

        {isVideo && (
          <>
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-paper/85 text-ink transition-transform duration-300 group-hover:scale-110">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
            {item.duration && (
              <span className="absolute bottom-2 right-2 rounded bg-black/65 px-1.5 py-0.5 text-xs font-medium text-white">
                {item.duration}
              </span>
            )}
          </>
        )}
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <span className="eyebrow text-accent">
          {item.category?.title ?? typeLabels[item.type]}
        </span>
        <h3 className="mt-1.5 font-serif text-lg leading-snug transition-colors group-hover:text-accent-dark">
          {item.title}
        </h3>
        {item.excerpt && (
          <p className="mt-1.5 line-clamp-2 text-sm text-muted">{item.excerpt}</p>
        )}
        <span className="mt-2 text-xs text-muted">
          {typeLabels[item.type]} · {formatDate(item.date)}
        </span>
      </div>
    </Link>
  );
}

"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import type { SanityImage } from "@/lib/types";
import { imageUrl } from "@/sanity/image";

export default function Gallery({ images }: { images: SanityImage[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const move = useCallback(
    (dir: number) =>
      setOpen((i) => (i === null ? null : (i + dir + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, move]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {images.map((img, i) => {
          const url = imageUrl(img, { width: 1000 });
          if (!url) return null;
          return (
            <figure key={i} className="m-0">
              <button
                onClick={() => setOpen(i)}
                className="group relative block w-full overflow-hidden rounded-md bg-paper-dim"
                style={{ aspectRatio: "3 / 2" }}
                aria-label={`Open photo ${i + 1}`}
              >
                <Image
                  src={url}
                  alt={img.alt || img.caption || `Photo ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </button>
              {img.caption && (
                <figcaption className="mt-2 text-sm text-muted">{img.caption}</figcaption>
              )}
            </figure>
          );
        })}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute right-4 top-4 text-white/80 hover:text-white"
            onClick={close}
            aria-label="Close"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
          <button
            className="absolute left-3 text-white/70 hover:text-white sm:left-6"
            onClick={(e) => { e.stopPropagation(); move(-1); }}
            aria-label="Previous"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <figure className="m-0 max-h-[88vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative" style={{ width: "min(90vw, 1100px)", height: "80vh" }}>
              <Image
                src={imageUrl(images[open], { width: 1600 }) || ""}
                alt={images[open].alt || images[open].caption || ""}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            {images[open].caption && (
              <figcaption className="mt-3 text-center text-sm text-white/70">
                {images[open].caption}
              </figcaption>
            )}
          </figure>
          <button
            className="absolute right-3 text-white/70 hover:text-white sm:right-6"
            onClick={(e) => { e.stopPropagation(); move(1); }}
            aria-label="Next"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

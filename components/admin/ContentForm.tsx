"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";
import ImageCropModal from "./ImageCropModal";
import RichTextEditor from "./RichTextEditor";
import { uploadImage, type UploadedImage } from "./uploadImage";
import type { Category } from "@/lib/types";

const GALLERY_ASPECT = 3 / 2;

type Friendly = "video" | "article" | "photo";
const docTypeOf: Record<Friendly, string> = {
  video: "videoWork",
  article: "article",
  photo: "photoStory",
};
const titleOf: Record<Friendly, string> = {
  video: "video",
  article: "post",
  photo: "photo story",
};

interface GalleryItem extends UploadedImage {
  caption?: string;
}

export default function ContentForm({
  friendly,
  doc,
  categories,
}: {
  friendly: Friendly;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  doc: any | null;
  categories: Category[];
}) {
  const router = useRouter();
  const [title, setTitle] = useState(doc?.title ?? "");
  const [excerpt, setExcerpt] = useState(doc?.excerpt ?? "");
  const [date, setDate] = useState(doc?.date ?? new Date().toISOString().slice(0, 10));
  const [featured, setFeatured] = useState(Boolean(doc?.featured));
  const [categoryId, setCategoryId] = useState(doc?.categoryId ?? "");
  const [cover, setCover] = useState<UploadedImage | null>(
    doc?.coverImage?.assetId ? doc.coverImage : null
  );
  // video
  const [videoUrl, setVideoUrl] = useState(doc?.videoUrl ?? "");
  const [duration, setDuration] = useState(doc?.duration ?? "");
  // video + photo
  const [description, setDescription] = useState(doc?.description ?? "");
  // article
  const [bodyHtml, setBodyHtml] = useState(doc?.bodyHtml ?? "");
  // photo
  const [gallery, setGallery] = useState<GalleryItem[]>(doc?.gallery ?? []);
  const [galleryQueue, setGalleryQueue] = useState<File[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [galleryCropSrc, setGalleryCropSrc] = useState<string | null>(null);
  const [recropIndex, setRecropIndex] = useState<number | null>(null);
  const [galleryBusy, setGalleryBusy] = useState(false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const input =
    "w-full rounded-md border border-line bg-white px-3 py-2 outline-none focus:border-accent";

  function addGalleryFiles(files: FileList | null) {
    if (!files?.length) return;
    const arr = Array.from(files);
    setGalleryQueue(arr);
    setQueueIndex(0);
    setGalleryCropSrc(URL.createObjectURL(arr[0]));
  }

  function openGalleryRecrop(i: number) {
    setRecropIndex(i);
    setGalleryCropSrc(gallery[i].url);
  }

  function closeGalleryCrop() {
    if (recropIndex === null && galleryCropSrc) URL.revokeObjectURL(galleryCropSrc);
    setGalleryCropSrc(null);
    setRecropIndex(null);
    setGalleryQueue([]);
    setQueueIndex(0);
  }

  function advanceGalleryQueue() {
    if (galleryCropSrc) URL.revokeObjectURL(galleryCropSrc);
    const next = queueIndex + 1;
    if (next < galleryQueue.length) {
      setQueueIndex(next);
      setGalleryCropSrc(URL.createObjectURL(galleryQueue[next]));
    } else {
      setGalleryQueue([]);
      setQueueIndex(0);
      setGalleryCropSrc(null);
    }
  }

  async function handleGalleryCropConfirm({
    crop,
    hotspot,
  }: {
    crop: NonNullable<GalleryItem["crop"]>;
    hotspot: NonNullable<GalleryItem["hotspot"]>;
  }) {
    if (recropIndex !== null) {
      const i = recropIndex;
      setGallery((arr) => arr.map((g, gi) => (gi === i ? { ...g, crop, hotspot } : g)));
      setGalleryCropSrc(null);
      setRecropIndex(null);
      return;
    }
    const file = galleryQueue[queueIndex];
    setGalleryBusy(true);
    try {
      const uploaded = await uploadImage(file);
      setGallery((g) => [...g, { ...uploaded, crop, hotspot }]);
      advanceGalleryQueue();
    } catch {
      setError("One or more images failed to upload.");
      closeGalleryCrop();
    } finally {
      setGalleryBusy(false);
    }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return setError("Please add a title.");
    if (friendly === "video" && !videoUrl.trim())
      return setError("Please paste the YouTube or Vimeo link.");
    if (friendly === "photo" && gallery.length === 0)
      return setError("Please add at least one photo.");

    setSaving(true);
    setError("");
    const payload = {
      _id: doc?._id,
      type: docTypeOf[friendly],
      title,
      excerpt,
      date,
      featured,
      categoryId: categoryId || undefined,
      coverImage: cover
        ? { assetId: cover.assetId, crop: cover.crop, hotspot: cover.hotspot }
        : undefined,
      videoUrl,
      duration,
      description,
      bodyHtml,
      gallery: gallery.map((g) => ({
        assetId: g.assetId,
        caption: g.caption,
        crop: g.crop,
        hotspot: g.hotspot,
      })),
    };
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const { error } = await res.json().catch(() => ({ error: "Save failed." }));
      setError(error || "Save failed.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save} className="space-y-6">
      <div>
        <label className="mb-1 block text-sm font-medium">Title</label>
        <input className={input} value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      {friendly === "video" && (
        <>
          <div>
            <label className="mb-1 block text-sm font-medium">
              YouTube or Vimeo link
            </label>
            <input
              className={input}
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://youtu.be/…"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Duration (optional)</label>
            <input
              className={input}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="18:42"
            />
          </div>
        </>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium">Short summary</label>
        <textarea
          className={input}
          rows={2}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />
      </div>

      {friendly === "article" && (
        <RichTextEditor value={bodyHtml} onChange={setBodyHtml} />
      )}

      {(friendly === "video" || friendly === "photo") && (
        <div>
          <label className="mb-1 block text-sm font-medium">Description</label>
          <textarea
            className={input}
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      )}

      {friendly === "photo" && (
        <div>
          <label className="mb-2 block text-sm font-medium">Photos</label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {gallery.map((g, i) => (
              <div key={g.assetId} className="rounded-md border border-line p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={g.url}
                  alt=""
                  style={{
                    objectPosition: g.hotspot
                      ? `${g.hotspot.x * 100}% ${g.hotspot.y * 100}%`
                      : "50% 50%",
                  }}
                  className="aspect-[3/2] w-full rounded object-cover"
                />
                <input
                  className="mt-2 w-full rounded border border-line px-2 py-1 text-xs"
                  placeholder="Caption"
                  value={g.caption ?? ""}
                  onChange={(e) =>
                    setGallery((arr) =>
                      arr.map((x, xi) =>
                        xi === i ? { ...x, caption: e.target.value } : x
                      )
                    )
                  }
                />
                <div className="mt-1 flex gap-3">
                  <button
                    type="button"
                    onClick={() => openGalleryRecrop(i)}
                    className="text-xs text-muted hover:text-accent"
                  >
                    Recrop
                  </button>
                  <button
                    type="button"
                    onClick={() => setGallery((arr) => arr.filter((_, xi) => xi !== i))}
                    className="text-xs text-muted hover:text-accent"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <label className="mt-3 inline-block cursor-pointer rounded-full border border-line px-4 py-2 text-sm hover:border-accent hover:text-accent">
            + Add photos
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => addGalleryFiles(e.target.files)}
            />
          </label>

          <ImageCropModal
            src={galleryCropSrc}
            aspect={GALLERY_ASPECT}
            title={
              recropIndex !== null
                ? "Recrop photo"
                : `Photo ${queueIndex + 1} of ${galleryQueue.length}`
            }
            initialCrop={recropIndex !== null ? gallery[recropIndex]?.crop : undefined}
            onCancel={closeGalleryCrop}
            onSkip={recropIndex === null ? advanceGalleryQueue : undefined}
            onConfirm={handleGalleryCropConfirm}
            confirmLabel={recropIndex !== null ? "Save crop" : "Use this photo"}
            busy={galleryBusy}
          />
        </div>
      )}

      {friendly !== "photo" && (
        <ImageUploader
          value={cover}
          onChange={setCover}
          aspect={16 / 10}
          label={friendly === "video" ? "Cover image (optional — falls back to video thumbnail)" : "Cover image"}
        />
      )}
      {friendly === "photo" && (
        <ImageUploader
          value={cover}
          onChange={setCover}
          aspect={16 / 10}
          label="Cover image (optional — falls back to first photo)"
        />
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Category</label>
          <select
            className={input}
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">— None —</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Date</label>
          <input
            type="date"
            className={input}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
        />
        Feature on the homepage
      </label>

      {error && <p className="text-sm text-accent">{error}</p>}

      <div className="flex items-center gap-3 border-t border-line pt-5">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-paper hover:bg-accent-dark disabled:opacity-60"
        >
          {saving ? "Saving…" : `Save ${titleOf[friendly]}`}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="text-sm text-muted hover:text-accent"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

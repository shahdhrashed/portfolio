"use client";

import { useState, useRef } from "react";
import { uploadImage, type UploadedImage } from "./uploadImage";
import ImageCropModal from "./ImageCropModal";
import type { ImageCrop, ImageHotspot } from "@/lib/types";

export default function ImageUploader({
  value,
  onChange,
  label = "Image",
  aspect = 16 / 10,
}: {
  value?: UploadedImage | null;
  onChange: (img: UploadedImage | null) => void;
  label?: string;
  /** Target aspect ratio (width / height) of the frame — should match where this image is displayed. */
  aspect?: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [recropping, setRecropping] = useState(false);

  function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setError("");
    setPendingFile(file);
    setCropSrc(URL.createObjectURL(file));
    setRecropping(false);
  }

  function openRecrop() {
    if (!value?.url) return;
    setPendingFile(null);
    setCropSrc(value.url);
    setRecropping(true);
  }

  function closeCrop() {
    if (pendingFile) URL.revokeObjectURL(cropSrc!);
    setCropSrc(null);
    setPendingFile(null);
    setRecropping(false);
  }

  async function handleConfirm({ crop, hotspot }: { crop: ImageCrop; hotspot: ImageHotspot }) {
    if (recropping) {
      if (value) onChange({ ...value, crop, hotspot });
      closeCrop();
      return;
    }
    const file = pendingFile;
    if (!file) return;
    const objectUrl = cropSrc;
    setBusy(true);
    setError("");
    try {
      const img = await uploadImage(file);
      onChange({ ...img, crop, hotspot });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      setCropSrc(null);
      setPendingFile(null);
    }
  }

  const objectPosition = value?.hotspot
    ? `${value.hotspot.x * 100}% ${value.hotspot.y * 100}%`
    : "50% 50%";

  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <div className="flex items-center gap-3">
        {value?.url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value.url}
            alt=""
            style={{ objectPosition }}
            className="h-16 w-16 rounded-md border border-line object-cover"
          />
        )}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="rounded-full border border-line px-4 py-2 text-sm hover:border-accent hover:text-accent disabled:opacity-60"
        >
          {busy ? "Uploading…" : value?.url ? "Replace" : "Upload"}
        </button>
        {value?.url && (
          <>
            <button
              type="button"
              onClick={openRecrop}
              className="text-xs text-muted hover:text-accent"
            >
              Recrop
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-xs text-muted hover:text-accent"
            >
              Remove
            </button>
          </>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-accent">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={pick}
        className="hidden"
      />

      <ImageCropModal
        src={cropSrc}
        aspect={aspect}
        title={recropping ? "Recrop image" : "Crop image"}
        initialCrop={recropping ? value?.crop : undefined}
        onCancel={closeCrop}
        onConfirm={handleConfirm}
        busy={busy}
      />
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import { uploadImage, type UploadedImage } from "./uploadImage";

export default function ImageUploader({
  value,
  onChange,
  label = "Image",
}: {
  value?: UploadedImage | null;
  onChange: (img: UploadedImage | null) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const img = await uploadImage(file);
      onChange(img);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <div className="flex items-center gap-3">
        {value?.url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value.url}
            alt=""
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
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-xs text-muted hover:text-accent"
          >
            Remove
          </button>
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
    </div>
  );
}

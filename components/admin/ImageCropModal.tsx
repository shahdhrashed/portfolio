"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cropper, { type Area } from "react-easy-crop";
import { areaToCropHotspot, cropToPercentArea, type PercentArea } from "@/lib/admin/cropMath";
import type { ImageCrop, ImageHotspot } from "@/lib/types";

const OVERLAY = { hidden: { opacity: 0 }, show: { opacity: 1 } };
const PANEL = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 420, damping: 32 } },
  exit: { opacity: 0, scale: 0.96, y: 12, transition: { duration: 0.18 } },
};

export interface ImageCropModalProps {
  /** Object/remote URL of the image to crop. Modal is shown whenever this is set. */
  src: string | null;
  /** Target aspect ratio (width / height) of the frame — matches where the image is displayed. */
  aspect: number;
  /** Shown in the header, e.g. "Crop cover image" or "Photo 2 of 3". */
  title?: string;
  /** Seed the frame from a previously saved crop (recrop flow). */
  initialCrop?: ImageCrop;
  /** Shown next to Cancel when part of a batch (e.g. skipping one gallery photo). */
  onSkip?: () => void;
  onCancel: () => void;
  onConfirm: (result: { crop: ImageCrop; hotspot: ImageHotspot }) => void;
  confirmLabel?: string;
  /** Disables the actions while an upload triggered by a previous confirm is in flight. */
  busy?: boolean;
}

export default function ImageCropModal({
  src,
  aspect,
  title = "Crop image",
  initialCrop,
  onSkip,
  onCancel,
  onConfirm,
  confirmLabel = "Use this photo",
  busy = false,
}: ImageCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState<PercentArea | null>(null);

  const onCropComplete = useCallback((croppedArea: Area) => {
    setArea(croppedArea);
  }, []);

  function reset() {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setArea(null);
  }

  function handleCancel() {
    reset();
    onCancel();
  }

  function handleSkip() {
    reset();
    onSkip?.();
  }

  function handleConfirm() {
    if (!area) return;
    const result = areaToCropHotspot(area);
    reset();
    onConfirm(result);
  }

  const initialCroppedAreaPercentages = initialCrop ? cropToPercentArea(initialCrop) : undefined;

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          key="overlay"
          variants={OVERLAY}
          initial="hidden"
          animate="show"
          exit="hidden"
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />

          <motion.div
            key="panel"
            variants={PANEL}
            initial="hidden"
            animate="show"
            exit="exit"
            className="relative w-full max-w-lg rounded-2xl border border-line bg-paper shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-line px-6 py-5">
              <div>
                <h2 className="font-serif text-2xl">{title}</h2>
                <p className="mt-0.5 text-sm text-muted">
                  Drag to reposition, scroll or use the slider to zoom — this is how it&apos;ll
                  appear on the site.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCancel}
                aria-label="Close"
                className="ml-4 mt-0.5 text-muted transition-colors hover:text-ink"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-5">
              <div className="relative h-[340px] w-full overflow-hidden rounded-lg bg-ink/90 sm:h-[400px]">
                <Cropper
                  image={src}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspect}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  initialCroppedAreaPercentages={initialCroppedAreaPercentages}
                  showGrid
                />
              </div>

              <div className="mt-4 flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="h-4 w-4 shrink-0 text-muted">
                  <circle cx="10" cy="10" r="6" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.01}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full accent-[var(--color-accent)]"
                  aria-label="Zoom"
                />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="h-5 w-5 shrink-0 text-muted">
                  <circle cx="10" cy="10" r="7" />
                  <path d="M21 21l-4.35-4.35M10 7v6M7 10h6" />
                </svg>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-line px-6 py-5">
              <button
                type="button"
                onClick={handleConfirm}
                disabled={busy}
                className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent-dark disabled:opacity-60"
              >
                {busy ? "Uploading…" : confirmLabel}
              </button>
              {onSkip && (
                <button
                  type="button"
                  onClick={handleSkip}
                  disabled={busy}
                  className="text-sm text-muted hover:text-accent disabled:opacity-60"
                >
                  Skip this one
                </button>
              )}
              <button
                type="button"
                onClick={handleCancel}
                disabled={busy}
                className="ml-auto text-sm text-muted hover:text-accent disabled:opacity-60"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

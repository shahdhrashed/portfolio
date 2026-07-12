import type { ImageCrop, ImageHotspot } from "@/lib/types";

/** react-easy-crop reports/accepts crop areas as 0..100 percentages of the media. */
export interface PercentArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Derive Sanity-standard crop + hotspot fractions from a react-easy-crop percent area. */
export function areaToCropHotspot(area: PercentArea): { crop: ImageCrop; hotspot: ImageHotspot } {
  const x = area.x / 100;
  const y = area.y / 100;
  const width = area.width / 100;
  const height = area.height / 100;
  return {
    crop: {
      left: x,
      top: y,
      right: Math.max(0, 1 - x - width),
      bottom: Math.max(0, 1 - y - height),
    },
    hotspot: {
      x: x + width / 2,
      y: y + height / 2,
      width,
      height,
    },
  };
}

/** Inverse of areaToCropHotspot's crop half, for seeding the cropper when re-editing a saved crop. */
export function cropToPercentArea(crop: ImageCrop): PercentArea {
  const width = Math.max(0, 1 - crop.left - crop.right);
  const height = Math.max(0, 1 - crop.top - crop.bottom);
  return {
    x: crop.left * 100,
    y: crop.top * 100,
    width: width * 100,
    height: height * 100,
  };
}

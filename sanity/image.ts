import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";
import { isSanityConfigured } from "./env";
import type { SanityImage } from "@/lib/types";

const builder = createImageUrlBuilder(client);

/**
 * Resolve an image to a URL. Sample data carries a plain `url`; real Sanity
 * assets are passed through the image-url builder so we can request sizes.
 *
 * Pass both `width` and `height` to get an accurate crop: the SDK only
 * computes its aspect-aware region (honoring any stored `hotspot`/`crop`)
 * when both are present — width-only requests return the full image
 * unmodified, regardless of `fit`.
 */
export function imageUrl(
  source: SanityImage | undefined,
  opts?: { width?: number; height?: number }
): string | undefined {
  if (!source) return undefined;
  if (source.asset?._ref && isSanityConfigured) {
    let b = builder.image(source as SanityImageSource).auto("format").fit("crop");
    if (opts?.width) b = b.width(opts.width);
    if (opts?.height) b = b.height(opts.height);
    return b.url();
  }
  return source.url ?? source.asset?.url;
}

import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";
import { isSanityConfigured } from "./env";
import type { SanityImage } from "@/lib/types";

const builder = createImageUrlBuilder(client);

/**
 * Resolve an image to a URL. Sample data carries a plain `url`; real Sanity
 * assets are passed through the image-url builder so we can request sizes.
 */
export function imageUrl(
  source: SanityImage | undefined,
  opts?: { width?: number; height?: number }
): string | undefined {
  if (!source) return undefined;
  if (source.url) return source.url;
  if (source.asset?.url) return source.asset.url;
  if (!isSanityConfigured || !source.asset?._ref) return undefined;

  let b = builder.image(source as SanityImageSource).auto("format").fit("max");
  if (opts?.width) b = b.width(opts.width);
  if (opts?.height) b = b.height(opts.height);
  return b.url();
}

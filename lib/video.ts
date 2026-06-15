export interface ParsedVideo {
  provider: "youtube" | "vimeo" | "unknown";
  id: string | null;
  embedUrl: string | null;
  thumbnail: string | null;
}

/** Parse a YouTube or Vimeo URL into an embeddable form + a thumbnail. */
export function parseVideo(url: string | undefined): ParsedVideo {
  if (!url) return { provider: "unknown", id: null, embedUrl: null, thumbnail: null };

  const yt =
    url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/) ||
    url.match(/[?&]v=([\w-]{11})/);
  if (yt) {
    const id = yt[1];
    return {
      provider: "youtube",
      id,
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
      thumbnail: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    };
  }

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) {
    const id = vimeo[1];
    return {
      provider: "vimeo",
      id,
      embedUrl: `https://player.vimeo.com/video/${id}`,
      thumbnail: null, // Vimeo thumbnails require an API call; rely on coverImage.
    };
  }

  return { provider: "unknown", id: null, embedUrl: null, thumbnail: null };
}

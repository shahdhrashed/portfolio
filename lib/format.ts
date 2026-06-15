export function formatDate(iso: string | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(+d)) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const typeLabels: Record<string, string> = {
  video: "Video",
  article: "Article",
  photo: "Photo story",
};

export const typeHref: Record<string, string> = {
  video: "/video",
  article: "/writing",
  photo: "/photo",
};

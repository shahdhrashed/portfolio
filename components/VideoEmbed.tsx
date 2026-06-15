import { parseVideo } from "@/lib/video";

export default function VideoEmbed({ url, title }: { url: string; title: string }) {
  const { embedUrl, provider } = parseVideo(url);

  if (!embedUrl) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-lg bg-paper-dim text-muted">
        <a href={url} target="_blank" rel="noopener noreferrer" className="underline">
          Watch the video →
        </a>
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
      <iframe
        src={embedUrl}
        title={title}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
        data-provider={provider}
      />
    </div>
  );
}

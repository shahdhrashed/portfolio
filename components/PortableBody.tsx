import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";
import { imageUrl } from "@/sanity/image";
import type { SanityImage } from "@/lib/types";

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImage }) => {
      const url = imageUrl(value, { width: 1200 });
      if (!url) return null;
      return (
        <figure>
          <div className="relative w-full overflow-hidden rounded-md" style={{ aspectRatio: "3 / 2" }}>
            <Image src={url} alt={value.alt || ""} fill sizes="(max-width: 768px) 100vw, 720px" className="object-cover" />
          </div>
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },
  },
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export default function PortableBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="prose-body">
      <PortableText value={value} components={components} />
    </div>
  );
}

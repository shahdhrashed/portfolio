import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthed } from "@/lib/admin/auth";
import { writeClient, hasWriteToken } from "@/sanity/writeClient";
import { slugify } from "@/lib/admin/slug";
import type { ImageCrop, ImageHotspot } from "@/lib/types";

const sectionOf: Record<string, string> = {
  videoWork: "video",
  article: "writing",
  photoStory: "photo",
};

type ImageInput = {
  assetId?: string;
  alt?: string;
  caption?: string;
  crop?: ImageCrop;
  hotspot?: ImageHotspot;
};

function imageField(img?: ImageInput) {
  if (!img?.assetId) return undefined;
  return {
    _type: "image",
    asset: { _type: "reference", _ref: img.assetId },
    ...(img.alt ? { alt: img.alt } : {}),
    ...(img.caption ? { caption: img.caption } : {}),
    ...(img.crop ? { crop: img.crop } : {}),
    ...(img.hotspot ? { hotspot: img.hotspot } : {}),
  };
}

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasWriteToken) {
    return NextResponse.json(
      { error: "Missing SANITY_API_TOKEN on the server." },
      { status: 503 }
    );
  }

  const data = await req.json();
  const type = data.type as "videoWork" | "article" | "photoStory";
  if (!["videoWork", "article", "photoStory"].includes(type)) {
    return NextResponse.json({ error: "Invalid type." }, { status: 400 });
  }
  if (!data.title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }

  const slug = slugify(data.slug || data.title);
  const base: { _type: string; [key: string]: unknown } = {
    _type: type,
    title: data.title,
    slug: { _type: "slug", current: slug },
    excerpt: data.excerpt || undefined,
    date: data.date || new Date().toISOString().slice(0, 10),
    featured: Boolean(data.featured),
    category: data.categoryId
      ? { _type: "reference", _ref: data.categoryId }
      : undefined,
    coverImage: imageField(data.coverImage),
  };

  if (type === "videoWork") {
    base.videoUrl = data.videoUrl || "";
    base.duration = data.duration || undefined;
    base.description = data.description || undefined;
  } else if (type === "article") {
    base.bodyHtml = data.bodyHtml || "";
  } else if (type === "photoStory") {
    base.description = data.description || undefined;
    base.gallery = (data.gallery || [])
      .map((g: ImageInput) => {
        const f = imageField(g);
        return f ? { _key: g.assetId, ...f } : null;
      })
      .filter(Boolean);
  }

  let result;
  try {
    if (data._id) {
      result = await writeClient.createOrReplace({ ...base, _id: data._id as string });
    } else {
      result = await writeClient.create(base);
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[admin/content] Sanity write failed:", msg);
    return NextResponse.json({ error: msg }, { status: 502 });
  }

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath(`/${sectionOf[type]}/${slug}`);
  revalidatePath("/admin");

  return NextResponse.json({ ok: true, id: result._id, slug });
}

import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthed } from "@/lib/admin/auth";
import { writeClient, hasWriteToken } from "@/sanity/writeClient";

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasWriteToken) {
    return NextResponse.json({ error: "Missing token." }, { status: 503 });
  }

  const data = await req.json();
  const headshot = data.headshot?.assetId
    ? {
        _type: "image",
        asset: { _type: "reference", _ref: data.headshot.assetId },
        ...(data.headshot.alt ? { alt: data.headshot.alt } : {}),
      }
    : undefined;

  const socials = (data.socials || [])
    .filter((s: { platform?: string; url?: string }) => s.platform && s.url)
    .map((s: { platform: string; url: string }, i: number) => ({
      _key: `s${i}`,
      platform: s.platform,
      url: s.url,
    }));

  try {
    await writeClient.createOrReplace({
      _id: "profile",
      _type: "profile",
      name: data.name || "Shahd",
      headline: data.headline || undefined,
      shortBio: data.shortBio || undefined,
      bioHtml: data.bioHtml || undefined,
      email: data.email || undefined,
      cvUrl: data.cvUrl || undefined,
      headshot,
      socials,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[admin/profile] Sanity write failed:", msg);
    return NextResponse.json({ error: msg }, { status: 502 });
  }

  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}

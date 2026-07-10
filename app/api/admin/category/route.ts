import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthed } from "@/lib/admin/auth";
import { writeClient, hasWriteToken } from "@/sanity/writeClient";
import { slugify } from "@/lib/admin/slug";

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasWriteToken) {
    return NextResponse.json({ error: "Missing token." }, { status: 503 });
  }
  const { title } = await req.json();
  if (!title) {
    return NextResponse.json({ error: "Title required." }, { status: 400 });
  }
  let result;
  try {
    result = await writeClient.create({
      _type: "category",
      title,
      slug: { _type: "slug", current: slugify(title) },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[admin/category] Sanity write failed:", msg);
    return NextResponse.json({ error: msg }, { status: 502 });
  }
  revalidatePath("/work");
  revalidatePath("/admin/categories");
  return NextResponse.json({ ok: true, id: result._id });
}

export async function PATCH(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasWriteToken) {
    return NextResponse.json({ error: "Missing token." }, { status: 503 });
  }
  const { _id, title } = await req.json();
  if (!_id || !title) {
    return NextResponse.json({ error: "_id and title required." }, { status: 400 });
  }
  try {
    await writeClient
      .patch(_id)
      .set({ title, slug: { _type: "slug", current: slugify(title) } })
      .commit();
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 502 });
  }
  revalidatePath("/work");
  revalidatePath("/admin/categories");
  return NextResponse.json({ ok: true });
}

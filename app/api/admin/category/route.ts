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
  const result = await writeClient.create({
    _type: "category",
    title,
    slug: { _type: "slug", current: slugify(title) },
  });
  revalidatePath("/work");
  return NextResponse.json({ ok: true, id: result._id });
}

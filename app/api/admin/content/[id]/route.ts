import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthed } from "@/lib/admin/auth";
import { writeClient, hasWriteToken } from "@/sanity/writeClient";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasWriteToken) {
    return NextResponse.json({ error: "Missing token." }, { status: 503 });
  }
  const { id } = await params;
  try {
    await writeClient.delete(id);
  } catch (err: unknown) {
    const statusCode = (err as { statusCode?: number })?.statusCode;
    const msg = err instanceof Error ? err.message : String(err);
    if (statusCode === 409 || /referenc/i.test(msg)) {
      return NextResponse.json(
        { error: "Can't delete — it's still used by other items. Remove it from them first." },
        { status: 409 }
      );
    }
    console.error("[admin/content] Sanity delete failed:", msg);
    return NextResponse.json({ error: msg }, { status: 502 });
  }
  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/admin");
  revalidatePath("/admin/categories");
  revalidatePath("/admin/messages");
  return NextResponse.json({ ok: true });
}

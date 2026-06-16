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
  await writeClient.delete(id);
  revalidatePath("/");
  revalidatePath("/work");
  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin/auth";
import { writeClient, hasWriteToken } from "@/sanity/writeClient";

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

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const asset = await writeClient.assets.upload("image", buffer, {
    filename: file.name,
    contentType: file.type,
  });

  return NextResponse.json({
    assetId: asset._id,
    url: asset.url,
  });
}

import { NextResponse } from "next/server";
import { verifyPassword, startSession, isAdminConfigured } from "@/lib/admin/auth";

export async function POST(req: Request) {
  if (!isAdminConfigured) {
    return NextResponse.json(
      { error: "Admin is not configured (missing ADMIN_PASSWORD)." },
      { status: 503 }
    );
  }
  const { password } = await req.json().catch(() => ({ password: "" }));
  if (!verifyPassword(password || "")) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }
  await startSession();
  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { writeClient, hasWriteToken } from "@/sanity/writeClient";

export async function POST(req: Request) {
  if (!hasWriteToken) {
    return NextResponse.json({ error: "Contact form is currently unavailable." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, subject, body: msg } = body as Record<string, string>;

  if (!name?.trim() || !email?.trim() || !msg?.trim()) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  try {
    await writeClient.create({
      _type: "message",
      name: name.trim(),
      email: email.trim(),
      subject: subject?.trim() || undefined,
      body: msg.trim(),
      sentAt: new Date().toISOString(),
      read: false,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[contact] Sanity write failed:", message);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

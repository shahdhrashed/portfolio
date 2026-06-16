import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE = "shr_admin";
const SECRET = process.env.ADMIN_SESSION_SECRET || "shr-portfolio-default-secret";

export const adminPassword = process.env.ADMIN_PASSWORD || "";
export const isAdminConfigured = adminPassword.length > 0;

/** Deterministic token derived from the password — stored in the cookie. */
function expectedToken(): string {
  return createHmac("sha256", SECRET).update(adminPassword).digest("hex");
}

export function verifyPassword(input: string): boolean {
  if (!isAdminConfigured) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(adminPassword);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function startSession() {
  const jar = await cookies();
  jar.set(COOKIE, expectedToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export async function endSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function isAuthed(): Promise<boolean> {
  if (!isAdminConfigured) return false;
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(expectedToken());
  return a.length === b.length && timingSafeEqual(a, b);
}

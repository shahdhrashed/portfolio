import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/admin/auth";
import { getProfileForEdit } from "@/lib/admin/read";
import ProfileForm from "@/components/admin/ProfileForm";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  if (!(await isAuthed())) redirect("/admin/login");
  const profile = await getProfileForEdit();

  return (
    <div className="mx-auto max-w-2xl px-5 py-10 sm:px-8">
      <Link href="/admin" className="text-sm text-muted hover:text-accent">
        ← Back
      </Link>
      <h1 className="mb-8 mt-4 font-serif text-3xl text-accent">Profile</h1>
      <ProfileForm profile={profile} />
    </div>
  );
}

import { redirect } from "next/navigation";
import { isAuthed, isAdminConfigured } from "@/lib/admin/auth";
import LoginForm from "@/components/admin/LoginForm";

export default async function LoginPage() {
  if (await isAuthed()) redirect("/admin");

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-5">
      <p
        className="text-3xl font-bold text-accent"
        style={{ fontFamily: "var(--font-modernline), cursive" }}
      >
        SHR.
      </p>
      <h1 className="mt-4 font-serif text-3xl text-accent">Admin</h1>
      <p className="mt-2 text-sm text-muted">Sign in to manage your work.</p>

      {isAdminConfigured ? (
        <LoginForm />
      ) : (
        <p className="mt-6 rounded-md border border-line bg-paper-dim p-4 text-sm text-muted">
          Admin isn’t set up yet — add an <code>ADMIN_PASSWORD</code> to{" "}
          <code>.env.local</code> and restart the server.
        </p>
      )}
    </div>
  );
}

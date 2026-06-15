import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-5 py-32 text-center">
      <p className="eyebrow text-accent">Error 404</p>
      <h1 className="mt-4 font-serif text-4xl">This page wandered off.</h1>
      <p className="mt-3 text-muted">
        The page you’re looking for doesn’t exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent-dark"
      >
        Back home
      </Link>
    </div>
  );
}

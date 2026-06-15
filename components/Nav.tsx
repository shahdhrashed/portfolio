"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/work", label: "Work" },
  { href: "/work?type=video", label: "Video" },
  { href: "/work?type=article", label: "Writing" },
  { href: "/work?type=photo", label: "Photo" },
  { href: "/about", label: "About" },
];

export default function Nav({ name }: { name: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="font-serif text-xl tracking-tight"
          onClick={() => setOpen(false)}
        >
          {name} <span className="text-muted">/ portfolio</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={`text-sm transition-colors hover:text-accent ${
                pathname === l.href.split("?")[0] && l.href === "/work" && pathname === "/work"
                  ? "text-ink"
                  : "text-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-line px-5 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2 text-base text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

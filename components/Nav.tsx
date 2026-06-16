"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

type IconProps = { className?: string };

function HomeIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20h14V9.5" />
    </svg>
  );
}

function GridIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="3" width="7" height="7" rx="1.2" />
      <rect x="14" y="3" width="7" height="7" rx="1.2" />
      <rect x="3" y="14" width="7" height="7" rx="1.2" />
      <rect x="14" y="14" width="7" height="7" rx="1.2" />
    </svg>
  );
}

function VideoIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="2" y="6" width="14" height="12" rx="2" />
      <path d="M16 10l6-3v10l-6-3" />
    </svg>
  );
}

function PenIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 20h4L19 9l-4-4L4 16z" />
      <path d="M14 6l4 4" />
    </svg>
  );
}

function CameraIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 8a2 2 0 0 1 2-2h1.5L8 4h8l1.5 2H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <circle cx="12" cy="13" r="3.4" />
    </svg>
  );
}

function UserIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
    </svg>
  );
}

const links: {
  href: string;
  label: string;
  Icon: (p: IconProps) => React.ReactElement;
  isActive: (pathname: string, type: string | null) => boolean;
}[] = [
  { href: "/", label: "Home", Icon: HomeIcon, isActive: (p) => p === "/" },
  { href: "/work", label: "Work", Icon: GridIcon, isActive: (p, t) => p === "/work" && !t },
  { href: "/work?type=video", label: "Video", Icon: VideoIcon, isActive: (p, t) => p === "/work" && t === "video" },
  { href: "/work?type=article", label: "Writing", Icon: PenIcon, isActive: (p, t) => p === "/work" && t === "article" },
  { href: "/work?type=photo", label: "Photo", Icon: CameraIcon, isActive: (p, t) => p === "/work" && t === "photo" },
  { href: "/about", label: "About", Icon: UserIcon, isActive: (p) => p === "/about" },
];

function Dock() {
  const pathname = usePathname();
  const type = useSearchParams().get("type");

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(0.9rem,env(safe-area-inset-bottom))]">
      <nav
        aria-label="Primary"
        className="dock-rise pointer-events-auto flex items-center gap-1 rounded-full border border-white/50 bg-paper/55 px-2 py-2 shadow-[0_10px_34px_-8px_rgba(34,26,6,0.45)] backdrop-blur-xl backdrop-saturate-150"
      >
        {links.map(({ href, label, Icon, isActive }) => {
          const active = isActive(pathname, type);
          return (
            <Link
              key={label}
              href={href}
              aria-label={label}
              aria-current={active ? "page" : undefined}
              className={`group flex items-center rounded-full py-2.5 transition-[padding,background-color,color] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                active
                  ? "bg-accent px-4 text-paper shadow-sm"
                  : "px-3 text-muted hover:text-accent"
              }`}
            >
              <Icon
                key={`${label}-${active}`}
                className={`h-5 w-5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-110 ${
                  active ? "icon-pop" : ""
                }`}
              />
              <span
                className={`overflow-hidden whitespace-nowrap text-[11px] font-semibold leading-none tracking-wide transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  active ? "ml-1.5 max-w-[90px] opacity-100" : "ml-0 max-w-0 opacity-0"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default function Nav() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-5 py-6 sm:px-8 sm:py-7">
          <Link
            href="/"
            className="font-bold leading-none text-accent"
            style={{
              fontFamily: "var(--font-modernline), cursive",
              WebkitTextStroke: "0.9px currentColor",
              fontSize: "31px",
            }}
          >
            <span style={{ display: "inline-block" }}>S</span>
            <span style={{ display: "inline-block", marginLeft: "-0.42em" }}>H</span>
            <span style={{ display: "inline-block", marginLeft: "-0.15em" }}>R.</span>
          </Link>
        </div>
      </header>

      <Suspense fallback={null}>
        <Dock />
      </Suspense>
    </>
  );
}

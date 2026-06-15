import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const modernline = localFont({
  src: [
    { path: "./fonts/modernline.otf", weight: "400", style: "normal" },
    { path: "./fonts/modernline-bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-modernline",
  display: "swap",
});

const siteName = "Shahd — Portfolio";
const siteDescription =
  "A mass communication portfolio: video reports, documentaries, written features, and photojournalism.";

export const metadata: Metadata = {
  title: { default: siteName, template: "%s — Shahd" },
  description: siteDescription,
  openGraph: {
    title: siteName,
    description: siteDescription,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${modernline.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

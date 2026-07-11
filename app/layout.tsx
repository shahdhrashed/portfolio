import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const nunitoSans = localFont({
  src: [
    { path: "./fonts/NunitoSans-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "./fonts/NunitoSans-ExtraLightItalic.ttf", weight: "200", style: "italic" },
    { path: "./fonts/NunitoSans-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/NunitoSans-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "./fonts/NunitoSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/NunitoSans-Italic.ttf", weight: "400", style: "italic" },
    { path: "./fonts/NunitoSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/NunitoSans-SemiBoldItalic.ttf", weight: "600", style: "italic" },
    { path: "./fonts/NunitoSans-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/NunitoSans-BoldItalic.ttf", weight: "700", style: "italic" },
    { path: "./fonts/NunitoSans-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "./fonts/NunitoSans-ExtraBoldItalic.ttf", weight: "800", style: "italic" },
    { path: "./fonts/NunitoSans-Black.ttf", weight: "900", style: "normal" },
    { path: "./fonts/NunitoSans-BlackItalic.ttf", weight: "900", style: "italic" },
  ],
  variable: "--font-nunito-sans",
  display: "swap",
});

const cormorant = localFont({
  src: [
    { path: "./fonts/CormorantGaramond-Variable.ttf", weight: "100 700", style: "normal" },
    { path: "./fonts/CormorantGaramond-Italic-Variable.ttf", weight: "100 700", style: "italic" },
  ],
  variable: "--font-cormorant",
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

const shick = localFont({
  src: [{ path: "./fonts/shick.ttf", weight: "400", style: "normal" }],
  variable: "--font-shick",
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
      className={`${cormorant.variable} ${nunitoSans.variable} ${modernline.variable} ${shick.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

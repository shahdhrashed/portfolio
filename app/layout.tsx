import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  Inter,
  Poppins,
  Montserrat,
  Work_Sans,
  DM_Sans,
  Space_Grotesk,
  Outfit,
  Manrope,
  Playfair_Display,
  Merriweather,
  Lora,
  Source_Serif_4,
  Libre_Baskerville,
} from "next/font/google";
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

/**
 * Selectable font library for the admin "Typography" picker (lib/fonts.ts).
 * All 15 are loaded for every visitor regardless of which is active —
 * switching the selection is just a CSS variable swap, no rebuild needed.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});
const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});
const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});
const sourceSerif4 = Source_Serif_4({
  variable: "--font-source-serif-4",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});
const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  style: ["normal", "italic"],
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
      className={`${cormorant.variable} ${nunitoSans.variable} ${modernline.variable} ${shick.variable} ${inter.variable} ${poppins.variable} ${montserrat.variable} ${workSans.variable} ${dmSans.variable} ${spaceGrotesk.variable} ${outfit.variable} ${manrope.variable} ${playfairDisplay.variable} ${merriweather.variable} ${lora.variable} ${sourceSerif4.variable} ${libreBaskerville.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

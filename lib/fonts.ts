export interface FontOption {
  key: string;
  label: string;
  variable: string;
  category: "sans" | "serif";
}

export interface FontWeightOption {
  key: string;
  label: string;
  value: string;
}

export interface FontStyleOption {
  key: "normal" | "italic";
  label: string;
  value: "normal" | "italic";
}

/**
 * Every font here is loaded (as a CSS variable) for every visitor regardless
 * of selection, in app/layout.tsx — picking one is just a runtime CSS
 * variable swap, no rebuild needed. Keep this list in sync with the
 * next/font/google calls there.
 */
export const FONT_OPTIONS: FontOption[] = [
  { key: "nunito-sans", label: "Nunito Sans", variable: "--font-nunito-sans", category: "sans" },
  { key: "inter", label: "Inter", variable: "--font-inter", category: "sans" },
  { key: "poppins", label: "Poppins", variable: "--font-poppins", category: "sans" },
  { key: "montserrat", label: "Montserrat", variable: "--font-montserrat", category: "sans" },
  { key: "work-sans", label: "Work Sans", variable: "--font-work-sans", category: "sans" },
  { key: "dm-sans", label: "DM Sans", variable: "--font-dm-sans", category: "sans" },
  { key: "space-grotesk", label: "Space Grotesk", variable: "--font-space-grotesk", category: "sans" },
  { key: "outfit", label: "Outfit", variable: "--font-outfit", category: "sans" },
  { key: "manrope", label: "Manrope", variable: "--font-manrope", category: "sans" },
  { key: "cormorant", label: "Cormorant Garamond", variable: "--font-cormorant", category: "serif" },
  { key: "playfair-display", label: "Playfair Display", variable: "--font-playfair-display", category: "serif" },
  { key: "merriweather", label: "Merriweather", variable: "--font-merriweather", category: "serif" },
  { key: "lora", label: "Lora", variable: "--font-lora", category: "serif" },
  { key: "source-serif-4", label: "Source Serif 4", variable: "--font-source-serif-4", category: "serif" },
  { key: "libre-baskerville", label: "Libre Baskerville", variable: "--font-libre-baskerville", category: "serif" },
];

export const FONT_WEIGHT_OPTIONS: FontWeightOption[] = [
  { key: "300", label: "Light", value: "300" },
  { key: "400", label: "Regular", value: "400" },
  { key: "500", label: "Medium", value: "500" },
  { key: "600", label: "Semi Bold", value: "600" },
  { key: "700", label: "Bold", value: "700" },
  { key: "800", label: "Extra Bold", value: "800" },
  { key: "900", label: "Black", value: "900" },
];

export const FONT_STYLE_OPTIONS: FontStyleOption[] = [
  { key: "normal", label: "Normal", value: "normal" },
  { key: "italic", label: "Italic", value: "italic" },
];

export function findFontOption(key?: string): FontOption | undefined {
  return key ? FONT_OPTIONS.find((f) => f.key === key) : undefined;
}

export function findFontWeightOption(key?: string): FontWeightOption | undefined {
  return key ? FONT_WEIGHT_OPTIONS.find((f) => f.key === key) : undefined;
}

export function findFontStyleOption(key?: string): FontStyleOption | undefined {
  return key ? FONT_STYLE_OPTIONS.find((f) => f.key === key) : undefined;
}

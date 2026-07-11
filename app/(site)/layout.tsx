import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getProfile } from "@/lib/content";
import { findFontOption, findFontStyleOption, findFontWeightOption } from "@/lib/fonts";
import type { CSSProperties } from "react";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();
  const bodyFont = findFontOption(profile.bodyFont);
  const headingFont = findFontOption(profile.titleFont);
  const bodyWeight = findFontWeightOption(profile.bodyFontWeight);
  const headingWeight = findFontWeightOption(profile.titleFontWeight);
  const bodyStyle = findFontStyleOption(profile.bodyFontStyle);
  const headingStyle = findFontStyleOption(profile.titleFontStyle);
  const typographyStyle = {
    ...(bodyFont ? { "--font-body-override": `var(${bodyFont.variable})` } : {}),
    ...(headingFont ? { "--font-heading-override": `var(${headingFont.variable})` } : {}),
    ...(bodyWeight ? { "--font-body-weight": bodyWeight.value } : {}),
    ...(headingWeight ? { "--font-heading-weight": headingWeight.value } : {}),
    ...(bodyStyle ? { "--font-body-style": bodyStyle.value } : {}),
    ...(headingStyle ? { "--font-heading-style": headingStyle.value } : {}),
    fontFamily: "var(--font-sans)",
  } as CSSProperties;

  return (
    <div className="flex min-h-screen flex-col" style={typographyStyle}>
      <Nav
        showVideo={profile.navVideo}
        showWriting={profile.navWriting}
        showPhoto={profile.navPhoto}
      />
      <main className="flex-1">{children}</main>
      <Footer profile={profile} />
      {/* Spacer so the floating bottom dock never overlaps footer content */}
      <div aria-hidden className="h-24" />
    </div>
  );
}

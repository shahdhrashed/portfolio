import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getProfile } from "@/lib/content";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();
  return (
    <div className="flex min-h-screen flex-col">
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

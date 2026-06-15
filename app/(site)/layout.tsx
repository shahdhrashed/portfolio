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
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer profile={profile} />
    </div>
  );
}

import type { MetadataRoute } from "next";
import { getAllWork } from "@/lib/content";
import { typeHref } from "@/lib/format";

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const work = await getAllWork();
  const staticRoutes = ["", "/work", "/about"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const workRoutes = work.map((item) => ({
    url: `${base}${typeHref[item.type]}/${item.slug}`,
    lastModified: item.date ? new Date(item.date) : new Date(),
  }));

  return [...staticRoutes, ...workRoutes];
}

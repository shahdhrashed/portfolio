import { client } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";
import * as Q from "@/sanity/queries";
import {
  sampleWork,
  sampleCategories,
  sampleProfile,
} from "./sampleData";
import type {
  WorkItem,
  Category,
  Profile,
  VideoWork,
  Article,
  PhotoStory,
} from "./types";

// Revalidate fetched CMS data every 60s in production.
const fetchOpts = { next: { revalidate: 60 } } as const;

export async function getAllWork(): Promise<WorkItem[]> {
  if (!isSanityConfigured) return sampleWork;
  return client.fetch<WorkItem[]>(Q.allWorkQuery, {}, fetchOpts);
}

export async function getFeaturedWork(): Promise<WorkItem[]> {
  if (!isSanityConfigured) {
    const featured = sampleWork.filter((w) => w.featured);
    return featured.length ? featured : sampleWork.slice(0, 6);
  }
  const featured = await client.fetch<WorkItem[]>(Q.featuredWorkQuery, {}, fetchOpts);
  if (featured.length) return featured;
  return client.fetch<WorkItem[]>(Q.allWorkQuery, {}, fetchOpts);
}

export async function getCategories(): Promise<Category[]> {
  if (!isSanityConfigured) return sampleCategories;
  return client.fetch<Category[]>(Q.categoriesQuery, {}, fetchOpts);
}

export async function getVideo(slug: string): Promise<VideoWork | null> {
  if (!isSanityConfigured) {
    return (sampleWork.find((w) => w.type === "video" && w.slug === slug) as VideoWork) ?? null;
  }
  return client.fetch<VideoWork | null>(Q.videoBySlugQuery, { slug }, fetchOpts);
}

export async function getArticle(slug: string): Promise<Article | null> {
  if (!isSanityConfigured) {
    return (sampleWork.find((w) => w.type === "article" && w.slug === slug) as Article) ?? null;
  }
  return client.fetch<Article | null>(Q.articleBySlugQuery, { slug }, fetchOpts);
}

export async function getPhotoStory(slug: string): Promise<PhotoStory | null> {
  if (!isSanityConfigured) {
    return (sampleWork.find((w) => w.type === "photo" && w.slug === slug) as PhotoStory) ?? null;
  }
  return client.fetch<PhotoStory | null>(Q.photoBySlugQuery, { slug }, fetchOpts);
}

export async function getSlugs(
  type: "videoWork" | "article" | "photoStory"
): Promise<string[]> {
  if (!isSanityConfigured) {
    const map = { videoWork: "video", article: "article", photoStory: "photo" } as const;
    return sampleWork.filter((w) => w.type === map[type]).map((w) => w.slug);
  }
  const rows = await client.fetch<{ slug: string }[]>(Q.slugsByTypeQuery, { type }, fetchOpts);
  return rows.map((r) => r.slug);
}

export async function getProfile(): Promise<Profile> {
  if (!isSanityConfigured) return sampleProfile;
  const profile = await client.fetch<Profile | null>(Q.profileQuery, {}, fetchOpts);
  return profile ?? sampleProfile;
}

/** Related work of the same category, excluding the current item. */
export async function getRelated(item: WorkItem, limit = 3): Promise<WorkItem[]> {
  const all = await getAllWork();
  return all
    .filter((w) => w._id !== item._id && w.category?.slug === item.category?.slug)
    .slice(0, limit);
}

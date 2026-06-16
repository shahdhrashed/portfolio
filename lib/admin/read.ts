import { client } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";
import { groq } from "next-sanity";

export interface AdminListItem {
  _id: string;
  type: "videoWork" | "article" | "photoStory";
  title: string;
  slug: string;
  date: string;
  featured: boolean;
  category?: string;
}

const noCache = { cache: "no-store" } as const;

const listQuery = groq`
*[_type in ["videoWork", "article", "photoStory"]] | order(date desc){
  _id, "type": _type, title, "slug": slug.current, date, featured,
  "category": category->title
}`;

export async function getAdminList(): Promise<AdminListItem[]> {
  if (!isSanityConfigured) return [];
  return client.fetch<AdminListItem[]>(listQuery, {}, noCache);
}

const editQuery = groq`
*[_id == $id][0]{
  _id, "type": _type, title, "slug": slug.current, excerpt, date, featured,
  "categoryId": category._ref,
  videoUrl, duration, description, bodyHtml,
  "coverImage": coverImage{ "assetId": asset._ref, "url": asset->url, alt },
  "gallery": gallery[]{ "assetId": asset._ref, "url": asset->url, alt, caption }
}`;

export async function getDocForEdit(id: string) {
  if (!isSanityConfigured) return null;
  return client.fetch(editQuery, { id }, noCache);
}

const profileEditQuery = groq`
*[_id == "profile"][0]{
  name, headline, shortBio, bioHtml, email, cvUrl, socials,
  "headshot": headshot{ "assetId": asset._ref, "url": asset->url, alt }
}`;

export async function getProfileForEdit() {
  if (!isSanityConfigured) return null;
  return client.fetch(profileEditQuery, {}, noCache);
}

import { groq } from "next-sanity";

const categoryProjection = `category->{ title, "slug": slug.current }`;

const cardFields = `
  _id,
  "type": select(
    _type == "videoWork" => "video",
    _type == "article" => "article",
    _type == "photoStory" => "photo"
  ),
  title,
  "slug": slug.current,
  excerpt,
  date,
  featured,
  ${categoryProjection},
  coverImage
`;

// Per-type cover fallbacks: photo stories use their first gallery image.
const coverFallback = `
  "coverImage": coalesce(coverImage, gallery[0])
`;

export const allWorkQuery = groq`
*[_type in ["videoWork", "article", "photoStory"]] | order(date desc) {
  ${cardFields},
  ${coverFallback},
  videoUrl
}`;

export const featuredWorkQuery = groq`
*[_type in ["videoWork", "article", "photoStory"] && featured == true] | order(date desc) {
  ${cardFields},
  ${coverFallback},
  videoUrl
}`;

export const categoriesQuery = groq`
*[_type == "category"] | order(title asc) { _id, title, "slug": slug.current }`;

export const videoBySlugQuery = groq`
*[_type == "videoWork" && slug.current == $slug][0] {
  ${cardFields},
  videoUrl,
  duration,
  description
}`;

export const articleBySlugQuery = groq`
*[_type == "article" && slug.current == $slug][0] {
  ${cardFields},
  bodyHtml
}`;

export const photoBySlugQuery = groq`
*[_type == "photoStory" && slug.current == $slug][0] {
  ${cardFields},
  ${coverFallback},
  description,
  gallery
}`;

export const slugsByTypeQuery = groq`
*[_type == $type && defined(slug.current)]{ "slug": slug.current }`;

export const profileQuery = groq`
*[_type == "profile"][0] {
  name,
  headline,
  shortBio,
  bioHtml,
  headshot,
  email,
  cvUrl,
  socials
}`;

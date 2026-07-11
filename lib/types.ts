export type WorkType = "video" | "article" | "photo";

export interface SanityImage {
  asset?: { _ref?: string; url?: string };
  alt?: string;
  // Fallback for sample data (plain URL string)
  url?: string;
  caption?: string;
}

export interface Category {
  _id?: string;
  title: string;
  slug: string;
}

/** Common shape shared by every kind of work, used for cards and the unified feed. */
export interface WorkBase {
  _id: string;
  type: WorkType;
  title: string;
  slug: string;
  excerpt?: string;
  category?: Category;
  date: string; // ISO string
  featured?: boolean;
  coverImage?: SanityImage;
}

export interface VideoWork extends WorkBase {
  type: "video";
  videoUrl: string; // YouTube or Vimeo URL
  duration?: string;
  description?: string;
}

export interface Article extends WorkBase {
  type: "article";
  bodyHtml?: string;
}

export interface PhotoStory extends WorkBase {
  type: "photo";
  description?: string;
  gallery: SanityImage[];
}

export type WorkItem = VideoWork | Article | PhotoStory;

export interface SocialLink {
  platform: string; // instagram | linkedin | youtube | x | email
  url: string;
}

export interface Profile {
  name: string;
  headline: string;
  bioHtml?: string;
  shortBio?: string;
  headshot?: SanityImage;
  email?: string;
  cvUrl?: string;
  socials: SocialLink[];
  navVideo?: boolean;
  navWriting?: boolean;
  navPhoto?: boolean;
  bodyFont?: string;
  bodyFontWeight?: string;
  bodyFontStyle?: string;
  titleFont?: string;
  titleFontWeight?: string;
  titleFontStyle?: string;
}

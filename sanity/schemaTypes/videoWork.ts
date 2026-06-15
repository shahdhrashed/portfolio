import { defineField, defineType } from "sanity";

export const videoWork = defineType({
  name: "videoWork",
  title: "Video",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "The web address for this video. Click Generate.",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "videoUrl",
      title: "YouTube or Vimeo link",
      description: "Paste the full link to the video (e.g. https://youtu.be/...).",
      type: "url",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "excerpt",
      title: "Short summary",
      description: "One or two lines shown on cards and previews.",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "description",
      title: "Full description",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "duration",
      title: "Duration",
      description: "Optional, e.g. 18:42",
      type: "string",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image (optional)",
      description: "Leave empty to use the video's own thumbnail.",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featured",
      title: "Feature on the homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category.title", media: "coverImage" },
  },
});

import { defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Article / blog",
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
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
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
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Subheading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Alt text", type: "string" },
            { name: "caption", title: "Caption", type: "string" },
          ],
        },
      ],
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
    { title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "category.title", media: "coverImage" },
  },
});

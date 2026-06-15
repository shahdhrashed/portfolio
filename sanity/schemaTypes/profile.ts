import { defineField, defineType } from "sanity";

export const profile = defineType({
  name: "profile",
  title: "Profile / about",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "headline",
      title: "Headline",
      description: "e.g. Mass communication · journalism & media",
      type: "string",
    }),
    defineField({
      name: "shortBio",
      title: "Short bio",
      description: "One or two sentences shown on the homepage.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "bio",
      title: "Full bio",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "headshot",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    }),
    defineField({
      name: "email",
      title: "Contact email",
      type: "string",
    }),
    defineField({
      name: "cv",
      title: "CV / résumé (PDF)",
      type: "file",
      options: { accept: ".pdf" },
    }),
    defineField({
      name: "socials",
      title: "Social links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "YouTube", value: "youtube" },
                  { title: "X / Twitter", value: "x" },
                  { title: "Email", value: "email" },
                ],
              },
            },
            { name: "url", title: "URL", type: "url" },
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        },
      ],
    }),
  ],
  preview: { select: { title: "name", subtitle: "headline", media: "headshot" } },
});

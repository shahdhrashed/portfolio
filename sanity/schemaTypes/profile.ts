import { defineField, defineType } from "sanity";

// Keep in sync with FONT_OPTIONS in lib/fonts.ts.
const fontChoices = [
  { title: "Nunito Sans", value: "nunito-sans" },
  { title: "Inter", value: "inter" },
  { title: "Poppins", value: "poppins" },
  { title: "Montserrat", value: "montserrat" },
  { title: "Work Sans", value: "work-sans" },
  { title: "DM Sans", value: "dm-sans" },
  { title: "Space Grotesk", value: "space-grotesk" },
  { title: "Outfit", value: "outfit" },
  { title: "Manrope", value: "manrope" },
  { title: "Cormorant Garamond", value: "cormorant" },
  { title: "Playfair Display", value: "playfair-display" },
  { title: "Merriweather", value: "merriweather" },
  { title: "Lora", value: "lora" },
  { title: "Source Serif 4", value: "source-serif-4" },
  { title: "Libre Baskerville", value: "libre-baskerville" },
];

const fontWeightChoices = [
  { title: "Light", value: "300" },
  { title: "Regular", value: "400" },
  { title: "Medium", value: "500" },
  { title: "Semi Bold", value: "600" },
  { title: "Bold", value: "700" },
  { title: "Extra Bold", value: "800" },
  { title: "Black", value: "900" },
];

const fontStyleChoices = [
  { title: "Normal", value: "normal" },
  { title: "Italic", value: "italic" },
];

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
    defineField({
      name: "navVideo",
      title: "Show \"Video\" in the bottom nav",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "navWriting",
      title: "Show \"Writing\" in the bottom nav",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "navPhoto",
      title: "Show \"Photo\" in the bottom nav",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "bodyFont",
      title: "Body text font",
      type: "string",
      options: { list: fontChoices },
    }),
    defineField({
      name: "bodyFontWeight",
      title: "Body text weight",
      type: "string",
      options: { list: fontWeightChoices },
    }),
    defineField({
      name: "bodyFontStyle",
      title: "Body text style",
      type: "string",
      options: { list: fontStyleChoices },
    }),
    defineField({
      name: "titleFont",
      title: "Heading font",
      type: "string",
      options: { list: fontChoices },
    }),
    defineField({
      name: "titleFontWeight",
      title: "Heading weight",
      type: "string",
      options: { list: fontWeightChoices },
    }),
    defineField({
      name: "titleFontStyle",
      title: "Heading style",
      type: "string",
      options: { list: fontStyleChoices },
    }),
  ],
  preview: { select: { title: "name", subtitle: "headline", media: "headshot" } },
});

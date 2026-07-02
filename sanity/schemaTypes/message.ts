import { defineField, defineType } from "sanity";

export const message = defineType({
  name: "message",
  title: "Message",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "email", title: "Email", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subject", title: "Subject", type: "string" }),
    defineField({ name: "body", title: "Message", type: "text", validation: (r) => r.required() }),
    defineField({ name: "sentAt", title: "Sent At", type: "datetime" }),
    defineField({ name: "read", title: "Read", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { title: "name", subtitle: "body" },
  },
  orderings: [{ title: "Newest first", name: "sentAtDesc", by: [{ field: "sentAt", direction: "desc" }] }],
});

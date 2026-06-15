import type { StructureResolver } from "sanity/structure";

// Profile is a singleton; everything else is a normal document list.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Profile / about")
        .id("profile")
        .child(S.document().schemaType("profile").documentId("profile")),
      S.divider(),
      S.documentTypeListItem("videoWork").title("Videos"),
      S.documentTypeListItem("article").title("Articles / blogs"),
      S.documentTypeListItem("photoStory").title("Photo stories"),
      S.divider(),
      S.documentTypeListItem("category").title("Categories"),
    ]);

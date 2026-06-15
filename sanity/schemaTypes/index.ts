import type { SchemaTypeDefinition } from "sanity";
import { category } from "./category";
import { videoWork } from "./videoWork";
import { article } from "./article";
import { photoStory } from "./photoStory";
import { profile } from "./profile";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [videoWork, article, photoStory, category, profile],
};

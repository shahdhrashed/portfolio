import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

/**
 * Server-only client with a write token. Used by the /admin API routes to
 * create, update and delete content. Never import this into client code —
 * the token must stay on the server.
 */
export const writeClient = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export const hasWriteToken = Boolean(process.env.SANITY_API_TOKEN);

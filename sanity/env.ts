export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/**
 * When no Sanity project is configured the site runs entirely on bundled
 * sample data, so it can be developed, demoed and deployed before Shahd
 * creates her CMS account. Setting NEXT_PUBLIC_SANITY_PROJECT_ID flips it
 * over to the live CMS with no code changes.
 */
export const isSanityConfigured = projectId.length > 0;

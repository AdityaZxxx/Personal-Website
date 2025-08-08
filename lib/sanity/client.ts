import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

// Client for read-only operations (e.g., fetching data for public display)
export const readClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for faster reads
});

// Client for write/update operations (e.g., updating view counts, form submissions)
// This client requires a token with write permissions.
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Do not use CDN for writes; ensure changes are immediately reflected
  token: process.env.SANITY_API_WRITE_TOKEN,
});

// Sanity client — used by all frontend pages for GROQ queries

import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "./config";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // `false` if you want to ensure fresh data
});

// Image URL builder — converts Sanity image references to CDN URLs
// Usage: urlFor(source).width(300).height(375).url()

import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

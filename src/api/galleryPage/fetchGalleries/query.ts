import { fetchSanity } from "../../../lib/api";
import { defineQuery } from "groq";
import type { GetGalleriesQueryResult } from "../../../../sanity.types";

const getGalleriesQuery = defineQuery(`
*[_type == "galleryFolder"] {
  _id,
  name,
  "slug": slug.current,
  coverImage,
  "latestImages": images | order(_key desc) [0...3]
}
`);

export async function fetchGalleries(): Promise<GetGalleriesQueryResult> {
  const result = await fetchSanity<GetGalleriesQueryResult>(getGalleriesQuery);
  return result;
}

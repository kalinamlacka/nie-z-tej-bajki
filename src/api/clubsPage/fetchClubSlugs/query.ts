import { defineQuery } from "groq";
import { fetchSanity } from "../../../lib/api";
import type { GetClubSlugsQueryResult } from "../../../../sanity.types";

const getClubSlugsQuery = defineQuery(`
*[_type == "club"] {
  "slug": slug.current,
}
`);

export async function fetchClubSlugs(): Promise<GetClubSlugsQueryResult> {
    const result = await fetchSanity<GetClubSlugsQueryResult>(getClubSlugsQuery);
    return result;
}

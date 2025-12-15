import { defineQuery } from "groq";
import { fetchSanity } from "../../..//lib/api";
import type { GetProjectSlugsQueryResult } from "../../../../sanity.types";

const getProjectSlugsQuery = defineQuery(`
*[_type == "post"] {
  "slug": slug.current,
}
`);

export async function fetchProjectSlugs(): Promise<GetProjectSlugsQueryResult> {
    const result = await fetchSanity<GetProjectSlugsQueryResult>(getProjectSlugsQuery);
    return result;
}

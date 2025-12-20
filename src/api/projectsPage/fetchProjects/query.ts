import { defineQuery } from "groq";
import { fetchSanity } from "../../..//lib/api";
import type { GetProjectsQueryResult } from "../../../../sanity.types";

const getProjectsQuery = defineQuery(`
*[_type == "post"] | order(date desc) {
  title,
  shortDescription,
  image {
    asset,
    alt
  },
  partner->{
    partnerImage {
      asset,
      alt
    },
    _id
  },
  date,
  "slug": slug.current,
}
`);

export async function fetchProjects(): Promise<GetProjectsQueryResult> {
    const result = await fetchSanity<GetProjectsQueryResult>(getProjectsQuery);
    return result;
}

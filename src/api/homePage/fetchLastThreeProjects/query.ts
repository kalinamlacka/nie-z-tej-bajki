import { fetchSanity } from "../../../lib/api";
import { defineQuery } from "groq";
import type { GetLastThreeProjectsQueryResult } from "../../../../sanity.types";

const getLastThreeProjectsQuery = defineQuery(`
*[_type == "post"] | order(date desc)[0...3] {
  _id,
  title,
  shortDescription,
  image {
    asset,
    alt
  },
  date,
  "slug": slug.current,
  partner->{
    name,
    partnerImage {
      asset,
      alt
    }
  }
}
`);

export async function fetchLastThreeProjects(): Promise<GetLastThreeProjectsQueryResult> {
  const result = await fetchSanity<GetLastThreeProjectsQueryResult>(getLastThreeProjectsQuery);
  return result;
}

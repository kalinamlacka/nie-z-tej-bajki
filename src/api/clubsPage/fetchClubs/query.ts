import { defineQuery } from "groq";
import { fetchSanity } from "../../../lib/api";
import type { GetClubsQueryResult } from "../../../../sanity.types";

const getClubsQuery = defineQuery(`
*[_type == "club"] | order(date desc) {
  title,
  shortDescription,
  partner->{
    partnerImage {
      asset,
      alt
    },
    _id
  },
  image {
    asset,
    alt
  },
  date,
  "slug": slug.current,
}
`);

export async function fetchClubs(): Promise<GetClubsQueryResult> {
    const result = await fetchSanity<GetClubsQueryResult>(getClubsQuery);
    return result;
}

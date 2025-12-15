import { defineQuery } from "groq";
import { fetchSanity } from "../../../lib/api";
import type { GetClubsQueryResult } from "../../../../sanity.types";

const getClubsQuery = defineQuery(`
*[_type == "club"] {
  title,
  shortDescription,
  partner->{
    partnerImage,
    _id
  },
  image,
  _createdAt,
  "slug": slug.current,
}
`);

export async function fetchClubs(): Promise<GetClubsQueryResult> {
    const result = await fetchSanity<GetClubsQueryResult>(getClubsQuery);
    return result;
}

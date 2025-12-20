import { defineQuery } from "groq";
import { fetchSanity } from "../../../lib/api";
import type { GetClubBySlugQueryResult } from "../../../../sanity.types";

const getClubBySlugQuery = defineQuery(`
*[_type == "club" && slug.current == $slug][0] {
  title,
  description,
  partner->{
    partnerImage {
      asset,
      alt
    }
  },
  image {
    asset,
    alt
  },
  _createdAt,
  "slug": slug.current,
  seo
}
`);

export async function fetchClub(slug: string): Promise<GetClubBySlugQueryResult> {
    const result = await fetchSanity<GetClubBySlugQueryResult>(getClubBySlugQuery, { slug });
    return result;
}

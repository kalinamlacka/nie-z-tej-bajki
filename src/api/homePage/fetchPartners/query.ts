import { fetchSanity } from "../../../lib/api";
import { defineQuery } from "groq";
import type { GetPartnersQueryResult } from "../../../../sanity.types";

const getPartnersQuery = defineQuery(`
*[_type == "partner"] {
  partnerImage
}
`);

export async function fetchPartners(): Promise<GetPartnersQueryResult> {
  const result = await fetchSanity<GetPartnersQueryResult>(getPartnersQuery);
  return result;
}

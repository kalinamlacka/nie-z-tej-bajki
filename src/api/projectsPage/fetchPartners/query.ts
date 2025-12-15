import { defineQuery } from "groq";
import { fetchSanity } from "../../..//lib/api";
import type { GetPartnersReferenceDataQueryResult } from "../../../../sanity.types";

const getPartnersReferenceDataQuery = defineQuery(`
*[_type == "partner"] {
  _id,
  name
}
`);

export async function fetchPartnersReferenceData(): Promise<GetPartnersReferenceDataQueryResult> {
    const result = await fetchSanity<GetPartnersReferenceDataQueryResult>(getPartnersReferenceDataQuery);

    return result;
}

import { fetchSanity } from "../../../lib/api";
import { defineQuery } from "groq";
import type { GetPersonnelImagesQueryResult } from "../../../../sanity.types";

const getPersonnelImagesQuery = defineQuery(`
*[_type == "structureSchoolPage"] {
  personnelImages[] {
    firstImage {
      asset,
      alt
    },
    secondImage {
      asset,
      alt
    },
    names[] {
      name,
      description
    }
  }
}
`);

export async function fetchPersonnelImages() {
    const result = await fetchSanity<GetPersonnelImagesQueryResult>(getPersonnelImagesQuery);

    if (!result || result.length === 0) {
        throw new Error("Personnel images are not defined in CMS");
    }

    return result[0];
}

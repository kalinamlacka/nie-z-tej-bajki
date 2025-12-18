import { defineQuery } from "groq";
import { fetchSanity } from "../../..//lib/api";
import type { GetProjectsQueryResult } from "../../../../sanity.types";

const getProjectsQuery = defineQuery(`
*[_type == "post"] {
  title,
  shortDescription,
  image,
  partner->{
    partnerImage,
    _id
  },
  _createdAt,
  "slug": slug.current,
}
`);

export async function fetchProjects(): Promise<GetProjectsQueryResult> {
    const result = await fetchSanity<GetProjectsQueryResult>(getProjectsQuery);
    return result;
}

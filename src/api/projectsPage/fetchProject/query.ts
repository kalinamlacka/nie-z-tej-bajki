import { defineQuery } from 'groq';
import { fetchSanity } from '../../..//lib/api';
import type { GetProjectQueryResult } from '../../../../sanity.types';

const getProjectQuery = defineQuery(`
*[_type == "post" && slug.current == $slug][0] {
  title,
  description,
  image {
    asset,
    alt
  },
  partner->{
    partnerImage {
      asset,
      alt
    }
  },
  _createdAt,
  "slug": slug.current,
  seo
}
`);

export async function fetchProject(slug: string): Promise<GetProjectQueryResult> {
  const result = await fetchSanity<GetProjectQueryResult>(getProjectQuery, { slug });

  if (!result) {
    throw new Error(`Project with slug "${slug}" not found`);
  }

  return result;
}

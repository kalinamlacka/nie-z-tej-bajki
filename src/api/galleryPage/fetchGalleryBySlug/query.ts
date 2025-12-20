import { fetchSanity } from '../../../lib/api';
import { defineQuery } from 'groq';
import type { GetGalleryBySlugQueryResult } from '../../../../sanity.types';

const getGalleryBySlugQuery = defineQuery(`
*[_type == "galleryFolder" && slug.current == $slug][0] {
  name,
  "slug": slug.current,
  coverImage {
    asset,
    alt
  },
  images[] {
    asset,
    alt
  },
  seo
}
`);

export async function fetchGalleryBySlug(slug: string): Promise<GetGalleryBySlugQueryResult> {
  const result = await fetchSanity<GetGalleryBySlugQueryResult>(getGalleryBySlugQuery, { slug });
  return result;
}

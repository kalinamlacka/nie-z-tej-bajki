import { fetchSanity } from "../../../lib/api";
import { defineQuery } from "groq";
import type { GetFilesToDownloadQueryResult } from "../../../../sanity.types";

const getFilesToDownloadQuery = defineQuery(`
*[_type == "structureSchoolPage"] {
  filesToDownload[] {
    fileName,
    "downloadUrl": asset->url
  }
}
`);

export async function fetchFilesToDownload() {
    const result = await fetchSanity<GetFilesToDownloadQueryResult>(getFilesToDownloadQuery);

    if (!result || result.length === 0) {
        throw new Error("Files to download are not defined in CMS");
    }

    return result[0];
}

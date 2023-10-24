import { APICommonPayload } from "../../common";

/**
 * /apps/{app_id}/files/list
 */

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/filemanager/list
 */
export interface APIFile {
  type: string;
  name: string;
  size: number;
  lastModified: number;
}

export type APIFileListPayload = APICommonPayload<APIFile[]>;

/**
 * /apps/{app_id}/files/read
 */

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/filemanager/read
 */
export interface APIBufferFile {
  type: string;
  data: number[];
}

export type APIFileReadPayload = APICommonPayload<APIBufferFile>;

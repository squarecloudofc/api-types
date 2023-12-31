import { APIPayload } from "../../common";

/**
 * [type] https://docs.squarecloud.app/api-reference/endpoint/apps/filemanager/list
 */
export enum FileType {
  File = "file",
  Directory = "directory",
}

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/filemanager/list
 */
export interface APIListedFile {
  type: FileType;
  name: string;
  size: number;
  lastModified: number;
}

export type APIFileListPayload = APIPayload<APIListedFile[]>;

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/filemanager/read
 */
export interface APIReadFile {
  type: string;
  data: number[];
}

export type APIFileReadPayload = APIPayload<APIReadFile>;

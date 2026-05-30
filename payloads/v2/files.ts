import type { APIPayload, ISODateString } from "../../common/v2";

/**
 * APIListedFile#type
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/list
 */
export type FileType = "file" | "directory";
export const FileType = {
	File: "file",
	Directory: "directory",
} as const;

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/list
 */
export interface APIListedFile {
	type: FileType;
	name: string;
	size: number;
	lastModified: ISODateString;
}

export type APIFileListPayload = APIPayload<APIListedFile[]>;

/**
 * File content returned by `GET /v2/apps/{appId}/files/content` as a Node-style
 * Buffer object — `data` is the raw byte array.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/read
 */
export interface APIReadFile {
	type: "Buffer";
	data: number[];
}

export type APIFileReadPayload = APIPayload<APIReadFile>;

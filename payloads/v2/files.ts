import type { APIPayload } from "../../common/v2";

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
	/** Size in bytes. `0` for directories. */
	size: number;
	/** Last-modified time as a Unix timestamp in milliseconds. */
	lastModified: number;
}

export type APIFileListPayload = APIPayload<APIListedFile[]>;

/**
 * File content returned by `GET /v2/apps/{appId}/files/content` as a Node-style
 * Buffer object — `data` is the raw byte array. Files too large for the file
 * manager are rejected with `413 FILE_TOO_LARGE`.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/read
 */
export interface APIReadFile {
	type: "Buffer";
	data: number[];
}

export type APIFileReadPayload = APIPayload<APIReadFile>;

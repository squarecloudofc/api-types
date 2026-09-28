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
	/** File or directory name (no path component). */
	name: string;
	/** Size in bytes. `0` for directories. */
	size: number;
	/**
	 * Last-modified time as a Unix timestamp in milliseconds (may carry a
	 * fractional part). `null` when the entry could not be read.
	 */
	lastModified: number | null;
}

export type APIFileListPayload = APIPayload<APIListedFile[]>;

/**
 * File content returned by `GET /v2/apps/{appId}/files/content?encoding=base64`.
 * Files over 10 MB are rejected with `413 FILE_TOO_LARGE`.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/read
 */
export interface APIReadFileBase64 {
	encoding: "base64";
	/** The file's bytes, base64-encoded. */
	data: string;
}

/**
 * Payload of `GET /v2/apps/{appId}/files/content?encoding=base64`.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/read
 */
export type APIFileReadPayload = APIPayload<APIReadFileBase64>;

import type { APIPayload } from "../../common/v2";

/**
 * APIListedFile#type
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/filemanager/list
 */
export enum FileType {
	File = "file",
	Directory = "directory",
}

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/filemanager/list
 */
export interface APIListedFile {
	type: FileType;
	name: string;
	size: number;
	lastModified: number;
}

export type APIFileListPayload = APIPayload<APIListedFile[]>;

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/filemanager/read
 */
export interface APIReadFile {
	type: string;
	data: number[];
}

export type APIFileReadPayload = APIPayload<APIReadFile>;

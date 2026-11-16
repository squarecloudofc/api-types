import type { APIPayload } from "../../common/v2";

/**
 * Whether a file manager entry is a file or a directory.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/list
 */
export type FileType = "file" | "directory";
/** The {@link FileType} values by name. */
export const FileType = {
	File: "file",
	Directory: "directory",
} as const;

/**
 * One file or directory in an application's file listing.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/list
 */
export interface APIListedFile {
	type: FileType;
	/** The file or directory name, without its path. */
	name: string;
	/** The size in bytes. It is `0` for a directory. */
	size: number;
	/**
	 * When the entry last changed, as a Unix timestamp in milliseconds that
	 * may have a fractional part. It is `null` when the entry could not be
	 * read.
	 */
	lastModified: number | null;
}

/** The response envelope that carries a list of {@link APIListedFile}. */
export type APIFileListPayload = APIPayload<APIListedFile[]>;

/**
 * A file read from an application, base64-encoded. The file manager reads
 * files of up to 10 MB, and a larger file is rejected with 413
 * `FILE_TOO_LARGE`.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/read
 */
export interface APIReadFileBase64 {
	encoding: "base64";
	/** The file's bytes, base64-encoded. */
	data: string;
}

/** The response envelope that carries an {@link APIReadFileBase64}. */
export type APIFileReadPayload = APIPayload<APIReadFileBase64>;

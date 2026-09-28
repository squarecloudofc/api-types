import type { APIPayloadStatusOnly } from "../../common/v2";

/**
 * Query for `GET /v2/apps/{appId}/files/content`. The file comes base64-encoded
 * (`APIFileReadPayload`).
 *
 * Errors: `400 INVALID_ENCODING` (unsupported `encoding`), `404 FILE_NOT_FOUND`,
 * `413 FILE_TOO_LARGE` (over 10 MB).
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/content
 */
export interface RESTGetAPIFileContentQuery {
	/** Absolute path to the file, at most 256 chars. */
	path: string;
	encoding: "base64";
}

/**
 * Query for the file listing. `path` defaults to `/` when omitted. A missing
 * directory is `404 FILE_NOT_FOUND`; a platform-managed path is
 * `403 BLOCKED_PATH`.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/list
 */
export interface RESTGetAPIFilesListQuery {
	/** Directory to list, at most 256 chars. */
	path?: string;
}

/**
 * Body for `PUT /v2/apps/{appId}/files`. Send the file base64-encoded with
 * `encoding: "base64"`; text may also go as a plain UTF-8 string. Empty
 * content creates an empty file.
 *
 * Errors: `400 INVALID_CONTENT` (invalid base64), `403 BLOCKED_PATH`,
 * `413 FILE_TOO_LARGE` (over 10 MB).
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/put
 */
export interface RESTPutAPIFileUpsertJSONBody {
	/** Absolute path to write, at most 256 chars. */
	path: string;
	/** The file base64-encoded when `encoding` is `base64`, otherwise UTF-8 text. */
	content: string;
	/** Set to `base64` when `content` is the file base64-encoded. */
	encoding?: "base64";
}

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/put
 */
export type RESTPutAPIFileUpsertResultPayload = APIPayloadStatusOnly;

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/patch
 */
export interface RESTPatchAPIFileMoveJSONBody {
	/** Absolute path of the source file. */
	path: string;
	/** Absolute path of the destination file. */
	to: string;
}

export type RESTPatchAPIFileMoveResultPayload = APIPayloadStatusOnly;

/**
 * Body for `DELETE /v2/apps/{appId}/files`.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/delete
 */
export interface RESTDeleteAPIFileDeleteJSONBody {
	/** Absolute path of the file to delete. */
	path: string;
}

export type RESTDeleteAPIFileDeleteResultPayload = APIPayloadStatusOnly;

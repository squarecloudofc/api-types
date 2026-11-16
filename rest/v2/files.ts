import type { APIPayloadStatusOnly } from "../../common/v2";

/**
 * Query of `GET /v2/apps/{appId}/files/content`, which reads a file of up to
 * 10 MB and returns it base64-encoded as an `APIFileReadPayload`.
 *
 * A file over 10 MB fails with 413 `FILE_TOO_LARGE`, a missing file with 404
 * `FILE_NOT_FOUND`, and an `encoding` other than `base64` with 400
 * `INVALID_ENCODING`.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/content
 */
export interface RESTGetAPIFileContentQuery {
	/** The absolute path of the file. */
	path: string;
	/** Always `base64`, which returns the file as a base64 string. */
	encoding: "base64";
}

/**
 * Query of `GET /v2/apps/{appId}/files`, which lists a directory. A missing
 * directory fails with 404 `FILE_NOT_FOUND`, and a directory the file
 * manager does not expose fails with 403 `BLOCKED_PATH`.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/list
 */
export interface RESTGetAPIFilesListQuery {
	/** The directory to list. It defaults to `/`, the application root. */
	path?: string;
}

/**
 * Body of `PUT /v2/apps/{appId}/files`, which creates or replaces a file of
 * up to 10 MB.
 *
 * Send a binary file base64-encoded with `encoding: "base64"`, or send text
 * as a plain UTF-8 string. Empty content writes an empty file. Writing
 * `squarecloud.app` or `squarecloud.config` also applies its settings, such
 * as the display name, memory and subdomain, and checks them against your
 * plan. You can write up to 10 times every 5 seconds, and change the
 * configuration file once every 15 seconds.
 *
 * Invalid base64 fails with 400 `INVALID_CONTENT`, a blocked path with 403
 * `BLOCKED_PATH`, and a body that is too large with 413 `PAYLOAD_TOO_LARGE`.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/put
 */
export interface RESTPutAPIFileUpsertJSONBody {
	/** The absolute path to write. */
	path: string;
	/** The file base64-encoded when `encoding` is `base64`, or UTF-8 text otherwise. */
	content: string;
	/** Set to `base64` when `content` is the file base64-encoded. */
	encoding?: "base64";
}

/**
 * Response of `PUT /v2/apps/{appId}/files`.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/put
 */
export type RESTPutAPIFileUpsertResultPayload = APIPayloadStatusOnly;

/**
 * Body of `PATCH /v2/apps/{appId}/files`, which renames or moves a file. The
 * two paths must be valid and different.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/patch
 */
export interface RESTPatchAPIFileMoveJSONBody {
	/** The absolute path of the file to move. */
	path: string;
	/** The absolute path to move the file to. */
	to: string;
}

/** Response of `PATCH /v2/apps/{appId}/files`. */
export type RESTPatchAPIFileMoveResultPayload = APIPayloadStatusOnly;

/**
 * Body of `DELETE /v2/apps/{appId}/files`, which deletes a file.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/delete
 */
export interface RESTDeleteAPIFileDeleteJSONBody {
	/** The absolute path of the file to delete. */
	path: string;
}

/** Response of `DELETE /v2/apps/{appId}/files`. */
export type RESTDeleteAPIFileDeleteResultPayload = APIPayloadStatusOnly;

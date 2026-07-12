import type { APIPayload, APIPayloadStatusOnly } from "../../common/v2";
import type { APIReadFile } from "../../payloads/v2/files";

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/content
 */
export interface RESTGetAPIFileContentQuery {
	path: string;
}

/**
 * Query for the file listing. `path` defaults to `/` when omitted.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/list
 */
export interface RESTGetAPIFilesListQuery {
	path?: string;
}

/**
 * Body for `PUT /v2/apps/{appId}/files`. `content` accepts either a UTF-8
 * string (text files) or a Node-style Buffer JSON object (binary files).
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/put
 */
export interface RESTPutAPIFileUpsertJSONBody {
	path: string;
	content: string | APIReadFile;
}

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/put
 */
export interface RESTPutAPIFileUpsertResult {
	written: boolean;
}

export type RESTPutAPIFileUpsertResultPayload =
	APIPayload<RESTPutAPIFileUpsertResult>;

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/patch
 */
export interface RESTPatchAPIFileMoveJSONBody {
	path: string;
	to: string;
}

export type RESTPatchAPIFileMoveResultPayload = APIPayloadStatusOnly;

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/filemanager/delete
 */
export interface RESTDeleteAPIFileDeleteQuery {
	path: string;
}

export type RESTDeleteAPIFileDeleteResultPayload = APIPayloadStatusOnly;

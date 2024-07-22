import type { APIPayloadStatusOnly } from "../../common/v2";

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/filemanager/content
 */
export interface RESTGetAPIFileContentQuery {
	path: string;
}

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/filemanager/list
 */
export interface RESTGetAPIFilesListQuery {
	path: string;
}

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/filemanager/put
 */
export interface RESTPutAPIFileUpsertJSONBody {
	path: string;
	content: string;
}

export type RESTPutAPIFileUpsertResultPayload = APIPayloadStatusOnly;

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/filemanager/patch
 */
export interface RESTPatchAPIFileMoveJSONBody {
	path: string;
	to: string;
}

export type RESTPatchAPIFileMoveResultPayload = APIPayloadStatusOnly;

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/filemanager/delete
 */
export interface RESTDeleteAPIFileDeleteQuery {
	path: string;
}

export type RESTDeleteAPIFileDeleteResultPayload = APIPayloadStatusOnly;

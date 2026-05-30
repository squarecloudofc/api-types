import type {
	APIPayload,
	APIPayloadStatusOnly,
	ApplicationId,
	WorkspaceId,
} from "../../common/v2";
import type { ApplicationLanguage } from "../../payloads/v2";

/**
 * Query for `GET /v2/apps/status` — optionally limit the listing to
 * applications shared in a workspace.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/status-all
 */
export interface RESTGetAPIApplicationStatusAllQuery {
	workspaceId?: WorkspaceId;
}

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/start
 */
export type RESTPostAPIApplicationStartResultPayload = APIPayloadStatusOnly;

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/restart
 */
export type RESTPostAPIApplicationRestartResultPayload = APIPayloadStatusOnly;

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/stop
 */
export type RESTPostAPIApplicationStopResultPayload = APIPayloadStatusOnly;

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/commit
 */
export interface RESTPostAPIApplicationCommitFormDataBody {
	file: unknown;
}

export type RESTPostAPIApplicationCommitResultPayload = APIPayloadStatusOnly;

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/delete
 */
export type RESTDeleteAPIApplicationDeleteResultPayload = APIPayloadStatusOnly;

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/upload
 */
export interface RESTPostAPIApplicationUploadFormDataBody {
	file: unknown;
}

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/upload
 */
export interface RESTPostAPIApplicationUploadResult {
	id: ApplicationId;
	name: string;
	lang: ApplicationLanguage;
	/** Allocated memory in MB. */
	ram: number;
}

export type RESTPostAPIApplicationUploadResultPayload =
	APIPayload<RESTPostAPIApplicationUploadResult>;

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
 * Query for `GET /v2/apps/{appId}/status` (and the database equivalent) —
 * pass `rawData=true` to receive raw numbers instead of formatted strings
 * (type the response with `APIApplicationStatus<true>`).
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/status
 */
export interface RESTGetAPIApplicationStatusQuery {
	rawData?: "true" | "false";
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

/**
 * Query for `POST /v2/apps/{appId}/commit` — optional destination directory
 * inside the application (no traversal, no shell metacharacters).
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/commit
 */
export interface RESTPostAPIApplicationCommitQuery {
	path?: string;
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
 * Runtime detected for an uploaded application.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/upload
 */
export interface RESTPostAPIApplicationUploadLanguage {
	name: ApplicationLanguage;
	/** Detected runtime version (e.g. `22`, `3.12`). */
	version: string;
}

/**
 * Response of `POST /v2/apps`. `description` and `subdomain` are present only
 * when set in `squarecloud.config`. Client-side upload aborts surface as the
 * `UPLOAD_ABORTED` error code.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/upload
 */
export interface RESTPostAPIApplicationUploadResult {
	id: ApplicationId;
	name: string;
	/** Optional description (from `DESCRIPTION` in `squarecloud.config`). Omitted when unset. */
	description?: string;
	/** Optional `<subdomain>.squareweb.app` host (from `SUBDOMAIN` in `squarecloud.config`). Omitted for non-web apps. */
	subdomain?: string;
	/** Allocated memory in MB. */
	ram: number;
	/** Allocated CPU shares. */
	cpu: number;
	/** Detected runtime. */
	language: RESTPostAPIApplicationUploadLanguage;
}

export type RESTPostAPIApplicationUploadResultPayload =
	APIPayload<RESTPostAPIApplicationUploadResult>;

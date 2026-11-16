import type {
	APIPayload,
	APIPayloadStatusOnly,
	ApplicationId,
	WorkspaceId,
} from "../../common/v2";
import type { ApplicationLanguage } from "../../payloads/v2";

/**
 * Query of `GET /v2/apps/status`, which lists the runtime stats of every
 * application you own. You can call it up to 15 times a minute.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/status-all
 */
export interface RESTGetAPIApplicationStatusAllQuery {
	/** Limits the listing to the applications shared with this workspace. */
	workspaceId?: WorkspaceId;
}

/**
 * Query of `GET /v2/apps/{appId}/status` and of the database equivalent.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/status
 */
export interface RESTGetAPIApplicationStatusQuery {
	/**
	 * `true` returns numbers instead of formatted strings. Type the response
	 * as `APIApplicationStatus<true>` when you send it.
	 */
	rawData?: "true" | "false";
}

/**
 * Response of `POST /v2/apps/{appId}/start`.
 *
 * A start that fails answers 409 with a `code` and no `message`, such as
 * `CONTAINER_ALREADY_STARTED`, `RESTORE_IN_PROGRESS` or `ACTION_FAILED`. You
 * can start an application once every 3 seconds.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/start
 */
export type RESTPostAPIApplicationStartResultPayload = APIPayloadStatusOnly;

/**
 * Response of `POST /v2/apps/{appId}/restart`.
 *
 * A restart that fails answers 409 with a `code` and no `message`, such as
 * `RESTORE_IN_PROGRESS` or `ACTION_FAILED`. A restart can also fail later,
 * when the application does not come back up, so check its status and logs
 * afterward. You can restart an application once every 3 seconds.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/restart
 */
export type RESTPostAPIApplicationRestartResultPayload = APIPayloadStatusOnly;

/**
 * Response of `POST /v2/apps/{appId}/stop`.
 *
 * A stop that fails answers 409 with a `code` and no `message`, such as
 * `CONTAINER_ALREADY_STOPPED`, `RESTORE_IN_PROGRESS` or `ACTION_FAILED`. You
 * can stop an application once every 3 seconds.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/stop
 */
export type RESTPostAPIApplicationStopResultPayload = APIPayloadStatusOnly;

/**
 * Form data of `POST /v2/apps/{appId}/commit`, sent as
 * `multipart/form-data`.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/commit
 */
export interface RESTPostAPIApplicationCommitFormDataBody {
	/**
	 * The file to commit, up to 100 MB. A zip archive is unpacked at the
	 * destination, and any other file is placed there as is.
	 */
	file: unknown;
}

/**
 * Query of `POST /v2/apps/{appId}/commit`.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/commit
 */
export interface RESTPostAPIApplicationCommitQuery {
	/**
	 * The destination directory inside the application. It cannot leave the
	 * application or hold invalid characters.
	 */
	path?: string;
}

/**
 * Response of `POST /v2/apps/{appId}/commit`. You can commit once every 2
 * seconds, and once every 5 seconds to the same application.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/commit
 */
export type RESTPostAPIApplicationCommitResultPayload = APIPayloadStatusOnly;

/**
 * Response of `DELETE /v2/apps/{appId}`. While a snapshot restore runs, the
 * delete fails with 409 `RESTORE_IN_PROGRESS` and nothing is deleted.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/delete
 */
export type RESTDeleteAPIApplicationDeleteResultPayload = APIPayloadStatusOnly;

/**
 * Form data of `POST /v2/apps`, sent as `multipart/form-data`.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/upload
 */
export interface RESTPostAPIApplicationUploadFormDataBody {
	/** The zip archive with the application's source, up to 100 MB. */
	file: unknown;
}

/**
 * The runtime detected for an uploaded application.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/upload
 */
export interface RESTPostAPIApplicationUploadLanguage {
	name: ApplicationLanguage;
	/**
	 * The `VERSION` from `squarecloud.config`, in lowercase: `recommended` or
	 * a pinned version such as `22` or `3.12`.
	 */
	version: string;
}

/**
 * The new application, part of the response of `POST /v2/apps`, which
 * uploads a zip archive and starts it.
 *
 * Your plan needs at least 256 MB of free memory, and you can upload once
 * every 3 seconds. An interrupted upload fails with 400 `UPLOAD_ABORTED`.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/upload
 */
export interface RESTPostAPIApplicationUploadResult {
	id: ApplicationId;
	/** The display name, from `DISPLAY_NAME` in `squarecloud.config`. */
	name: string;
	/** The description, from `DESCRIPTION` in `squarecloud.config`. It is omitted when not set. */
	description?: string;
	/**
	 * The full `<subdomain>.squareweb.app` hostname, from `SUBDOMAIN` in
	 * `squarecloud.config`. It is omitted for an application that is not a
	 * website.
	 */
	domain?: string;
	/** The cluster the application was deployed to, such as `example-cluster`. */
	cluster?: string;
	/** The memory allocated to the application, in MB. */
	ram: number;
	/** The CPU shares allocated to the application. */
	cpu: number;
	language: RESTPostAPIApplicationUploadLanguage;
}

/** Response of `POST /v2/apps`. */
export type RESTPostAPIApplicationUploadResultPayload =
	APIPayload<RESTPostAPIApplicationUploadResult>;

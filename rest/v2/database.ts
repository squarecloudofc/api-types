import type { APIPayloadStatusOnly } from "../../common/v2";
import type {
	DatabaseResetType,
	DatabaseType,
} from "../../payloads/v2/database";

/**
 * Body of `POST /v2/databases`, which creates a database.
 *
 * Databases are available on the Standard, Pro and Enterprise plans, and you
 * can create one every 3 seconds.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/create
 */
export interface RESTPostAPIDatabaseJSONBody {
	/** The display name, 1 to 32 letters, numbers, spaces, hyphens or underscores. */
	name: string;
	/**
	 * The memory to allocate, as a whole number of MB. A fraction fails with
	 * 400 `INVALID_MEMORY`, and more than your plan has free fails with 400
	 * `INSUFFICIENT_MEMORY`. It must also meet the engine's minimum.
	 */
	memory: number;
	type: DatabaseType;
	/**
	 * A version the chosen engine supports, either the full version or a
	 * major or minor prefix such as `"8"`. See the Square Cloud docs for the
	 * versions each engine accepts.
	 */
	version: string;
}

/**
 * Body of `PATCH /v2/databases/{databaseId}`, which renames a database or
 * changes its memory. Send at least one field, or the update fails with 400
 * `NO_UPDATE_DATA`.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/update
 */
export interface RESTPatchAPIDatabaseJSONBody {
	/** The new display name, 1 to 32 letters, numbers, spaces, hyphens or underscores. */
	name?: string;
	/** The new memory, as a whole number of MB. A fraction fails with 400 `INVALID_MEMORY`. */
	ram?: number;
}

/**
 * Body of `POST /v2/databases/{databaseId}/credentials/reset`, which rotates
 * the password or the TLS certificate of a running database.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/credentials/reset
 */
export interface RESTPostAPIDatabaseCredentialsResetJSONBody {
	/** The credential to rotate. */
	reset: DatabaseResetType;
}

/**
 * Response of `POST /v2/databases/{databaseId}/start`. A start that fails
 * answers 409 with a `code` such as `CONTAINER_ALREADY_STARTED`,
 * `RESTORE_IN_PROGRESS` or `ACTION_FAILED`.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/start
 */
export type RESTPostAPIDatabaseStartResultPayload = APIPayloadStatusOnly;

/**
 * Response of `POST /v2/databases/{databaseId}/stop`. A stop that fails
 * answers 409 with a `code` such as `CONTAINER_ALREADY_STOPPED`,
 * `RESTORE_IN_PROGRESS` or `ACTION_FAILED`.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/stop
 */
export type RESTPostAPIDatabaseStopResultPayload = APIPayloadStatusOnly;

/**
 * Response of `DELETE /v2/databases/{databaseId}`. While a snapshot restore
 * runs, the delete fails with 409 `RESTORE_IN_PROGRESS` and nothing is
 * deleted.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/delete
 */
export type RESTDeleteAPIDatabaseResultPayload = APIPayloadStatusOnly;

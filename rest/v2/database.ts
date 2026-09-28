import type { APIPayloadStatusOnly } from "../../common/v2";
import type {
	DatabaseResetType,
	DatabaseType,
} from "../../payloads/v2/database";

/**
 * Body for `POST /v2/databases`.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/create
 */
export interface RESTPostAPIDatabaseJSONBody {
	/** Display name, 1-32 chars (letters, numbers, space, hyphen, underscore). */
	name: string;
	/**
	 * Allocated memory in MB, as an integer (otherwise `400 INVALID_MEMORY`).
	 * More than the plan has free is `400 INSUFFICIENT_MEMORY`.
	 */
	memory: number;
	type: DatabaseType;
	/**
	 * Version supported for the chosen `type`: the full version key or a
	 * major/minor prefix (e.g. `"8"`). See the Square Cloud docs for the
	 * current list of accepted versions per engine.
	 */
	version: string;
}

/**
 * Body for `PATCH /v2/databases/{databaseId}`. At least one field must be present.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/update
 */
export interface RESTPatchAPIDatabaseJSONBody {
	/** Display name, 1-32 chars. */
	name?: string;
	/** Allocated memory in MB, as an integer (otherwise `400 INVALID_MEMORY`). */
	ram?: number;
}

/**
 * Body for `POST /v2/databases/{databaseId}/credentials/reset`.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/credentials/reset
 */
export interface RESTPostAPIDatabaseCredentialsResetJSONBody {
	reset: DatabaseResetType;
}

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/start
 */
export type RESTPostAPIDatabaseStartResultPayload = APIPayloadStatusOnly;

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/stop
 */
export type RESTPostAPIDatabaseStopResultPayload = APIPayloadStatusOnly;

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/delete
 */
export type RESTDeleteAPIDatabaseResultPayload = APIPayloadStatusOnly;

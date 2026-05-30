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
	/** Display name, 1-32 chars. */
	name: string;
	/** Allocated memory in MB. */
	memory: number;
	type: DatabaseType;
	/**
	 * Version key supported for the chosen `type`. See the Square Cloud docs
	 * for the current list of accepted versions per engine.
	 */
	version: string;
}

/**
 * Body for `PATCH /v2/databases/{databaseId}`. At least one field must be present.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/update
 */
export interface RESTPatchAPIDatabaseJSONBody {
	name?: string;
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

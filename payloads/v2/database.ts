import type {
	APIPayload,
	DatabaseId,
	ISODateString,
	RuntimeStatsListItem,
	UserId,
} from "../../common/v2";
import type { APIApplicationStatus } from "./status";

/**
 * Database engine slug.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/info
 */
export type DatabaseType = "mongo" | "mysql" | "redis" | "postgres";
export const DatabaseType = {
	Mongo: "mongo",
	MySQL: "mysql",
	Redis: "redis",
	Postgres: "postgres",
} as const;

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/info
 */
export interface APIDatabase {
	id: DatabaseId;
	name: string;
	owner: UserId;
	cluster: string;
	ram: number;
	type: DatabaseType;
	port: number;
	created_at: ISODateString;
}

export type APIDatabasePayload = APIPayload<APIDatabase>;

/**
 * Compact database descriptor returned under `response.databases` of
 * `/v2/users/me`. `type` is the engine slug as a plain string.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/me
 */
export interface APIDatabaseSummary {
	id: DatabaseId;
	name: string;
	ram: number;
	type: string;
	cluster: string;
	created_at: ISODateString;
}

/**
 * Response of `POST /v2/databases`. `password` (and `certificate` when
 * applicable) are returned only at creation and cannot be recovered later.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/create
 */
export interface APIDatabaseCreated {
	id: DatabaseId;
	name: string;
	/** Allocated memory in MB. */
	memory: number;
	/** Allocated CPU shares. */
	cpu: number;
	type: DatabaseType;
	/** One-time database password. Shown only at creation. */
	password: string;
	/** Base64-encoded PEM TLS certificate. Returned only when applicable. */
	certificate?: string;
	/** Ready-to-use connection string with the password embedded. */
	connection_url: string;
	cluster: string;
}

export type APIDatabaseCreatedPayload = APIPayload<APIDatabaseCreated>;

/**
 * Runtime stats for a single database (`GET /v2/databases/{databaseId}/status`).
 * Shares the `RuntimeStats` shape with `APIApplicationStatus`.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/status
 */
export type APIDatabaseStatus = APIApplicationStatus;

export type APIDatabaseStatusPayload = APIPayload<APIDatabaseStatus>;

/**
 * Compact runtime stats entry for `/v2/databases/status`. Same shape as the
 * application list item, branded with `DatabaseId`.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/status-all
 */
export type APIDatabaseStatusListItem<Running extends boolean = boolean> =
	RuntimeStatsListItem<DatabaseId, Running>;

export type APIDatabaseStatusListPayload = APIPayload<
	APIDatabaseStatusListItem[]
>;

/**
 * Response of `GET /v2/databases/{databaseId}/credentials/certificate`.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/credentials/certificate
 */
export interface APIDatabaseCertificate {
	/** Base64-encoded PEM certificate. */
	certificate: string;
}

export type APIDatabaseCertificatePayload = APIPayload<APIDatabaseCertificate>;

/**
 * Which credential to rotate via `POST /credentials/reset`.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/credentials/reset
 */
export type DatabaseResetType = "password" | "certificate";
export const DatabaseResetType = {
	Password: "password",
	Certificate: "certificate",
} as const;

/**
 * Response body present when `reset: "password"`. Absent for
 * `reset: "certificate"`, which returns a status-only payload.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/credentials/reset
 */
export interface APIDatabaseCredentialsResetPasswordResponse {
	/** Shown only once for password resets. */
	password: string;
}

export type APIDatabaseCredentialsResetPasswordPayload =
	APIPayload<APIDatabaseCredentialsResetPasswordResponse>;

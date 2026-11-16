import type {
	APIPayload,
	DatabaseId,
	ISODateString,
	RuntimeStatsListItem,
	UserId,
} from "../../common/v2";
import type { APIApplicationStatus } from "./status";

/**
 * The engine of a database: MongoDB, MySQL, Redis or PostgreSQL.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/info
 */
export type DatabaseType = "mongo" | "mysql" | "redis" | "postgres";
/** The {@link DatabaseType} values by name. */
export const DatabaseType = {
	Mongo: "mongo",
	MySQL: "mysql",
	Redis: "redis",
	Postgres: "postgres",
} as const;

/**
 * The details of one database: its name, owner, memory, engine and port.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/info
 */
export interface APIDatabase {
	id: DatabaseId;
	/** The display name. */
	name: string;
	/** The user id of the database's owner. */
	owner: UserId;
	/** The cluster that hosts the database. */
	cluster: string;
	/** The memory allocated to the database, in MB. */
	ram: number;
	type: DatabaseType;
	/** The TCP port the database listens on. */
	port: number;
	/** When the database was created. */
	created_at: ISODateString;
}

/** The response envelope that carries an {@link APIDatabase}. */
export type APIDatabasePayload = APIPayload<APIDatabase>;

/**
 * A short description of one of your databases, as listed in your account
 * details.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/me
 */
export interface APIDatabaseSummary {
	id: DatabaseId;
	/** The display name. */
	name: string;
	/** The memory allocated to the database, in MB. */
	ram: number;
	/** The engine, such as `postgres`, as a plain string. */
	type: string;
	/** The cluster that hosts the database. */
	cluster: string;
	/** When the database was created. */
	created_at: ISODateString;
}

/**
 * The new database, returned when you create one.
 *
 * The API shows `password` and `certificate` only in this response and
 * cannot show them again, so store them right away.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/create
 */
export interface APIDatabaseCreated {
	id: DatabaseId;
	/** The display name. */
	name: string;
	/** The memory allocated to the database, in MB. */
	memory: number;
	/** The CPU shares allocated to the database. */
	cpu: number;
	type: DatabaseType;
	/** The database password. It is shown only once. */
	password: string;
	/**
	 * The TLS file for encrypted connections, base64-encoded: a PEM that
	 * holds the private key followed by the certificate. It is `null` when
	 * the certificate could not be produced at creation.
	 */
	certificate?: string | null;
	/**
	 * A ready-to-use connection string with the password included. Its scheme
	 * follows the engine: `mongodb://`, `postgresql://`, `mysql://`, or
	 * `rediss://` for Redis, which requires TLS.
	 */
	connection_url: string;
	/** The cluster that hosts the database. */
	cluster: string;
}

/** The response envelope that carries an {@link APIDatabaseCreated}. */
export type APIDatabaseCreatedPayload = APIPayload<APIDatabaseCreated>;

/**
 * The current CPU, memory, network and storage usage of one database. It has
 * the same shape as {@link APIApplicationStatus}, and `Raw` works the same
 * way.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/status
 */
export type APIDatabaseStatus<Raw extends boolean = false> =
	APIApplicationStatus<Raw>;

/** The response envelope that carries an {@link APIDatabaseStatus}. */
export type APIDatabaseStatusPayload<Raw extends boolean = false> = APIPayload<
	APIDatabaseStatus<Raw>
>;

/**
 * One entry of the runtime stats listing of every database you own. It is
 * the application entry branded with a {@link DatabaseId}.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/status-all
 */
export type APIDatabaseStatusListItem<Running extends boolean = boolean> =
	RuntimeStatsListItem<DatabaseId, Running>;

/** The response envelope that carries a list of {@link APIDatabaseStatusListItem}. */
export type APIDatabaseStatusListPayload = APIPayload<
	APIDatabaseStatusListItem[]
>;

/**
 * The TLS file of a database. The database must be running to read it.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/credentials/certificate
 */
export interface APIDatabaseCertificate {
	/** A base64-encoded PEM that holds the private key followed by the certificate. */
	certificate: string;
}

/** The response envelope that carries an {@link APIDatabaseCertificate}. */
export type APIDatabaseCertificatePayload = APIPayload<APIDatabaseCertificate>;

/**
 * The credential a reset rotates: the database password or its TLS
 * certificate.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/credentials/reset
 */
export type DatabaseResetType = "password" | "certificate";
/** The {@link DatabaseResetType} values by name. */
export const DatabaseResetType = {
	Password: "password",
	Certificate: "certificate",
} as const;

/**
 * The new password, returned when you reset the password of a database. A
 * certificate reset returns no data, and you read the new certificate
 * separately.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/credentials/reset
 */
export interface APIDatabaseCredentialsResetPasswordResponse {
	/** The new password. It is shown only once. */
	password: string;
}

/** The response envelope that carries an {@link APIDatabaseCredentialsResetPasswordResponse}. */
export type APIDatabaseCredentialsResetPasswordPayload =
	APIPayload<APIDatabaseCredentialsResetPasswordResponse>;

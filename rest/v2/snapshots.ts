import type {
	APIErrorCode,
	APIPayload,
	APIPayloadStatusOnly,
} from "../../common/v2";

/**
 * Which snapshots `GET /v2/users/snapshots` lists: those of your
 * applications or those of your databases.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/snapshots
 */
export type SnapshotScope = "applications" | "databases";
/** The {@link SnapshotScope} values by name. */
export const SnapshotScope = {
	Applications: "applications",
	Databases: "databases",
} as const;

/**
 * The new snapshot, part of the response of
 * `POST /v2/apps/{appId}/snapshots` and
 * `POST /v2/databases/{databaseId}/snapshots`.
 *
 * A snapshot that takes longer than about 90 seconds answers 202
 * `SNAPSHOT_PROCESSING` and keeps being generated. It shows up in the
 * snapshot listing about 2 minutes later, so poll the listing instead of
 * creating it again. An API key without the `snapshots:read` scope gets an
 * empty `response`. You can create one snapshot every 5 seconds and one per
 * resource every 3 minutes, within your plan's daily quota.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/snapshots
 */
export interface RESTPostAPISnapshotResult {
	/** The signed download URL, valid for 1 hour. It is absent without `snapshots:read`. */
	url?: string;
	/** The signed query string of the download URL. It is absent without `snapshots:read`. */
	key?: string;
}

/** Response of `POST /v2/apps/{appId}/snapshots` and `POST /v2/databases/{databaseId}/snapshots`. */
export type RESTPostAPISnapshotResultPayload =
	APIPayload<RESTPostAPISnapshotResult>;

/**
 * Body of `POST /v2/apps/{appId}/snapshots/restore` and
 * `POST /v2/databases/{databaseId}/snapshots/restore`, which restore the
 * resource from a snapshot. Take both values from the snapshot listing.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/snapshots/restore
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/snapshots/restore
 */
export interface RESTPostAPISnapshotRestoreJSONBody {
	/**
	 * The snapshot's `name` from the listing. It is the resource id, which
	 * can carry the runtime and the origin as suffixes, such as `<id>_<type>`
	 * for a database.
	 */
	snapshotId: string;
	/** The snapshot's `version_id` from the listing, 24 to 96 characters of `[A-Za-z0-9+/=_-]`. */
	versionId: string;
}

/**
 * The 202 answer of a snapshot restore that takes longer than about 90
 * seconds and keeps running.
 *
 * It is not a failure, even though `status` is `error`. Follow the restore
 * with {@link RESTGetAPISnapshotRestoreResult} instead of posting it again.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/snapshots/restore
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/snapshots/restore
 */
export interface RESTPostAPISnapshotRestoreProcessingResultPayload {
	status: "error";
	code: "SNAPSHOT_RESTORE_PROCESSING";
}

/**
 * Response of `POST /v2/apps/{appId}/snapshots/restore` and
 * `POST /v2/databases/{databaseId}/snapshots/restore`.
 *
 * A 200 means the restore finished. A 202
 * ({@link RESTPostAPISnapshotRestoreProcessingResultPayload}) means it keeps
 * running. You can restore once a minute, and the same resource once every 2
 * minutes.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/snapshots/restore
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/snapshots/restore
 */
export type RESTPostAPISnapshotRestoreResultPayload =
	| APIPayloadStatusOnly
	| RESTPostAPISnapshotRestoreProcessingResultPayload;

/**
 * The state of the last snapshot restore. It is `queued` or `running` while
 * the restore runs, then `success` or `error` for an hour after it ends, and
 * `none` when there is no recent restore.
 */
export type SnapshotRestoreState =
	| "none"
	| "queued"
	| "running"
	| "success"
	| "error";

/**
 * The progress and outcome of the last snapshot restore, part of the
 * response of `GET /v2/apps/{appId}/snapshots/restore` and
 * `GET /v2/databases/{databaseId}/snapshots/restore`.
 *
 * You can call it up to 30 times a minute. On an application shared with a
 * workspace, it requires the Administrator role.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/snapshots/restore
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/snapshots/restore
 */
export interface RESTGetAPISnapshotRestoreResult {
	state: SnapshotRestoreState;
	/** The current step while the restore runs, and `done` once it ends. */
	step?: string;
	/** Why the restore failed, when `state` is `error`. */
	code?: APIErrorCode | (string & {});
	/** When the restore started, as a Unix timestamp in milliseconds. */
	started_at?: number;
	/** When the restore ended, as a Unix timestamp in milliseconds. It is present once `state` is `success` or `error`. */
	finished_at?: number;
}

/** Response of `GET /v2/apps/{appId}/snapshots/restore` and `GET /v2/databases/{databaseId}/snapshots/restore`. */
export type RESTGetAPISnapshotRestoreResultPayload =
	APIPayload<RESTGetAPISnapshotRestoreResult>;

/**
 * Query of `GET /v2/users/snapshots`, which lists the snapshots you own. It
 * requires an active plan, and you can call it up to 3 times a minute.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/snapshots
 */
export interface RESTGetAPIUserSnapshotsQuery {
	/** Which snapshots to list. It defaults to `applications`. */
	scope?: SnapshotScope;
}

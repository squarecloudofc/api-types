import type { APIPayload } from "../../common/v2";

/**
 * Scope of the user snapshot listing.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/snapshots
 */
export type SnapshotScope = "applications" | "databases";
export const SnapshotScope = {
	Applications: "applications",
	Databases: "databases",
} as const;

/**
 * Response of snapshot creation. A large resource may instead answer `202`
 * with `code: "SNAPSHOT_PROCESSING"`: the snapshot appears in the listing on
 * its own, so poll the listing rather than posting again.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/snapshots
 */
export interface RESTPostAPISnapshotResult {
	/** Signed download URL, valid for 30 days. */
	url: string;
	key: string;
}

export type RESTPostAPISnapshotResultPayload =
	APIPayload<RESTPostAPISnapshotResult>;

/**
 * Restore an application (or database) from a snapshot.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/snapshots/restore
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/snapshots/restore
 */
export interface RESTPostAPISnapshotRestoreJSONBody {
	/**
	 * Snapshot `name` from the listing: the resource id, suffixed with the
	 * runtime and/or origin (e.g. `<id>_<type>` for databases).
	 */
	snapshotId: string;
	/** `version_id` from the listing (24-96 chars of `[A-Za-z0-9+/=_-]`). */
	versionId: string;
}

/**
 * Query for the authenticated user's snapshot listing.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/snapshots
 */
export interface RESTGetAPIUserSnapshotsQuery {
	/** Snapshot domain. Defaults to `applications`. */
	scope?: SnapshotScope;
}

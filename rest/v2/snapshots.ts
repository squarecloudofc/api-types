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
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/snapshots
 */
export interface RESTPostAPISnapshotResult {
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
	 * Snapshot identifier (UUID v4). For database restores, the suffixed form
	 * `<uuid>_<type>` returned by the listing is also accepted — both work.
	 */
	snapshotId: string;
	/** Snapshot version identifier (24-96 chars, base64url-ish). */
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

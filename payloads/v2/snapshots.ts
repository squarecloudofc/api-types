import type { APIPayload, ISODateString } from "../../common/v2";

/**
 * How a snapshot was made: `automatic` for the daily scheduled snapshot and
 * `manual` when a user or the AI agent asked for it.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/snapshots
 */
export type SnapshotOrigin = "automatic" | "manual";

/**
 * One stored snapshot of an application or database.
 *
 * Snapshot listings are cached for 30 minutes. When snapshot storage cannot
 * answer, a listing fails with 503 `SNAPSHOTS_UNAVAILABLE`, and the snapshots
 * themselves are not affected.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/snapshots
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/snapshots
 */
export interface APISnapshot {
	/** The snapshot id, the archive name without its extension. Pass it as `snapshotId` to restore. */
	name: string;
	/** The size in bytes. */
	size: number;
	/** When the snapshot was last modified. */
	modified: ISODateString;
	/** The signed query string used to build the download URL. */
	key: string;
	/** The storage version of the snapshot. Pass it as `versionId` to restore. */
	version_id: string;
	/** The signed download URL, valid for 1 hour. */
	url: string;
	/**
	 * What the archive holds: the database engine, such as `postgres`, or the
	 * application language, such as `javascript`. It is `null` on older
	 * snapshots.
	 */
	runtime?: string | null;
	/** How the snapshot was made. It is `null` on older snapshots. */
	origin?: SnapshotOrigin | null;
}

/** The response envelope that carries a list of {@link APISnapshot}. */
export type APISnapshotsPayload = APIPayload<APISnapshot[]>;

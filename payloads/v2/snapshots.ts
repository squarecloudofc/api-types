import type { APIPayload, ISODateString } from "../../common/v2";

/**
 * APISnapshot#origin — `automatic` for the daily scheduled snapshot, `manual`
 * when a user (or the AI agent) requested it.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/snapshots
 */
export type SnapshotOrigin = "automatic" | "manual";

/**
 * Snapshot rate limits: 1 request per 5s per user and 1 per 3min per resource
 * on creation, plus a per-plan daily quota — exhausting it returns
 * `429 DAILY_SNAPSHOTS_LIMIT_REACHED` (distinct from the short `KEEP_CALM`
 * retry 429). Listings are cached for 30 minutes.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/snapshots
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/snapshots
 */
export interface APISnapshot {
	/** Snapshot identifier (zip name without extension). Pass it as `snapshotId` to restore. */
	name: string;
	/** Size in bytes. */
	size: number;
	modified: ISODateString;
	/** Signed query string used to compose the download URL. */
	key: string;
	/** Storage version of this snapshot. Pass it as `versionId` to restore. */
	version_id: string;
	/** Signed download URL, valid for 30 days. */
	url: string;
	/**
	 * What the archive holds: the database engine or the app language.
	 * `null` on older snapshots.
	 */
	runtime?: string | null;
	/** `null` on older snapshots. */
	origin?: SnapshotOrigin | null;
}

export type APISnapshotsPayload = APIPayload<APISnapshot[]>;

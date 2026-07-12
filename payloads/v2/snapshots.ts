import type { APIPayload, ISODateString } from "../../common/v2";

/**
 * Snapshot rate limits: 1 request per 5s per user and 1 per 3min per resource
 * on creation, plus a per-plan daily quota — exhausting it returns
 * `429 DAILY_SNAPSHOTS_LIMIT_REACHED` (distinct from the short `KEEP_CALM`
 * retry 429). Listings are cached for 30 minutes.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/snapshots
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/snapshots
 */
export interface APISnapshot {
	name: string;
	size: number;
	modified: ISODateString;
	key: string;
}

export type APISnapshotsPayload = APIPayload<APISnapshot[]>;

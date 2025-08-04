import type { APIPayload } from "../../common/v2";

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/snapshots
 */
export interface RESTPostAPIApplicationSnapshotResult {
	url: string;
	key: string;
}

export type RESTPostAPIApplicationSnapshotResultPayload =
	APIPayload<RESTPostAPIApplicationSnapshotResult>;

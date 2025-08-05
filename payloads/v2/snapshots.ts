import type { APIPayload, ISODateString } from "../../common/v2";

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/snapshots
 * @see https://docs.squarecloud.app/api-reference/endpoint/users/snapshots
 */
export interface APISnapshot {
	name: string;
	size: number;
	modified: ISODateString;
	key: string;
}

export type APISnapshotsPayload = APIPayload<APISnapshot[]>;

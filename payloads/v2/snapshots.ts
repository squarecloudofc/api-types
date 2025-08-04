import type { APIPayload, ISODateString } from "../../common/v2";

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/snapshots
 */
export interface APIApplicationSnapshot {
	name: string;
	size: number;
	modified: ISODateString;
	key: string;
}

export type APIApplicationSnapshotsPayload = APIPayload<
	APIApplicationSnapshot[]
>;

import type { APIPayload, ISODateString } from "../../common/v2";

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/backup
 */
export interface APIApplicationBackup {
	name: string;
	size: number;
	modified: ISODateString;
	key: string;
}

export type APIApplicationBackupsPayload = APIPayload<APIApplicationBackup[]>;

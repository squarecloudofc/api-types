import type { APIPayload } from "../../common/v2";

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/backup
 */
export interface APIApplicationBackup {
	url: string;
	key: string;
}

export type APIApplicationBackupPayload = APIPayload<APIApplicationBackup>;

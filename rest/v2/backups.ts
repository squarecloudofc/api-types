import type { APIPayload } from "../../common/v2";

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/backup
 */
export interface RESTPostAPIApplicationBackupResult {
	url: string;
	key: string;
}

export type RESTPostAPIApplicationBackupResultPayload =
	APIPayload<RESTPostAPIApplicationBackupResult>;

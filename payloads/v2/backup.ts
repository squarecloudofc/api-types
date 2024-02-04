import { APIPayload } from "../../common";

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/backup
 */
export interface APIApplicationBackup {
  downloadURL: string;
}

export type APIApplicationBackupPayload = APIPayload<APIApplicationBackup>;

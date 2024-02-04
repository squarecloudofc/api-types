import { APIPayload } from "../../common";

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/logs
 */
export interface APIApplicationLogs {
  logs: string;
}

export type APIApplicationLogsPayload = APIPayload<APIApplicationLogs>;

import { APICommonPayload } from "../../common";

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/logs
 */
export interface APIApplicationLogs {
  logs: string;
}

export type APIApplicationLogsPayload = APICommonPayload<APIApplicationLogs>;

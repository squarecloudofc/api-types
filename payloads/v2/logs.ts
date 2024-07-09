import type { APIPayload } from "../../common/v2";

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/logs
 */
export interface APIApplicationLogs {
	logs: string;
}

export type APIApplicationLogsPayload = APIPayload<APIApplicationLogs>;

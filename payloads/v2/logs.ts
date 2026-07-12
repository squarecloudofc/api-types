import type { APIPayload } from "../../common/v2";

/**
 * Rate limits: one request per application every 5s, plus a per-user burst
 * allowance of 20 requests per 10s.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/logs
 */
export interface APIApplicationLogs {
	logs: string;
}

export type APIApplicationLogsPayload = APIPayload<APIApplicationLogs>;

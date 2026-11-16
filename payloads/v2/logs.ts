import type { APIPayload } from "../../common/v2";

/**
 * The most recent output of an application.
 *
 * This is a short snapshot, not a stream. For live logs, use the realtime
 * stream described by {@link APIRealtimeEventName}. You can read the logs of
 * one application once every 5 seconds, and up to 20 times every 10 seconds
 * across all your applications.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/logs
 */
export interface APIApplicationLogs {
	/** The recent standard output and standard error, joined in order. */
	logs: string;
}

/** The response envelope that carries {@link APIApplicationLogs}. */
export type APIApplicationLogsPayload = APIPayload<APIApplicationLogs>;

import type { ApplicationStatus } from "./status";

/**
 * The `event:` names of an application's realtime stream, a Server-Sent
 * Events connection that sends status changes, live metrics and log lines.
 *
 * - `system` carries a connection signal, see {@link APIRealtimeSystemEvent}.
 * - `logs` carries one log line. A first character of `\u0001` marks
 *   standard output and `\u0002` marks standard error, and a line without
 *   that character is standard output.
 * - `status` carries live metrics as a JSON string, see
 *   {@link APIRealtimeStatus}.
 * - `error` carries an error code such as `CONTAINER_NOT_FOUND`.
 *
 * You can keep up to 5 connections open, and an application accepts up to 30
 * across all users. More are refused with 429 `REALTIME_MAX_CONNECTIONS` or
 * `REALTIME_MAX_CONNECTIONS_APP`. A connection lasts up to 10 minutes, so
 * reconnect when it ends.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/realtime
 */
export type APIRealtimeEventName = "system" | "logs" | "status" | "error";

/**
 * The signals that `system` events carry. The connect signal arrives as
 * `REALTIME_CONNECTING | <sseId>`.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/realtime
 */
export type APIRealtimeSystemEvent =
	| "REALTIME_CONNECTING"
	| "REALTIME_TIMEOUT"
	| "REALTIME_DISCONNECTED"
	| "REALTIME_RECONNECT"
	| "REALTIME_ERROR";
/** The {@link APIRealtimeSystemEvent} values by name. */
export const APIRealtimeSystemEvent = {
	Connecting: "REALTIME_CONNECTING",
	Timeout: "REALTIME_TIMEOUT",
	Disconnected: "REALTIME_DISCONNECTED",
	Reconnect: "REALTIME_RECONNECT",
	Error: "REALTIME_ERROR",
} as const;

/**
 * A complete `status` event, the first one of each connection. Later
 * `status` events carry only some fields, see
 * {@link APIRealtimeStatusUpdate}.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/realtime
 */
export interface APIRealtimeStatus {
	/** The CPU usage, as a percentage. */
	cpu: number;
	/** The number of CPU cores allocated. */
	cpuLimit: number;
	/** The memory in use and the memory limit, in MB, as `[used, limit]`. */
	ram: [number, number];
	status: ApplicationStatus;
	/**
	 * The network bytes in (`i`) and out (`o`). `new` holds the current rate,
	 * in bytes per second.
	 */
	netIO: { i: number; o: number; new: { i: number; o: number } };
	/** The disk bytes read (`i`) and written (`o`). */
	bIO: { i: number; o: number };
	/** When the application started, as a Unix timestamp in milliseconds. */
	uptime: number;
}

/**
 * A `status` event after the first one of a connection, with only the live
 * fields. Merge each one onto the last complete {@link APIRealtimeStatus} and
 * keep the earlier values of the missing fields.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/realtime
 */
export type APIRealtimeStatusUpdate = Pick<
	APIRealtimeStatus,
	"cpu" | "ram" | "netIO" | "bIO"
>;

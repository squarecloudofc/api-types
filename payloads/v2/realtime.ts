import type { ApplicationStatus } from "./status";

/**
 * `event:` names emitted on the realtime SSE stream
 * (`GET /v2/apps/{appId}/realtime`):
 * - `system`: protocol signal, see {@link APIRealtimeSystemEvent}
 * - `logs`: one log line; a leading `\u0001` marks stdout and `\u0002`
 *   stderr (no prefix = stdout)
 * - `status`: container metrics as a JSON string, see {@link APIRealtimeStatus}
 * - `error`: an error code such as `CONTAINER_NOT_FOUND`
 *
 * Connection limits: at most 5 simultaneous connections per user and 30 per
 * application — exceeding them returns `REALTIME_MAX_CONNECTIONS` /
 * `REALTIME_MAX_CONNECTIONS_APP`. Each connection has a 10-minute TTL with one
 * transparent internal reconnection; clients must reconnect when the TTL
 * expires.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/realtime
 */
export type APIRealtimeEventName = "system" | "logs" | "status" | "error";

/**
 * Signals carried by `event: system` frames. `REALTIME_CONNECTING` is sent as
 * `REALTIME_CONNECTING | <sseId>`.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/realtime
 */
export type APIRealtimeSystemEvent =
	| "REALTIME_CONNECTING"
	| "REALTIME_TIMEOUT"
	| "REALTIME_DISCONNECTED"
	| "REALTIME_RECONNECT"
	| "REALTIME_ERROR";
export const APIRealtimeSystemEvent = {
	Connecting: "REALTIME_CONNECTING",
	Timeout: "REALTIME_TIMEOUT",
	Disconnected: "REALTIME_DISCONNECTED",
	Reconnect: "REALTIME_RECONNECT",
	Error: "REALTIME_ERROR",
} as const;

/**
 * Complete `event: status` frame — the first frame of each (re)connection.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/realtime
 */
export interface APIRealtimeStatus {
	/** CPU usage percentage. */
	cpu: number;
	/** Number of CPU cores allocated. */
	cpuLimit: number;
	/** `[usedMB, limitMB]`. */
	ram: [number, number];
	status: ApplicationStatus;
	/** Network bytes in/out; `new` is bytes per second. */
	netIO: { i: number; o: number; new: { i: number; o: number } };
	/** Block I/O bytes in/out. */
	bIO: { i: number; o: number };
	/** Unix timestamp (ms) at which the container started. */
	uptime: number;
}

/**
 * Later `event: status` frames carry only the live fields. Merge each one onto
 * the last complete {@link APIRealtimeStatus} frame.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/realtime
 */
export type APIRealtimeStatusUpdate = Pick<
	APIRealtimeStatus,
	"cpu" | "ram" | "netIO" | "bIO"
>;

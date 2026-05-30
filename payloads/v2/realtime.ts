/**
 * System-level event names emitted on the realtime SSE stream
 * (`GET /v2/apps/{appId}/realtime`).
 *
 * The stream also emits `event: message` frames whose `data:` is forwarded
 * opaquely from the upstream source — typically a JSON string, but the API
 * does not enforce a schema. Consumers should `JSON.parse` and discriminate
 * internally per the feature they're listening to.
 *
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

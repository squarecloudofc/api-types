import type { APIPayload, ISODateString } from "../../common/v2";

/**
 * APIServiceStatus#status — `unknown` means the check itself could not run;
 * it is not evidence of an outage.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/service/status
 */
export type ServiceStatus = "online" | "degraded" | "unknown";

/**
 * State of one Square-run service or third-party dependency.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/service/status
 */
export interface APIServiceComponentStatus {
	name: string;
	status: "operational" | "degraded" | "outage" | "maintenance" | "unknown";
	/** What is wrong and what it affects. Present only when not operational. */
	summary?: string;
	unresolved_incidents?: number;
	degraded_components?: number;
	api_latency?: {
		recent_ms?: number;
		day_mean_ms?: number;
		elevated?: boolean;
	};
}

/**
 * `status`/`message` describe Square Cloud itself, `services` are Square-run,
 * `dependencies` are third parties.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/service/status
 */
export interface APIServiceStatus {
	status: ServiceStatus;
	message: string;
	checked_at?: ISODateString;
	stale?: boolean;
	services?: Record<string, APIServiceComponentStatus>;
	dependencies?: Record<string, APIServiceComponentStatus>;
}

export type APIServiceStatusPayload = APIPayload<APIServiceStatus>;

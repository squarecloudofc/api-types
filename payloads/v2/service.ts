import type { APIPayload, ISODateString } from "../../common/v2";

/**
 * The overall state of Square Cloud. It is `maintenance` when a maintenance
 * is the only thing going on, and any instability makes it `degraded`.
 * `unknown` means the check itself could not run, which is not evidence of
 * an outage.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/service/status
 */
export type ServiceStatus = "online" | "maintenance" | "degraded" | "unknown";

/**
 * The state of one Square Cloud service or of one outside provider that
 * Square Cloud depends on.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/service/status
 */
export interface APIServiceComponentStatus {
	/** The display name. */
	name: string;
	/** The state. `unknown` means the state could not be checked, which is not evidence of an outage. */
	status: "operational" | "degraded" | "outage" | "maintenance" | "unknown";
	/** What is wrong and what it affects. It is present only when the entry is not operational. */
	summary?: string;
	unresolved_incidents?: number;
	degraded_components?: number;
	/** The provider's recent and daily mean API latency, in milliseconds, and whether it is elevated. */
	api_latency?: {
		recent_ms?: number;
		day_mean_ms?: number;
		elevated?: boolean;
	};
}

/**
 * A maintenance window or incident open on the status page, with its latest
 * update.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/service/status
 */
export interface APIServiceIncident {
	type: "maintenance" | "incident";
	title: string;
	status: "maintenance" | "degraded" | "outage" | "operational" | "unknown";
	/** When it started. */
	started_at: ISODateString;
	/** When a maintenance is expected to end. It is `null` when no end was announced. */
	ends_at?: ISODateString | null;
	/** The names of the affected components. */
	affected: string[];
	/** The latest update as written on the status page, which may use Markdown. */
	update?: string;
	/** When the latest update was posted. */
	updated_at?: ISODateString | null;
}

/**
 * A status page component that is not operational, such as a cluster.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/service/status
 */
export interface APIServiceComponent {
	name: string;
	status: "maintenance" | "degraded" | "outage";
}

/**
 * The status of Square Cloud, of each of its services and of the outside
 * providers it depends on.
 *
 * `status` and `message` describe Square Cloud itself. A problem at an
 * outside provider shows up under `dependencies` without changing `status`.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/service/status
 */
export interface APIServiceStatus {
	status: ServiceStatus;
	/** A short sentence about the overall state. */
	message: string;
	/** When the status was checked. */
	checked_at?: ISODateString;
	/** `true` when the regular status document was unavailable and the status was checked live instead. */
	stale?: boolean;
	/** Square Cloud's own services, by key. */
	services?: Record<string, APIServiceComponentStatus>;
	/** The outside providers Square Cloud depends on, by key. */
	dependencies?: Record<string, APIServiceComponentStatus>;
	/** The open maintenance windows and incidents, newest first. It is empty when there are none. */
	incidents?: APIServiceIncident[];
	/** The status page components that are not operational. It is empty when there are none. */
	components?: APIServiceComponent[];
}

/** The response envelope that carries an {@link APIServiceStatus}. */
export type APIServiceStatusPayload = APIPayload<APIServiceStatus>;

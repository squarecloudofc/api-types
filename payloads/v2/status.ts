import type {
	APIPayload,
	ApplicationId,
	RuntimeStatsListItem,
} from "../../common/v2";

/**
 * APIApplicationStatus#status
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/status
 */
export type ApplicationStatus =
	| "exited"
	| "created"
	| "starting"
	| "restarting"
	| "deleting"
	| "running";
export const ApplicationStatus = {
	Exited: "exited",
	Created: "created",
	Starting: "starting",
	Restarting: "restarting",
	Deleting: "deleting",
	Running: "running",
};

/**
 * APIApplicationStatus#network — network counters. Strings by default
 * (`"<incoming> ↑ <outgoing> ↓"`); two-element `[in, out]` integer arrays
 * with `?rawData=true`.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/status
 */
export interface APIApplicationStatusNetwork<Raw extends boolean = false> {
	total: Raw extends true ? [number, number] : string;
	now: Raw extends true ? [number, number] : string;
}

/**
 * Runtime stats for a single application (or database). By default the usage
 * fields come formatted as strings (`"0.50%"`, `"120/512MB"`); pass
 * `?rawData=true` (see the status query type) to receive raw numbers instead —
 * parameterize with `APIApplicationStatus<true>`.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/status
 */
export interface APIApplicationStatus<Raw extends boolean = false> {
	/** CPU usage. Formatted (`"0.50%"`) by default, raw number with `rawData`. */
	cpu: Raw extends true ? number : string;
	/** RAM usage. Formatted (`"120/512MB"`) by default, raw number with `rawData`. */
	ram: Raw extends true ? number : string;
	status: ApplicationStatus;
	/** Convenience flag equivalent to `status === "running"`. */
	running: boolean;
	/** Storage usage. Formatted by default, raw bytes with `rawData`. */
	storage: Raw extends true ? number : string;
	network: APIApplicationStatusNetwork<Raw>;
	/** Unix timestamp (ms) at which the resource last started. `null` when not running. */
	uptime: number | null;
}

export type APIApplicationStatusPayload<Raw extends boolean = false> =
	APIPayload<APIApplicationStatus<Raw>>;

/**
 * @see /apps/status https://docs.squarecloud.app/en/api-reference/endpoint/apps/status-all
 */
export type APIApplicationStatusAll<Running extends boolean = boolean> =
	RuntimeStatsListItem<ApplicationId, Running>;

export type APIApplicationStatusAllPayload = APIPayload<
	APIApplicationStatusAll[]
>;

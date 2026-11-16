import type {
	APIPayload,
	ApplicationId,
	RuntimeStatsListItem,
} from "../../common/v2";

/**
 * The lifecycle state of an application or database.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/status
 */
export type ApplicationStatus =
	| "exited"
	| "created"
	| "starting"
	| "restarting"
	| "deleting"
	| "running";
/** The {@link ApplicationStatus} values by name. */
export const ApplicationStatus = {
	Exited: "exited",
	Created: "created",
	Starting: "starting",
	Restarting: "restarting",
	Deleting: "deleting",
	Running: "running",
} as const;

/**
 * The network counters of an application or database.
 *
 * By default each counter is a string such as `"<incoming> ↑ <outgoing> ↓"`.
 * With `rawData=true`, set `Raw` to `true` and each counter is an
 * `[in, out]` pair of integers.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/status
 */
export interface APIApplicationStatusNetwork<Raw extends boolean = false> {
	total: Raw extends true ? [number, number] : string;
	now: Raw extends true ? [number, number] : string;
}

/**
 * The current CPU, memory, network and storage usage of an application or
 * database.
 *
 * By default the usage fields are formatted strings, such as `"0.5%"` and
 * `"120.4MB"`. Send `rawData=true`, as
 * {@link RESTGetAPIApplicationStatusQuery} shows, to get numbers instead,
 * and type the result as `APIApplicationStatus<true>`.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/status
 */
export interface APIApplicationStatus<Raw extends boolean = false> {
	/** The CPU usage, formatted like `"0.5%"` by default or a number with `rawData`. */
	cpu: Raw extends true ? number : string;
	/**
	 * The memory in use, without the allocated total. It is formatted in MB
	 * like `"120.4MB"` by default, or a number of MB with `rawData`.
	 */
	ram: Raw extends true ? number : string;
	status: ApplicationStatus;
	/** `true` when `status` is `running`. */
	running: boolean;
	/**
	 * `true` while a snapshot restore is queued or running. `status` keeps
	 * the container's own state, which is `exited` while the restore holds it
	 * stopped.
	 */
	restoring?: boolean;
	/** The storage in use, formatted by default or a number of bytes with `rawData`. */
	storage: Raw extends true ? number : string;
	network: APIApplicationStatusNetwork<Raw>;
	/**
	 * When the resource last started, as a Unix timestamp in milliseconds. It
	 * is `null` when the resource is not running.
	 */
	uptime: number | null;
}

/** The response envelope that carries an {@link APIApplicationStatus}. */
export type APIApplicationStatusPayload<Raw extends boolean = false> =
	APIPayload<APIApplicationStatus<Raw>>;

/**
 * One entry of the runtime stats listing of every application you own, or of
 * the applications shared with one workspace.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/status-all
 */
export type APIApplicationStatusAll<Running extends boolean = boolean> =
	RuntimeStatsListItem<ApplicationId, Running>;

/** The response envelope that carries a list of {@link APIApplicationStatusAll}. */
export type APIApplicationStatusAllPayload = APIPayload<
	APIApplicationStatusAll[]
>;

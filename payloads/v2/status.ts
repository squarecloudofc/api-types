import type { APIPayload, ApplicationId } from "../../common/v2";

/**
 * APIApplicationStatus#status
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/status
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
 * APIApplicationStatus#network
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/status
 */
export interface APIApplicationStatusNetwork {
	total: string;
	now: string;
}

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/status
 */
export interface APIApplicationStatus {
	cpu: string;
	ram: string;
	status: ApplicationStatus;
	running: boolean;
	storage: string;
	network: APIApplicationStatusNetwork;
	uptime: number | null;
}

export type APIApplicationStatusPayload = APIPayload<APIApplicationStatus>;

/**
 * @see /apps/status https://docs.squarecloud.app/api-reference/endpoint/apps/status-all
 */
export type APIApplicationStatusAll<Running extends boolean = boolean> = {
	id: ApplicationId;
} & (Running extends true
	? { running: true; cpu: string; ram: string }
	: { running: false; cpu?: never; ram?: never });

export type APIApplicationStatusAllPayload = APIPayload<
	APIApplicationStatusAll[]
>;

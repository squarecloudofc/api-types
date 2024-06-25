import type { APIPayload } from "../../common";

/**
 * APIApplicationStatus#status
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/status
 */
export enum ApplicationStatus {
	Exited = "exited",
	Created = "created",
	Starting = "starting",
	Restarting = "restarting",
	Deleting = "deleting",
	Running = "running",
}

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
	requests: number;
	uptime: number | null;
}

export type APIApplicationStatusPayload = APIPayload<APIApplicationStatus>;

/**
 * @see /apps/all/status https://docs.squarecloud.app/api-reference/endpoint/apps/status
 */
export interface APIApplicationStatusAll {
	id: string;
	cpu: string;
	ram: string;
	running: boolean;
}

export type APIApplicationStatusAllPayload = APIPayload<
	APIApplicationStatusAll[]
>;

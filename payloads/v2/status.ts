import { APICommonPayload } from "../../common";

/**
 * [status] https://docs.squarecloud.app/api-reference/endpoint/apps/status
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
 * [network] https://docs.squarecloud.app/api-reference/endpoint/apps/status
 */
export interface APIApplicationStatusNetwork {
  total: string;
  now: string;
}

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/status
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

export type APIApplicationStatusPayload = APICommonPayload<APIApplicationStatus>;

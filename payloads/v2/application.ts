import { APICommonPayload } from "../../common";

/**
 * /apps/{app_id}
 */

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/info
 */
export interface APIApplication {
  id: string;
  name: string;
  owner: string;
  cluster: string;
  cpu?: number;
  ram: number;
  language: string;
  isWebsite: boolean;
  gitIntegration: boolean;
}

export type APIApplicationPayload = APICommonPayload<APIApplication>;

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/info
 */
export interface APIWebsiteApplication extends APIApplication {
  isWebsite: true;
  domain: string;
  custom: string | null;
}

export type APIWebsiteApplicationPayload = APICommonPayload<APIWebsiteApplication>;

/**
 * /apps/{app_id}/status
 */

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
  status: string;
  running: boolean;
  storage: string;
  network: APIApplicationStatusNetwork;
  requests: number;
  uptime: number | null;
}

export type APIApplicationStatusPayload = APICommonPayload<APIApplicationStatus>;

/**
 * /apps/{app_id}/logs
 */

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/logs
 */
export interface APIApplicationLogs {
  logs: string;
}

export type APIApplicationLogsPayload = APICommonPayload<APIApplicationLogs>;

/**
 * /apps/{app_id}/backup
 */

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/backup
 */
export interface APIApplicationBackup {
  downloadURL: string;
}

export type APIApplicationBackupPayload = APICommonPayload<APIApplicationBackup>;

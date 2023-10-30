import { APICommonPayload } from "../../common";

/**
 * /apps/{app_id}
 */

/**
 * [language] https://docs.squarecloud.app/api-reference/endpoint/apps/info
 */
export enum ApplicationLanguage {
  JavaScript = "javascript",
  TypeScript = "typescript",
  Python = "python",
  Java = "java",
  Elixir = "elixir",
  Go = "go",
  Rust = "rust",
  PHP = "php",
}

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/info
 */
export interface APIApplication {
  id: string;
  name: string;
  avatar: string;
  owner: string;
  cluster: string;
  ram: number;
  language: ApplicationLanguage;
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

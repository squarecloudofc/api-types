import { APIPayload } from "../../common";

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
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/info
 */
export interface APIApplication {
  id: string;
  name: string;
  owner: string;
  cluster: string;
  ram: number;
  language: ApplicationLanguage;
  isWebsite: boolean;
  gitIntegration: boolean;
}

export type APIApplicationPayload = APIPayload<APIApplication>;

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/info
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
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/logs
 */
export interface APIApplicationLogs {
  logs: string;
}

export type APIApplicationLogsPayload = APICommonPayload<APIApplicationLogs>;

/**
 * /apps/{app_id}/backup
 */

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/backup
 */
export interface APIApplicationBackup {
  downloadURL: string;
}

export type APIApplicationBackupPayload = APICommonPayload<APIApplicationBackup>;

import { APIPayload, APIPayloadStatusOnly } from "../../common";
import { ApplicationLanguage } from "../../v2";

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/start
 */
export type RESTPostAPIApplicationStartResultPayload = APIPayloadStatusOnly;

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/restart
 */
export type RESTPostAPIApplicationRestartResultPayload = APIPayloadStatusOnly;

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/stop
 */
export type RESTPostAPIApplicationStopResultPayload = APIPayloadStatusOnly;

/**
 * [body] https://docs.squarecloud.app/api-reference/endpoint/apps/commit
 */
export interface RESTPostAPIApplicationCommitFormDataBody {
  file: unknown;
}

/**
 * [query] https://docs.squarecloud.app/api-reference/endpoint/apps/commit
 */
export interface RESTPostAPIApplicationCommitQuery {
  restart?: boolean;
}

export interface RESTPostAPIApplicationCommitResultPayload extends APIPayloadStatusOnly {
  message?: string;
}

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/delete
 */
export type RESTDeleteAPIApplicationDeleteResultPayload = APIPayloadStatusOnly;

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/upload
 */
export interface RESTPostAPIApplicationUploadFormDataBody {
  file: unknown;
}

export interface RESTPostAPIApplicationUploadResultLanguage {
  name: ApplicationLanguage;
  version: string;
}

export interface RESTPostAPIApplicationUploadResult {
  id: string;
  tag: string;
  description?: string;
  subdomain?: string | null;
  ram: number;
  cpu: number;
  language: RESTPostAPIApplicationUploadResultLanguage;
}

export type RESTPostAPIApplicationUploadResultPayload = APIPayload<RESTPostAPIApplicationUploadResult>;

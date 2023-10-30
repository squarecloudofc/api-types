import { APICommonPayload, APICommonPayloadStatusOnly } from "../../common";

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/start
 */
export type RESTPostAPIApplicationStartResultPayload = APICommonPayloadStatusOnly;

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/restart
 */
export type RESTPostAPIApplicationRestartResultPayload = APICommonPayloadStatusOnly;

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/stop
 */
export type RESTPostAPIApplicationStopResultPayload = APICommonPayloadStatusOnly;

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

export interface RESTPostAPIApplicationCommitResultPayload extends APICommonPayloadStatusOnly {
  message?: string;
}

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/delete
 */
export type RESTDeleteAPIApplicationDeleteResultPayload = APICommonPayloadStatusOnly;

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/upload
 */
export interface RESTPostAPIApplicationUploadFormDataBody {
  file: unknown;
}

export interface RESTPostAPIApplicationUploadResultLanguage {
  name: string;
  version: string;
}

export interface RESTPostAPIApplicationUploadResult {
  id: string;
  tag: string;
  description: string;
  subdomain?: string | null;
  avatar: string;
  ram: number;
  cpu: number;
  language: RESTPostAPIApplicationUploadResultLanguage;
}

export type RESTPostAPIApplicationUploadResultPayload = APICommonPayload<RESTPostAPIApplicationUploadResult>;

import { APICommonPayload, APICommonPayloadStatusOnly } from "../../common";

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/start
 */
export type RESTPostAPIApplicationStartResultPayload = APICommonPayloadStatusOnly;

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/restart
 */
export type RESTPostAPIApplicationRestartResultPayload = APICommonPayloadStatusOnly;

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/stop
 */
export type RESTPostAPIApplicationStopResultPayload = APICommonPayloadStatusOnly;

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/commit
 */
export interface RESTPostAPIApplicationCommitFormDataBody {
  file: unknown;
}

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/commit
 */
export interface RESTPostAPIApplicationCommitQuery {
  restart?: boolean;
}

export interface RESTPostAPIApplicationCommitResultPayload extends APICommonPayloadStatusOnly {
  message?: string;
}

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/delete
 */
export type RESTDeleteAPIApplicationDeleteResultPayload = APICommonPayloadStatusOnly;

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/upload
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
  ram: number;
  cpu?: number;
  language: RESTPostAPIApplicationUploadResultLanguage;
}

export type RESTPostAPIApplicationUploadResultPayload = APICommonPayload<RESTPostAPIApplicationUploadResult>;

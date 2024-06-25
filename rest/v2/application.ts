import type { APIPayload, APIPayloadStatusOnly } from "../../common";
import type { ApplicationLanguage } from "../../v2";

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/start
 */
export type RESTPostAPIApplicationStartResultPayload = APIPayloadStatusOnly;

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/restart
 */
export type RESTPostAPIApplicationRestartResultPayload = APIPayloadStatusOnly;

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/stop
 */
export type RESTPostAPIApplicationStopResultPayload = APIPayloadStatusOnly;

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

export interface RESTPostAPIApplicationCommitResultPayload
	extends APIPayloadStatusOnly {
	message?: string;
}

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/delete
 */
export type RESTDeleteAPIApplicationDeleteResultPayload = APIPayloadStatusOnly;

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/upload
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

export type RESTPostAPIApplicationUploadResultPayload =
	APIPayload<RESTPostAPIApplicationUploadResult>;

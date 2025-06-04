import type {
	APIPayload,
	APIPayloadStatusOnly,
	ApplicationId,
} from "../../common/v2";
import type { ApplicationLanguage } from "../../payloads/v2";

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

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/upload
 */
export interface RESTPostAPIApplicationUploadResultLanguage {
	name: ApplicationLanguage;
	version: string;
}

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/upload
 */
export interface RESTPostAPIApplicationUploadResult {
	id: ApplicationId;
	name: string;
	description?: string;
	subdomain?: string | null;
	ram: number;
	cpu: number;
	language: RESTPostAPIApplicationUploadResultLanguage;
}

export type RESTPostAPIApplicationUploadResultPayload =
	APIPayload<RESTPostAPIApplicationUploadResult>;

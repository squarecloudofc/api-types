import type { Brand } from "../utils";

export type APIPayloadStatus = "error" | "success";

export interface APIPayload<TResponse> {
	status: APIPayloadStatus;
	response: TResponse;
	code?: string;
}

export interface APIPayloadStatusOnly {
	status: APIPayloadStatus;
}

export interface APIHeaders {
	Authorization: string;
}

export type APIVersion<TVersion extends number> = `v${TVersion}`;

export type ISODateString = string;

export type UserId = string & Brand<"UserId">;
export const UserId = (id: string): UserId => id as UserId;

export type ApplicationId = string & Brand<"ApplicationId">;
export const ApplicationId = (id: string): ApplicationId => id as ApplicationId;

export type DatabaseId = string & Brand<"DatabaseId">;
export const DatabaseId = (id: string): DatabaseId => id as DatabaseId;

export type WorkspaceId = string & Brand<"WorkspaceId">;
export const WorkspaceId = (id: string): WorkspaceId => id as WorkspaceId;

/**
 * Compact runtime stats entry returned by `/apps/status` and `/databases/status`.
 * The id is parameterized so the same shape can be branded as `ApplicationId`,
 * `DatabaseId`, or left as a plain `string`.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/status-all
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/status-all
 */
export type RuntimeStatsListItem<
	TId extends string = string,
	Running extends boolean = boolean,
> = {
	id: TId;
} & (Running extends true
	? { running: true; cpu: string; ram: string }
	: { running: false; cpu?: never; ram?: never });

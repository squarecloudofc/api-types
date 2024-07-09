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

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

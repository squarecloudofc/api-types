export type APICommonPayloadStatus = "error" | "success";

export interface APICommonPayload<TResponse> {
  status: APICommonPayloadStatus;
  response: TResponse;
  code?: string;
}

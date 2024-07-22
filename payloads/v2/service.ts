import type { APIPayload } from "../../common/v2";

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/service/status
 */
export interface APIServiceStatus {
	status: string;
	message: string;
}

export type APIServiceStatusPayload = APIPayload<APIServiceStatus>;

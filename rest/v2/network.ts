import type { APIPayloadStatusOnly } from "../../common/v2";

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/network/custom
 */
export interface RESTPostAPINetworkCustomDomainJSONBody {
	custom: string;
}

export type RESTPostAPINetworkCustomDomainResultPayload = APIPayloadStatusOnly;

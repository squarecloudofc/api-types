import type { APIPayloadStatusOnly } from "../../common/v2";

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/network/custom
 */
export interface RESTPostAPINetworkCustomDomainJSONBody {
	custom: string;
}

export type RESTPostAPINetworkCustomDomainResultPayload = APIPayloadStatusOnly;

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/network/purge_cache
 */
export interface RESTPostAPINetworkPurgeCacheJSONBody {
	paths: string[];
}

export type RESTPostAPINetworkPurgeCacheResultPayload = APIPayloadStatusOnly;

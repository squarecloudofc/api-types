import type { APIPayloadStatusOnly, ISODateString } from "../../common/v2";

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/custom
 */
export interface RESTPostAPINetworkCustomDomainJSONBody {
	custom: string;
}

export type RESTPostAPINetworkCustomDomainResultPayload = APIPayloadStatusOnly;

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/purge_cache
 */
export interface RESTPostAPINetworkPurgeCacheJSONBody {
	paths: string[];
}

export type RESTPostAPINetworkPurgeCacheResultPayload = APIPayloadStatusOnly;

/**
 * Required ISO-8601 time range for the analytics/errors/logs/performance
 * endpoints. Maximum retention window is 7 days; `start` is clamped to the
 * application's creation date by the backend.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/analytics
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/errors
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/logs
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/performance
 */
export interface RESTAPINetworkRangeQuery {
	start: ISODateString;
	end: ISODateString;
}

/**
 * Query for `/v2/apps/{appId}/network/analytics`. Both `start` and `end` are
 * required by the backend.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/analytics
 */
export type RESTGetAPINetworkAnalyticsQuery = RESTAPINetworkRangeQuery;

/**
 * Query for `/v2/apps/{appId}/network/errors`. Defaults to 5xx only; pass
 * `include_4xx=true` to include 4xx as well.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/errors
 */
export interface RESTAPINetworkErrorsQuery extends RESTAPINetworkRangeQuery {
	include_4xx?: "true" | "false";
}

/**
 * Query for `/v2/apps/{appId}/network/logs`. Pro+ only.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/logs
 */
export type RESTGetAPINetworkLogsQuery = RESTAPINetworkRangeQuery;

/**
 * Query for `/v2/apps/{appId}/network/performance`. Pro+ only.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/performance
 */
export type RESTGetAPINetworkPerformanceQuery = RESTAPINetworkRangeQuery;

import type { APIPayloadStatusOnly, ISODateString } from "../../common/v2";

/**
 * Custom-domain changes are subject to a daily per-user rate limit.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/custom
 */
export interface RESTPostAPINetworkCustomDomainJSONBody {
	custom: string;
}

export type RESTPostAPINetworkCustomDomainResultPayload = APIPayloadStatusOnly;

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/purge_cache
 */
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
 * required by the backend. All other params are optional drill-down filters
 * applied to every breakdown at once.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/analytics
 */
export interface RESTGetAPINetworkAnalyticsQuery
	extends RESTAPINetworkRangeQuery {
	/** Filter to one client country (2-character code, e.g. `BR`). */
	country?: string;
	/** Filter to one client IP (exact IPv4/IPv6 match). */
	ip?: string;
	/** Filter to request paths starting with this prefix (e.g. `/api` covers `/api/*`). */
	path?: string;
	/** Filter to one edge response status code, as returned in the `status_codes` breakdown. */
	status?: string;
	/** Filter to one client OS, as returned in the `os` breakdown. */
	os?: string;
	/** Filter to one client browser, as returned in the `browsers` breakdown. */
	browser?: string;
	/** Filter to one HTTP protocol, as returned in the `protocols` breakdown. */
	protocol?: string;
	/** Filter to one referer host, as returned in the `referers` breakdown (`Direct` = no referer). */
	referer?: string;
	/**
	 * Filter to one client network, as returned in the `providers` breakdown —
	 * e.g. `GOOGLE (15169)`, a bare ASN number, or `SQUARE-CLOUD-PLATFORM`.
	 */
	provider?: string;
	/** Filter to one response content type, as returned in the `content_types` breakdown (`Unknown` = unclassified). */
	content_type?: string;
	/** Filter to one verified-bot category, as returned in the `bots` breakdown (`Unverified` = regular traffic). */
	bot?: string;
}

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

import type { APIPayloadStatusOnly, ISODateString } from "../../common/v2";

/**
 * Body of `POST /v2/apps/{appId}/network/custom`, which sets or removes the
 * application's custom domain.
 *
 * Custom domains are available on the Standard, Pro and Enterprise plans.
 * You can change domains up to 10 times every 5 minutes and 50 times a day.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/custom
 */
export interface RESTPostAPINetworkCustomDomainJSONBody {
	/**
	 * The fully qualified domain to attach, or `@` to remove the current one.
	 * Square Cloud domains are refused with 400 `RESERVED_DOMAIN`.
	 */
	custom: string;
}

/** Response of `POST /v2/apps/{appId}/network/custom`. */
export type RESTPostAPINetworkCustomDomainResultPayload = APIPayloadStatusOnly;

/**
 * Response of `POST /v2/apps/{appId}/network/purge_cache`, which purges the
 * edge cache of the application's domains. You can purge once a minute.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/purge_cache
 */
export type RESTPostAPINetworkPurgeCacheResultPayload = APIPayloadStatusOnly;

/**
 * The time window that the network analytics, errors, logs and performance
 * routes require.
 *
 * Network data is kept for 7 days, and a `start` before the application was
 * created is moved to its creation date. A missing, malformed or reversed
 * window fails with 400 `INVALID_TIME_RANGE`.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/analytics
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/errors
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/logs
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/performance
 */
export interface RESTAPINetworkRangeQuery {
	/** When the window starts, as an ISO 8601 timestamp. */
	start: ISODateString;
	/** When the window ends, as an ISO 8601 timestamp. */
	end: ISODateString;
}

/**
 * Query of `GET /v2/apps/{appId}/network/analytics`.
 *
 * `start` and `end` are required. The other fields are optional filters that
 * narrow every breakdown at once and combine with each other. Pass the exact
 * `type` value that the matching breakdown returned, or the request fails
 * with 400 `INVALID_FILTER`.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/analytics
 */
export interface RESTGetAPINetworkAnalyticsQuery
	extends RESTAPINetworkRangeQuery {
	/** Keeps one client country, as a 2-character code such as `BR`. */
	country?: string;
	/** Keeps one client IP, an exact IPv4 or IPv6 match. */
	ip?: string;
	/**
	 * Keeps the request paths that start with this prefix, so `/api` covers
	 * `/api/*`. It must be absolute and up to 256 characters.
	 */
	path?: string;
	/** Keeps one response status code, 3 digits, as the `status_codes` breakdown returns it. */
	status?: string;
	/** Keeps one client operating system, as the `os` breakdown returns it. */
	os?: string;
	/** Keeps one client browser, as the `browsers` breakdown returns it. */
	browser?: string;
	/** Keeps one HTTP protocol, as the `protocols` breakdown returns it. */
	protocol?: string;
	/** Keeps one referer host, as the `referers` breakdown returns it. `Direct` means no referer. */
	referer?: string;
	/**
	 * Keeps one client network, as the `providers` breakdown returns it, such
	 * as `GOOGLE (15169)` or `SQUARE-CLOUD-PLATFORM`.
	 */
	provider?: string;
	/** Keeps one response content type, as the `content_types` breakdown returns it. `Unknown` means unclassified. */
	content_type?: string;
	/** Keeps one verified bot category, as the `bots` breakdown returns it. `Unverified` means regular traffic. */
	bot?: string;
}

/**
 * Query of `GET /v2/apps/{appId}/network/errors`.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/errors
 */
export interface RESTAPINetworkErrorsQuery extends RESTAPINetworkRangeQuery {
	/** `true` adds 4xx responses to the 5xx responses that are counted by default. */
	include_4xx?: "true" | "false";
}

/**
 * Query of `GET /v2/apps/{appId}/network/logs`. Network logs are available
 * on the Pro and Enterprise plans.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/logs
 */
export type RESTGetAPINetworkLogsQuery = RESTAPINetworkRangeQuery;

/**
 * Query of `GET /v2/apps/{appId}/network/performance`. Network performance is
 * available on the Pro and Enterprise plans.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/performance
 */
export type RESTGetAPINetworkPerformanceQuery = RESTAPINetworkRangeQuery;

import type { APIPayload, ISODateString } from "../../common/v2";

/**
 * Time bucket of the `visits` time series (15-minute window). Has no `type`
 * field because the dimension is time itself.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/analytics
 */
export interface APINetworkAnalyticsTimeBucket {
	/** Start of the 15-minute window (ISO 8601). */
	date: ISODateString;
	/** Unique visitors. */
	visits: number;
	/** Total requests. */
	requests: number;
	/** Response bytes served. */
	bytes: number;
}

/**
 * Per-dimension bucket — `type` identifies the dimension value (e.g. country
 * name, HTTP method, browser, ASN tag).
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/analytics
 */
export interface APINetworkAnalyticsBucket {
	/** Dimension value for this bucket. */
	type: string;
	/** Start of the 15-minute window (ISO 8601). */
	date: ISODateString;
	/** Unique visitors in this bucket. */
	visits: number;
	/** Total requests in this bucket. */
	requests: number;
	/** Response bytes served in this bucket. */
	bytes: number;
}

/**
 * Aggregated edge analytics returned by `/v2/apps/{appId}/network/analytics`.
 * Each breakdown is an array of 15-minute buckets. The endpoint requires
 * `start`/`end` ISO timestamps (max 7 days retention; `start` is clamped to
 * the application's creation date).
 *
 * - `referers`: empty referer strings are normalized to `type: "Direct"`.
 * - `providers`: ASN breakdown — Square Cloud's own ASN is normalized to
 *   `type: "SQUARE-CLOUD-PLATFORM"`.
 *
 * The endpoint may also return an empty object `{}` when the requested window
 * precedes the application's creation date — see {@link APINetworkAnalyticsPayload}.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/analytics
 */
export interface APINetworkAnalytics {
	visits: APINetworkAnalyticsTimeBucket[];
	countries: APINetworkAnalyticsBucket[];
	devices: APINetworkAnalyticsBucket[];
	os: APINetworkAnalyticsBucket[];
	browsers: APINetworkAnalyticsBucket[];
	protocols: APINetworkAnalyticsBucket[];
	methods: APINetworkAnalyticsBucket[];
	paths: APINetworkAnalyticsBucket[];
	referers: APINetworkAnalyticsBucket[];
	providers: APINetworkAnalyticsBucket[];
}

/**
 * Payload of `/v2/apps/{appId}/network/analytics`. `response` may be an empty
 * object `{}` when the requested window precedes the application's creation
 * date — guard with `'visits' in payload.response` before accessing fields.
 */
export type APINetworkAnalyticsPayload = APIPayload<
	APINetworkAnalytics | Record<string, never>
>;

/**
 * SSL validation state for a custom domain attached to an application.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/dns
 */
export type APINetworkDNSStatus = "pending" | "pending_validation" | "active";
export const APINetworkDNSStatus = {
	Pending: "pending",
	PendingValidation: "pending_validation",
	Active: "active",
} as const;

/**
 * DNS record the user must add at their registrar so the edge provider can
 * validate ownership of the custom domain.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/dns
 */
export interface APINetworkDNSOwnership {
	/** DNS record type, e.g. `"TXT"`. */
	type: string;
	/** Record name to create at the registrar. */
	name: string;
	/** Record value to set. */
	value: string;
}

/**
 * SSL status block returned alongside the ownership record.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/dns
 */
export interface APINetworkDNSSSL {
	status: APINetworkDNSStatus;
}

/**
 * Response of `GET /v2/apps/{appId}/network/dns` — DNS records the user must
 * configure plus the current SSL validation state.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/dns
 */
export interface APINetworkDNS {
	ownership: APINetworkDNSOwnership;
	ssl: APINetworkDNSSSL;
}

export type APINetworkDNSPayload = APIPayload<APINetworkDNS>;

/**
 * Summary block of the edge errors response.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/errors
 */
export interface APINetworkErrorsSummary {
	total: number;
	by_class: {
		"4xx": number;
		"5xx": number;
	};
}

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/errors
 */
export interface APINetworkErrorsByStatus {
	status: number;
	requests: number;
}

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/errors
 */
export interface APINetworkErrorsTimeseries {
	date: ISODateString;
	/** Status-code → count map for the bucket. */
	buckets: Record<string, number>;
	total: number;
}

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/errors
 */
export interface APINetworkErrorsTopPath {
	path: string;
	/** HTTP method. `null` when the edge couldn't attribute one. */
	method: string | null;
	total: number;
	/** Map of HTTP status code (as string) to request count. */
	by_status: Record<string, number>;
}

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/errors
 */
export interface APINetworkErrorsByMethod {
	/** HTTP method. `null` when the edge couldn't attribute one. */
	method: string | null;
	total: number;
	/** Map of HTTP status code (as string) to request count. */
	by_status: Record<string, number>;
}

/**
 * Aggregated edge error breakdown returned by `/v2/apps/{appId}/network/errors`.
 *
 * **Note:** `by_status` at the top level is a flat **array** of
 * `{ status, requests }`, while the nested `by_status` maps inside `top_paths`
 * and `by_method` are objects keyed by status code.
 *
 * May also be an empty object `{}` when the requested window precedes the
 * application's creation date — see {@link APINetworkErrorsPayload}.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/errors
 */
export interface APINetworkErrors {
	summary: APINetworkErrorsSummary;
	by_status: APINetworkErrorsByStatus[];
	timeseries: APINetworkErrorsTimeseries[];
	top_paths: APINetworkErrorsTopPath[];
	by_method: APINetworkErrorsByMethod[];
}

/**
 * Payload of `/v2/apps/{appId}/network/errors`. `response` may be an empty
 * object `{}` when the requested window precedes the application's creation
 * date — guard with `'summary' in payload.response` before accessing fields.
 */
export type APINetworkErrorsPayload = APIPayload<
	APINetworkErrors | Record<string, never>
>;

/**
 * Client info embedded in each edge log entry.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/logs
 */
export interface APINetworkLogClient {
	ip: string | null;
	country: string | null;
	location: string | null;
	asn: string;
	agent: string | null;
	category: string | null;
}

/**
 * Request info embedded in each edge log entry.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/logs
 */
export interface APINetworkLogRequest {
	mitigated: boolean;
	method: string;
	host: string;
	path: string;
	query: string | null;
	protocol: string;
	referer: string | null;
}

/**
 * Response info embedded in each edge log entry.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/logs
 */
export interface APINetworkLogResponse {
	status: number;
	contentType: string | null;
	cache: string | null;
}

/**
 * A single edge log entry. Available on Pro+ plans.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/logs
 */
export interface APINetworkLog {
	timestamp: ISODateString;
	client: APINetworkLogClient;
	request: APINetworkLogRequest;
	response: APINetworkLogResponse;
}

export type APINetworkLogs = APINetworkLog[];
export type APINetworkLogsPayload = APIPayload<APINetworkLogs>;

/**
 * Latency percentile triple used by the performance endpoint.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/performance
 */
export interface APINetworkLatency {
	p50: number;
	p95: number;
	p99: number;
}

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/performance
 */
export interface APINetworkPerformanceSummary {
	edge: APINetworkLatency;
	origin: APINetworkLatency;
	requests: number;
}

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/performance
 */
export interface APINetworkPerformanceTimeseries {
	date: ISODateString;
	requests: number;
	edge: APINetworkLatency;
	origin: APINetworkLatency;
}

/**
 * Per-country latency breakdown. `type` is the country name as resolved by the
 * edge provider (e.g. `"Brazil"`).
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/performance
 */
export interface APINetworkPerformanceCountry {
	type: string;
	p50: number;
	p95: number;
	requests: number;
}

/**
 * Per-colo (datacenter) latency breakdown. `type` is the IATA-like colo code
 * (e.g. `"GRU"`).
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/performance
 */
export interface APINetworkPerformanceColo {
	type: string;
	city: string;
	country: string;
	p50: number;
	p95: number;
	requests: number;
}

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/performance
 */
export interface APINetworkPerformanceSlowestPath {
	path: string;
	p95: number;
	p99: number;
	requests: number;
}

/**
 * Latency percentiles plus per-country/per-colo breakdowns and the slowest
 * paths. Available on Pro+ plans.
 *
 * May also be an empty object `{}` when the requested window precedes the
 * application's creation date — see {@link APINetworkPerformancePayload}.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/performance
 */
export interface APINetworkPerformance {
	summary: APINetworkPerformanceSummary;
	timeseries: APINetworkPerformanceTimeseries[];
	countries: APINetworkPerformanceCountry[];
	colos: APINetworkPerformanceColo[];
	slowest_paths: APINetworkPerformanceSlowestPath[];
}

/**
 * Payload of `/v2/apps/{appId}/network/performance`. `response` may be an
 * empty object `{}` when the requested window precedes the application's
 * creation date — guard with `'summary' in payload.response` before accessing
 * fields.
 */
export type APINetworkPerformancePayload = APIPayload<
	APINetworkPerformance | Record<string, never>
>;

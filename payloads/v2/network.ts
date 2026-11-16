import type { APIPayload, ApplicationId, ISODateString } from "../../common/v2";

/**
 * One 15-minute window of the `visits` time series. It has no `type` field,
 * because time itself is the dimension.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/analytics
 */
export interface APINetworkAnalyticsTimeBucket {
	/** When the 15-minute window starts. */
	date: ISODateString;
	/** The number of unique visitors. */
	visits: number;
	/** The number of requests. */
	requests: number;
	/** The response bytes served. */
	bytes: number;
	/** The request bytes received from visitors, such as uploads and request bodies. */
	bytes_in?: number;
}

/**
 * One 15-minute window of a breakdown, for one value of its dimension, such
 * as a country, an HTTP method, a browser or a network.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/analytics
 */
export interface APINetworkAnalyticsBucket {
	/** The value of the dimension, such as `GET` in the `methods` breakdown. */
	type: string;
	/** When the 15-minute window starts. */
	date: ISODateString;
	/** The number of unique visitors. */
	visits: number;
	/** The number of requests. */
	requests: number;
	/** The response bytes served. */
	bytes: number;
}

/**
 * One value of a breakdown that totals the whole requested window instead of
 * 15-minute windows. The `ips`, `status_codes`, `bots` and `content_types`
 * breakdowns use it.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/analytics
 */
export interface APINetworkAnalyticsTotalBucket {
	/** The value of the dimension, such as `404` in the `status_codes` breakdown. */
	type: string;
	/** The number of unique visitors. */
	visits: number;
	/** The number of requests. */
	requests: number;
	/** The response bytes served. */
	bytes: number;
}

/**
 * Edge analytics of the traffic to an application's default domain and
 * custom domain, broken down by time, country, device, browser and more.
 *
 * Analytics are kept for 7 days, and a window that starts before the
 * application was created is moved to its creation date. The response is an
 * empty object when the requested window starts before that date, as
 * {@link APINetworkAnalyticsPayload} shows.
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
	/** Traffic by referer. Requests without a referer have `type: "Direct"`. */
	referers: APINetworkAnalyticsBucket[];
	/**
	 * Traffic by client network. Each `type` reads `"NAME (ASN)"`, such as
	 * `"GOOGLE (15169)"`, and Square Cloud's own network reads
	 * `"SQUARE-CLOUD-PLATFORM"`.
	 */
	providers: APINetworkAnalyticsBucket[];
	/**
	 * The client IPs with the most requests over the whole window. IPs from
	 * Square Cloud's own network are masked as `X.X.XXX.XXX`.
	 */
	ips: APINetworkAnalyticsTotalBucket[];
	/** The response status codes over the whole window, of every class and not only errors. */
	status_codes: APINetworkAnalyticsTotalBucket[];
	/**
	 * Verified bot categories over the whole window. Traffic without a
	 * verified bot category has `type: "Unverified"`.
	 */
	bots: APINetworkAnalyticsTotalBucket[];
	/**
	 * Response content types over the whole window. Unknown content types
	 * have `type: "Unknown"`.
	 */
	content_types: APINetworkAnalyticsTotalBucket[];
}

/**
 * The response envelope of the network analytics.
 *
 * `response` is an empty object when the requested window starts before the
 * application was created, so check for `visits` with
 * `"visits" in payload.response` before you read the fields.
 */
export type APINetworkAnalyticsPayload = APIPayload<
	APINetworkAnalytics | Record<string, never>
>;

/**
 * The type of a DNS record. A `txt` record proves ownership or validates the
 * SSL certificate. A `cname` record routes traffic, or, with `fallback`,
 * delegates the SSL validation.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/dns
 */
export type APINetworkDNSRecordType = "txt" | "cname";
/** The {@link APINetworkDNSRecordType} values by name. */
export const APINetworkDNSRecordType = {
	TXT: "txt",
	CNAME: "cname",
} as const;

/**
 * The known validation states of a DNS record. The edge network sets
 * `status`, so other values can appear.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/dns
 */
export type APINetworkDNSStatus = "pending" | "pending_validation" | "active";
/** The {@link APINetworkDNSStatus} values by name. */
export const APINetworkDNSStatus = {
	Pending: "pending",
	PendingValidation: "pending_validation",
	Active: "active",
} as const;

/**
 * One DNS record you must create at your DNS provider so the custom domain
 * validates and receives traffic.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/dns
 */
export interface APINetworkDNSRecord {
	type: APINetworkDNSRecordType;
	/** The record name to create at your DNS provider. */
	name: string;
	/** The record value. The traffic `cname` always points at `cname.squareweb.app`. */
	value: string;
	/**
	 * The validation state, such as `pending`, `pending_validation` or
	 * `active`, as the edge network reports it (see
	 * {@link APINetworkDNSStatus}). The `cname` and the ownership `txt` carry
	 * the hostname's state, and an SSL `txt` named `_acme-challenge` carries
	 * the certificate's state.
	 */
	status: string;
	/**
	 * Up to 3 validation messages from the edge network, in English. They
	 * appear only on a record that is not `active` yet, and only when the
	 * edge network reported why.
	 */
	errors?: string[];
	/**
	 * `true` only on the SSL validation delegation, a single `_acme-challenge`
	 * `cname` you can create instead of every SSL `txt` record, but never
	 * together with them. It never changes, so certificate renewals need no
	 * DNS changes. It does not count when deciding whether the domain is
	 * fully set up.
	 */
	fallback?: boolean;
}

/**
 * The DNS records you must create for an application's custom domain, with
 * their current validation state. The domain is fully set up when every
 * record without `fallback` is `active`.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/dns
 */
export type APINetworkDNS = APINetworkDNSRecord[];

/** The response envelope that carries an {@link APINetworkDNS}. */
export type APINetworkDNSPayload = APIPayload<APINetworkDNS>;

/**
 * The totals of the network error breakdown.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/errors
 */
export interface APINetworkErrorsSummary {
	/** The number of error responses in the window. */
	total: number;
	/** The number of error responses by status class. */
	by_class: {
		"4xx": number;
		"5xx": number;
	};
}

/**
 * The number of error responses with one status code.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/errors
 */
export interface APINetworkErrorsByStatus {
	/** The HTTP status code. */
	status: number;
	/** The number of requests answered with it. */
	requests: number;
}

/**
 * One time window of the network error breakdown.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/errors
 */
export interface APINetworkErrorsTimeseries {
	/** When the window starts. */
	date: ISODateString;
	/** The number of requests by HTTP status code, with the code as a string key. */
	buckets: Record<string, number>;
	/** The number of error responses in the window. */
	total: number;
}

/**
 * A request path that failed often, with its errors by status code.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/errors
 */
export interface APINetworkErrorsTopPath {
	/** The request path. */
	path: string;
	/** The HTTP method. It is `null` when the edge could not tell which one. */
	method: string | null;
	/** The number of error responses on this method and path. */
	total: number;
	/** The number of requests by HTTP status code, with the code as a string key. */
	by_status: Record<string, number>;
}

/**
 * The errors of one HTTP method, by status code.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/errors
 */
export interface APINetworkErrorsByMethod {
	/** The HTTP method. It is `null` when the edge could not tell which one. */
	method: string | null;
	/** The number of error responses with this method. */
	total: number;
	/** The number of requests by HTTP status code, with the code as a string key. */
	by_status: Record<string, number>;
}

/**
 * The HTTP errors the edge served for an application's default domain and
 * custom domain: totals, a time series, the paths that failed most and a
 * breakdown by method.
 *
 * The top-level `by_status` is an array of `{ status, requests }`, while the
 * `by_status` fields inside `top_paths` and `by_method` are objects keyed by
 * status code. The totals and arrays are empty when the window has no
 * matching errors or starts before the application was created.
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
 * The response envelope of the network error breakdown. The type also allows
 * an empty object, so check for `summary` with
 * `"summary" in payload.response` before you read the fields.
 */
export type APINetworkErrorsPayload = APIPayload<
	APINetworkErrors | Record<string, never>
>;

/**
 * The client of one request in the network logs.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/logs
 */
export interface APINetworkLogClient {
	ip: string | null;
	country: string | null;
	location: string | null;
	/** The client network, such as `12345 - Example ISP`. */
	asn: string;
	/** The client's user agent. */
	agent: string | null;
	category: string | null;
}

/**
 * The request of one entry in the network logs.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/logs
 */
export interface APINetworkLogRequest {
	mitigated: boolean;
	method: string;
	host: string;
	path: string;
	/** The query string, such as `?limit=10`. */
	query: string | null;
	/** The HTTP protocol, such as `HTTP/2`. */
	protocol: string;
	referer: string | null;
}

/**
 * The response of one entry in the network logs.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/logs
 */
export interface APINetworkLogResponse {
	/** The HTTP status code. */
	status: number;
	contentType: string | null;
	/** The edge cache result, such as `MISS`. */
	cache: string | null;
}

/**
 * One request in the network logs of an application. Network logs are
 * available on the Pro and Enterprise plans.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/logs
 */
export interface APINetworkLog {
	/** When the request arrived. */
	timestamp: ISODateString;
	client: APINetworkLogClient;
	request: APINetworkLogRequest;
	response: APINetworkLogResponse;
}

/** The network logs of an application, one entry per request. */
export type APINetworkLogs = APINetworkLog[];
/** The response envelope that carries {@link APINetworkLogs}. */
export type APINetworkLogsPayload = APIPayload<APINetworkLogs>;

/**
 * The 50th, 95th and 99th latency percentiles, in milliseconds. Each value
 * is `null` when there are no samples.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/performance
 */
export interface APINetworkLatency {
	p50: number | null;
	p95: number | null;
	p99: number | null;
}

/**
 * The latency over the whole window. `edge` is the time to first byte at the
 * edge and `origin` is how long the application took to respond.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/performance
 */
export interface APINetworkPerformanceSummary {
	edge: APINetworkLatency;
	origin: APINetworkLatency;
	/** The number of requests measured. */
	requests: number;
}

/**
 * The latency of one time window.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/performance
 */
export interface APINetworkPerformanceTimeseries {
	/** When the window starts. */
	date: ISODateString;
	/** The number of requests measured. */
	requests: number;
	edge: APINetworkLatency;
	origin: APINetworkLatency;
}

/**
 * The latency of the requests from one country.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/performance
 */
export interface APINetworkPerformanceCountry {
	/** The country. */
	type: string;
	/** The median latency in milliseconds, or `null` without samples. */
	p50: number | null;
	/** The 95th percentile latency in milliseconds, or `null` without samples. */
	p95: number | null;
	/** The number of requests measured. */
	requests: number;
}

/**
 * The latency of the requests served by one edge location.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/performance
 */
export interface APINetworkPerformanceColo {
	/** The code of the edge location. */
	type: string;
	city: string | null;
	country: string | null;
	/** The median latency in milliseconds, or `null` without samples. */
	p50: number | null;
	/** The 95th percentile latency in milliseconds, or `null` without samples. */
	p95: number | null;
	/** The number of requests measured. */
	requests: number;
}

/**
 * A request path with one of the highest latencies.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/network/performance
 */
export interface APINetworkPerformanceSlowestPath {
	/** The request path. */
	path: string;
	/** The 95th percentile latency in milliseconds, or `null` without samples. */
	p95: number | null;
	/** The 99th percentile latency in milliseconds, or `null` without samples. */
	p99: number | null;
	/** The number of requests measured. */
	requests: number;
}

/**
 * The latency of an application's default domain and custom domain, by time,
 * country and edge location, with the slowest paths. Network performance is
 * available on the Pro and Enterprise plans.
 *
 * The response is an empty object when the requested window starts before
 * the application was created, as {@link APINetworkPerformancePayload} shows.
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
 * The response envelope of the network performance. `response` is an empty
 * object when the requested window starts before the application was
 * created, so check for `summary` with `"summary" in payload.response` before
 * you read the fields.
 */
export type APINetworkPerformancePayload = APIPayload<
	APINetworkPerformance | Record<string, never>
>;

/**
 * The kind of a hostname: `subdomain` for the default `*.squareweb.app`
 * hostname and `custom` for an attached custom domain.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/domains
 */
export type APIAppDomainType = "subdomain" | "custom";
/** The {@link APIAppDomainType} values by name. */
export const APIAppDomainType = {
	Subdomain: "subdomain",
	Custom: "custom",
} as const;

/**
 * One hostname of one of your applications.
 *
 * The domain listing shows custom domains first, then default subdomains,
 * and leaves out applications without a web domain. It does not count
 * against the network limits of each application, and you can call it up to
 * 20 times a minute.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/domains
 */
export interface APIAppDomain {
	/** The application the hostname belongs to. */
	app_id: ApplicationId;
	/** The fully qualified hostname. */
	hostname: string;
	type: APIAppDomainType;
}

/** The response envelope that carries a list of {@link APIAppDomain}. */
export type APIAppDomainsPayload = APIPayload<APIAppDomain[]>;

/**
 * An application that serves a custom domain.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/load-balancers
 */
export interface APILoadBalancerApp {
	id: ApplicationId;
	/** The application name. */
	name: string;
	/** The cluster that hosts the application. */
	cluster?: string;
}

/**
 * One custom domain and the applications that serve it. With two or more
 * applications, the domain is an active load balancer: the edge spreads
 * traffic across them and fails over when one is offline.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/load-balancers
 */
export interface APILoadBalancer {
	/** The custom domain. */
	hostname: string;
	/** The applications that serve the domain. */
	apps: APILoadBalancerApp[];
}

/**
 * Your applications grouped by the custom domain they serve. You can call
 * the listing up to 20 times a minute.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/load-balancers
 */
export interface APILoadBalancers {
	/**
	 * How many applications can share one domain on your plan: 2 on
	 * Standard, 5 on Pro and 10 on Enterprise.
	 */
	limit: number;
	/** The custom domains. It is empty when no application has a custom domain. */
	balancers: APILoadBalancer[];
}

/** The response envelope that carries {@link APILoadBalancers}. */
export type APILoadBalancersPayload = APIPayload<APILoadBalancers>;

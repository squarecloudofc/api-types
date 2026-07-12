import type { APIPayload, ISODateString } from "../../common/v2";

/**
 * A single point of the 24h metrics window. The endpoint returns up to 288
 * points (24h sampled every 5 minutes).
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/metrics
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/metrics
 */
export interface APIMetricPoint {
	date: ISODateString;
	cpu: number;
	ram: number;
	net: number[];
}

/**
 * Time series returned by `/apps/{appId}/metrics` and
 * `/databases/{databaseId}/metrics`.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/metrics
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/metrics
 */
export type APIMetrics = APIMetricPoint[];

export type APIMetricsPayload = APIPayload<APIMetrics>;

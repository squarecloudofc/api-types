import type { APIPayload, ISODateString } from "../../common/v2";

/**
 * One point of an application's or database's usage history.
 *
 * The default `24h` range has up to 288 points, one every 5 minutes, and an
 * application below 512 MB gets one every 10 minutes, up to 144 points. The
 * `7d` range has up to 168 hourly points, where `cpu` and `ram` are the
 * hour's average and `cpu_max` and `ram_max` are its peak.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/metrics
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/metrics
 */
export interface APIMetricPoint {
	/** When the point was measured. */
	date: ISODateString;
	/** The CPU usage, as a percentage of the plan's CPU. */
	cpu: number;
	/** The memory in use, in MB. */
	ram: number;
	/**
	 * Bytes received and bytes sent, as `[received, sent]`. Both count up
	 * from the moment the container started, so a value lower than the
	 * previous point's means it restarted.
	 */
	net: number[];
	/**
	 * Bytes read and bytes written, as `[read, written]`, counted from the
	 * moment the container started. It is `null` on a point without a
	 * reading.
	 */
	disk?: number[] | null;
	/** The bytes the container's disk holds. It is `null` on a point without a reading. */
	storage?: number | null;
	/** The hour's peak CPU usage, as a percentage of the plan's CPU. Only `7d` points have it. */
	cpu_max?: number;
	/** The hour's peak memory in use, in MB. Only `7d` points have it. */
	ram_max?: number;
}

/**
 * The usage history of an application or database, newest point first. It
 * is an empty array when the resource has no recent data.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/metrics
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/metrics
 */
export type APIMetrics = APIMetricPoint[];

/** The response envelope that carries {@link APIMetrics}. */
export type APIMetricsPayload = APIPayload<APIMetrics>;

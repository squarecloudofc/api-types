/**
 * Query of `GET /v2/apps/{appId}/metrics` and
 * `GET /v2/databases/{databaseId}/metrics`.
 *
 * `7d` returns hourly points on the Pro and Enterprise plans, and for an
 * application only when it has 512 MB or more. Other plans and smaller
 * applications get the last 24 hours instead of an error. Any other value
 * fails with 400 `INVALID_PARAMETERS`.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/metrics
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/metrics
 */
export interface RESTGetAPIMetricsQuery {
	/** How far back the history goes. It defaults to `24h`. */
	range?: "24h" | "7d";
}

import type { APIPayload } from "../../common/v2";

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/deploy/webhooks
 */
export interface RESTPostAPIGithubWebhookJSONBody {
	access_token: string;
}

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/deploy/webhooks
 */
export interface RESTPostAPIGithubWebhookResult {
	webhook: string;
}

export type RESTPostAPIGithubWebhookResultPayload =
	APIPayload<RESTPostAPIGithubWebhookResult>;

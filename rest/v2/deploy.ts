import { APIPayload } from "../../common";

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/deploy/webhooks
 */
export interface RESTPostAPIGithubWebhookJSONBody {
  access_token: string;
}

export interface RESTPostAPIGithubWebhookResult {
  webhook: string;
}

export type RESTPostAPIGithubWebhookResultPayload = APIPayload<RESTPostAPIGithubWebhookResult>;

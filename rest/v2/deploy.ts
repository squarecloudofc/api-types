import type { APIPayloadStatusOnly } from "../../common/v2";

/**
 * Body for `POST /v2/apps/{appId}/deploy/webhook`. Pass a GitHub personal
 * access token (`ghp_*` / `github_pat_*`) to enroll, or `@` to remove the
 * existing webhook.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/deploy/webhooks
 */
export interface RESTPostAPIGithubWebhookJSONBody {
	access_token: string;
}

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/deploy/webhooks
 */
export interface RESTPostAPIGithubWebhookResult {
	webhook: string;
}

/**
 * Payload of `POST /v2/apps/{appId}/deploy/webhook`. `response` is **present
 * when configuring** (token enrollment) and **absent when removing**
 * (`access_token: "@"`).
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/deploy/webhooks
 */
export interface RESTPostAPIGithubWebhookResultPayload
	extends APIPayloadStatusOnly {
	response?: RESTPostAPIGithubWebhookResult;
}

/**
 * Link a GitHub repository via the Square Cloud GitHub App. Requires a session
 * token (not an API key).
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/deploy/github-app
 */
export interface RESTPostAPIGithubAppJSONBody {
	/** Full repository name, e.g. `octocat/hello-world`. */
	repositoryName: string;
	/** Branch to track. Max length 256 chars. */
	repositoryBranch: string;
}

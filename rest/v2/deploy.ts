import type { APIPayloadStatusOnly } from "../../common/v2";

/**
 * Body of `POST /v2/apps/{appId}/deploy/webhook`, which sets up or removes
 * the deploy webhook that deploys the application on each push.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/deploy/webhooks
 */
export interface RESTPostAPIGithubWebhookJSONBody {
	/**
	 * A GitHub personal access token, starting with `ghp_` or `github_pat_`,
	 * to set up the webhook, or `@` to remove it. Any other value fails with
	 * 400 `INVALID_ACCESS_TOKEN`.
	 */
	access_token: string;
}

/**
 * The webhook set up by `POST /v2/apps/{appId}/deploy/webhook`.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/deploy/webhooks
 */
export interface RESTPostAPIGithubWebhookResult {
	/** The webhook URL to add to your repository. It is a deploy credential, so keep it private. */
	webhook: string;
}

/**
 * Response of `POST /v2/apps/{appId}/deploy/webhook`. `response` is present
 * when you set up the webhook and absent when you remove it with
 * `access_token: "@"`.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/deploy/webhooks
 */
export interface RESTPostAPIGithubWebhookResultPayload
	extends APIPayloadStatusOnly {
	response?: RESTPostAPIGithubWebhookResult;
}

/**
 * Body of `POST /v2/apps/{appId}/deploy/github-app`, which links the
 * application to a branch of a GitHub repository through the Square Cloud
 * GitHub App.
 *
 * Your GitHub account must be connected, a Square Cloud GitHub App
 * installation of that account must cover the repository, and the account
 * needs write access to it. Otherwise the link fails with 403
 * `GITHUB_NOT_CONNECTED`, `REPOSITORY_NOT_AVAILABLE` or
 * `REPOSITORY_PERMISSION_REQUIRED`.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/deploy/github-app
 */
export interface RESTPostAPIGithubAppJSONBody {
	/** The full repository name, such as `octocat/hello-world`. */
	repositoryName: string;
	/**
	 * The branch to deploy from, up to 256 characters. No other application
	 * may already link the same repository and branch.
	 */
	repositoryBranch: string;
}

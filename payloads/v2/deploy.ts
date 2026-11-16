import type { APIPayload, ISODateString } from "../../common/v2";

/**
 * The step a deploy has reached. A deploy goes through `pending`, `clone`,
 * `commit`, `restarting` and `success`, and a failed deploy ends in `error`.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/deploy/list
 */
export type DeploymentState =
	| "pending"
	| "clone"
	| "commit"
	| "restarting"
	| "success"
	| "error";
/** The {@link DeploymentState} values by name. */
export const DeploymentState = {
	Pending: "pending",
	Clone: "clone",
	Commit: "commit",
	Restarting: "restarting",
	Success: "success",
	Error: "error",
} as const;

/**
 * The files a deploy changed, sent with its `commit` step.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/deploy/list
 */
export interface APIDeploymentCommitFiles {
	added: string[];
	removed: string[];
	modified: string[];
}

interface APIDeploymentBase {
	/** The commit SHA, 40 hexadecimal characters. Every event of one deploy shares it. */
	id: string;
	/** When the event happened. */
	date: ISODateString;
	/** Always `git`, because only Git deploys from the webhook or the GitHub App are recorded. */
	source: "git";
}

/**
 * One event in the life of a deploy. `state` tells which extra fields the
 * event has.
 *
 * - A `clone` event has `branch`.
 * - A `commit` event has `files`.
 * - An `error` event may have `code`, which says why it failed, and
 *   `message`.
 * - Other events have only the shared fields.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/deploy/list
 */
export type APIDeployment =
	| (APIDeploymentBase & { state: "pending" })
	| (APIDeploymentBase & { state: "clone"; branch: string })
	| (APIDeploymentBase & { state: "commit"; files: APIDeploymentCommitFiles })
	| (APIDeploymentBase & { state: "restarting" })
	| (APIDeploymentBase & { state: "success" })
	| (APIDeploymentBase & {
			state: "error";
			/** Why the deploy failed, such as `AUTHENTICATION_REQUIRED`, `INVALID_BRANCH` or `CLONE_FAILED`. */
			code?: string;
			/** Details of the failure, when there are any. */
			message?: string;
	  });

/**
 * The response envelope of an application's recent deploys.
 *
 * `response` is an array of deploys, and each deploy is an array of its
 * events in the order they happened, all with the same `id`. It is an empty
 * array when no deploy has been recorded.
 */
export type APIDeployPayload = APIPayload<APIDeployment[][]>;

/**
 * The GitHub repository linked to an application through the Square Cloud
 * GitHub App.
 *
 * The three fields are normally all set. To tell whether a repository is
 * linked, check whether {@link APIDeploymentCurrent.app} is present, not
 * whether one of these fields is `null`.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/deploy/info
 */
export interface APIDeploymentCurrentGithubApp {
	/** The numeric GitHub repository id. */
	id: number | null;
	/** The full repository name, such as `octocat/hello-world`. */
	name: string | null;
	/** The branch that triggers deploys. */
	branch: string | null;
}

/**
 * The Git deploy setup of an application. `app`, `webhook` or both may be
 * present, and an absent `app` means no GitHub App repository is linked.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/deploy/info
 */
export interface APIDeploymentCurrent {
	app?: APIDeploymentCurrentGithubApp;
	/**
	 * The deploy webhook URL. It is a deploy credential, so callers that may
	 * not configure it get it masked as `.../webhook/********`, which still
	 * shows that a webhook is set.
	 */
	webhook?: string;
}

/** The response envelope that carries an {@link APIDeploymentCurrent}. */
export type APIDeploymentCurrentPayload = APIPayload<APIDeploymentCurrent>;

/**
 * The repository and branch linked to an application through the Square
 * Cloud GitHub App.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/deploy/github-app
 */
export interface APIGithubAppRepository {
	/** The GitHub repository id. */
	id: number;
	/** The repository as `owner/name`, in the form GitHub reports it, whatever case or form you sent. */
	full_name: string;
	/** The branch that triggers deploys. */
	branch: string;
}

/**
 * The repository linked when you link an application through the Square
 * Cloud GitHub App.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/deploy/github-app
 */
export interface APIGithubAppLinkResponse {
	repository: APIGithubAppRepository;
}

/** The response envelope that carries an {@link APIGithubAppLinkResponse}. */
export type APIGithubAppLinkPayload = APIPayload<APIGithubAppLinkResponse>;

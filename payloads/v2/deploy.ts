import type { APIPayload, ISODateString } from "../../common/v2";

/**
 * APIDeployment#state — lifecycle step of a single deploy.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/deploy/list
 */
export type DeploymentState =
	| "pending"
	| "clone"
	| "commit"
	| "restarting"
	| "success"
	| "error";
export const DeploymentState = {
	Pending: "pending",
	Clone: "clone",
	Commit: "commit",
	Restarting: "restarting",
	Success: "success",
	Error: "error",
} as const;

/**
 * Changed-file list emitted alongside the `commit` step of a deploy timeline.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/deploy/list
 */
export interface APIDeploymentCommitFiles {
	added: string[];
	removed: string[];
	modified: string[];
}

interface APIDeploymentBase {
	/** Commit SHA-1 (40 hex chars). Shared by every event of a single deploy. */
	id: string;
	date: ISODateString;
}

/**
 * One event in the lifecycle of a deploy. `state` discriminates which extra
 * fields are present:
 * - `clone` carries `branch`
 * - `commit` carries `files`
 * - other states carry only the base fields
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/deploy/list
 */
export type APIDeployment =
	| (APIDeploymentBase & { state: "pending" })
	| (APIDeploymentBase & { state: "clone"; branch: string })
	| (APIDeploymentBase & { state: "commit"; files: APIDeploymentCommitFiles })
	| (APIDeploymentBase & { state: "restarting" })
	| (APIDeploymentBase & { state: "success" })
	| (APIDeploymentBase & { state: "error" });

/**
 * Payload of `GET /v2/apps/{appId}/deployments`. `response` is a **nested**
 * array — outer element is the list of recent deploys, inner element is the
 * timeline of events for that deploy (sharing the same `id`).
 */
export type APIDeployPayload = APIPayload<APIDeployment[][]>;

/**
 * GitHub App repository linked to an application via
 * `/v2/apps/{appId}/deployments/current`. The three fields are always written
 * together by the backend — to detect that no GitHub App is linked, check
 * whether `APIDeploymentCurrent.app` itself is omitted, not whether an
 * individual field is `null`.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/deploy/info
 */
export interface APIDeploymentCurrentGithubApp {
	id: number | null;
	name: string | null;
	branch: string | null;
}

/**
 * Current Git deploy configuration for an application. Either `app` (GitHub
 * App linkage), `webhook` (legacy webhook URL), or both may be present.
 * An absent `app` means no GitHub App linkage is configured.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/deploy/info
 */
export interface APIDeploymentCurrent {
	app?: APIDeploymentCurrentGithubApp;
	webhook?: string;
}

export type APIDeploymentCurrentPayload = APIPayload<APIDeploymentCurrent>;

/**
 * Repository linked through `POST /v2/apps/{appId}/deploy/github-app`.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/deploy/github-app
 */
export interface APIGithubAppRepository {
	id: number;
	full_name: string;
	branch: string;
}

/**
 * Response body of `POST /v2/apps/{appId}/deploy/github-app`.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/deploy/github-app
 */
export interface APIGithubAppLinkResponse {
	repository: APIGithubAppRepository;
}

export type APIGithubAppLinkPayload = APIPayload<APIGithubAppLinkResponse>;

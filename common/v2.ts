import type { Brand } from "../utils";

export type APIPayloadStatus = "error" | "success";

export interface APIPayload<TResponse> {
	status: APIPayloadStatus;
	response: TResponse;
	/** Machine-readable error code, present on errors. See {@link APIErrorCode}. */
	code?: APIErrorCode | (string & {});
	/** Human-readable error details, present on some errors. */
	message?: string;
}

export interface APIPayloadStatusOnly {
	status: APIPayloadStatus;
}

export interface APIHeaders {
	Authorization: string;
}

export type APIVersion<TVersion extends number> = `v${TVersion}`;

/**
 * Machine-readable error codes returned in `APIPayload#code`.
 *
 * Names follow the standardized convention
 * `INVALID_X` / `X_FAILED` / `X_NOT_FOUND` / `X_LIMIT_REACHED`.
 *
 * The list grows over time: treat a code you do not know as a generic failure
 * of the HTTP status it came with.
 */
export const APIErrorCode = {
	// Auth / plan gates
	/** 401: missing, malformed, invalid or expired credentials. */
	ACCESS_DENIED: "ACCESS_DENIED",
	/** 403: the workspace member's role does not allow this operation. */
	PERMISSION_DENIED: "PERMISSION_DENIED",
	/** 403: the API key lacks the scope this operation requires. */
	MISSING_SCOPE: "MISSING_SCOPE",
	/** 403: the API key is restricted to resources that do not cover this request. */
	RESOURCE_NOT_ALLOWED: "RESOURCE_NOT_ALLOWED",
	/** 403: the API key cannot grant a workspace role beyond its own scopes. */
	SCOPE_NOT_GRANTABLE: "SCOPE_NOT_GRANTABLE",
	/** 400: blob scopes cannot be combined with a resource restriction on an API key. */
	CONFLICTING_RESOURCES: "CONFLICTING_RESOURCES",
	INVALID_ACCESS_TOKEN: "INVALID_ACCESS_TOKEN",
	UPGRADE_REQUIRED: "UPGRADE_REQUIRED",

	// Rate limiting
	/** Short temporary 429 — retry after a few seconds. */
	KEEP_CALM: "KEEP_CALM",
	/**
	 * 429 on the account/API key (or an IP blocked for invalid keys, which can
	 * last ~30 minutes), on the app network endpoints and on
	 * `GET /users/snapshots`.
	 */
	RATE_LIMITED: "RATE_LIMITED",
	/** Plan's daily snapshot quota exhausted (429) — distinct from KEEP_CALM. */
	DAILY_SNAPSHOTS_LIMIT_REACHED: "DAILY_SNAPSHOTS_LIMIT_REACHED",

	// Platform availability
	/** 503: the platform database is temporarily unavailable. Retry in a few seconds. */
	DATABASE_UNAVAILABLE: "DATABASE_UNAVAILABLE",
	/** The cluster hosting the resource did not answer in time. */
	CLUSTER_TIMEOUT: "CLUSTER_TIMEOUT",
	/** The cluster hosting the resource is unreachable. */
	CLUSTER_UNAVAILABLE: "CLUSTER_UNAVAILABLE",
	/** The request to the cluster was aborted before it completed. */
	REQUEST_ABORTED: "REQUEST_ABORTED",
	/** 404: no route matches the method and path. */
	ROUTE_NOT_FOUND: "ROUTE_NOT_FOUND",

	// Generic validation / transport
	INVALID_ID: "INVALID_ID",
	INVALID_CODE: "INVALID_CODE",
	INVALID_NAME: "INVALID_NAME",
	/** 400: the memory value is not an integer number of MB. */
	INVALID_MEMORY: "INVALID_MEMORY",
	INVALID_INPUT: "INVALID_INPUT",
	INVALID_PARAMETERS: "INVALID_PARAMETERS",
	INVALID_JSON_BODY: "INVALID_JSON_BODY",
	INVALID_CONTENT_TYPE: "INVALID_CONTENT_TYPE",
	INVALID_TIME_RANGE: "INVALID_TIME_RANGE",
	INVALID_SCOPE: "INVALID_SCOPE",
	MISSING_PARAMETERS: "MISSING_PARAMETERS",
	MISSING_REQUIRED_FIELDS: "MISSING_REQUIRED_FIELDS",
	PAYLOAD_TOO_LARGE: "PAYLOAD_TOO_LARGE",
	EMPTY_RESPONSE: "EMPTY_RESPONSE",
	INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",

	// Applications
	APP_NOT_FOUND: "APP_NOT_FOUND",
	APPLICATIONS_LIMIT_REACHED: "APPLICATIONS_LIMIT_REACHED",
	/** Not enough free memory on the plan for the requested allocation. */
	INSUFFICIENT_MEMORY: "INSUFFICIENT_MEMORY",
	CLUSTER_SELECTION_FAILED: "CLUSTER_SELECTION_FAILED",
	CLUSTER_MAINTENANCE_TRY_LATER: "CLUSTER_MAINTENANCE_TRY_LATER",
	/** `GET /apps/{appId}/metrics` on an application without metrics support. */
	METRICS_NOT_SUPPORTED: "METRICS_NOT_SUPPORTED",
	/** 404 on `GET /apps/{appId}/logs`: the logs could not be read. */
	LOGS_UNAVAILABLE: "LOGS_UNAVAILABLE",

	// Lifecycle actions (start / stop / restart of apps and databases)
	/** 409: the action could not be completed. */
	ACTION_FAILED: "ACTION_FAILED",
	/** 409: the container is already running. */
	CONTAINER_ALREADY_STARTED: "CONTAINER_ALREADY_STARTED",
	/** 409: the container is already stopped. */
	CONTAINER_ALREADY_STOPPED: "CONTAINER_ALREADY_STOPPED",
	/** 409: the container is suspended. */
	CONTAINER_TEMPORARILY_SUSPENDED: "CONTAINER_TEMPORARILY_SUSPENDED",
	/** 409: the container does not exist on the cluster. */
	CONTAINER_NOT_FOUND: "CONTAINER_NOT_FOUND",
	/** 409: the cluster has no disk space left for the container. */
	CONTAINER_INSUFFICIENT_DISK_SPACE: "CONTAINER_INSUFFICIENT_DISK_SPACE",
	/** 409: the container network could not be set up. */
	CONTAINER_NETWORK_CONFLICT: "CONTAINER_NETWORK_CONFLICT",

	// Upload / commit
	UPLOAD_FAILED: "UPLOAD_FAILED",
	UPLOAD_ABORTED: "UPLOAD_ABORTED",
	/** 503: the upload storage is busy. Retry shortly. */
	UPLOAD_BUSY: "UPLOAD_BUSY",
	STORAGE_UPLOAD_FAILED: "STORAGE_UPLOAD_FAILED",
	COMMIT_FAILED: "COMMIT_FAILED",
	INVALID_FILE: "INVALID_FILE",
	INVALID_DISPLAY_NAME: "INVALID_DISPLAY_NAME",
	INVALID_DESCRIPTION: "INVALID_DESCRIPTION",
	INVALID_SUBDOMAIN: "INVALID_SUBDOMAIN",
	/** 413: the file or archive exceeds the size limit (10 MB in the file manager). */
	FILE_TOO_LARGE: "FILE_TOO_LARGE",

	// File manager
	READ_FAILED: "READ_FAILED",
	SAVE_FAILED: "SAVE_FAILED",
	RENAME_FAILED: "RENAME_FAILED",
	DELETE_FAILED: "DELETE_FAILED",
	FILE_NOT_FOUND: "FILE_NOT_FOUND",
	INVALID_PATH: "INVALID_PATH",
	INVALID_FILENAME: "INVALID_FILENAME",
	/** 400: `content` is not valid for the given `encoding` (e.g. malformed base64). */
	INVALID_CONTENT: "INVALID_CONTENT",
	/** 400: unsupported `encoding` query value (only `base64` is accepted). */
	INVALID_ENCODING: "INVALID_ENCODING",
	/** 403: the path is managed by the platform and cannot be accessed. */
	BLOCKED_PATH: "BLOCKED_PATH",

	// Environment variables
	INVALID_ENV_CONTENT: "INVALID_ENV_CONTENT",
	ENV_NAME_TOO_LONG: "ENV_NAME_TOO_LONG",
	ENV_CONTENT_TOO_LONG: "ENV_CONTENT_TOO_LONG",
	TOO_MANY_ENV_VARS: "TOO_MANY_ENV_VARS",
	STATIC_APP_ENV_NOT_SUPPORTED: "STATIC_APP_ENV_NOT_SUPPORTED",

	// Deploys / git
	GIT_ALREADY_CONFIGURED: "GIT_ALREADY_CONFIGURED",
	GIT_NOT_CONFIGURED: "GIT_NOT_CONFIGURED",
	REPOSITORY_BRANCH_ALREADY_CONFIGURED: "REPOSITORY_BRANCH_ALREADY_CONFIGURED",
	/** GitHub App link (403): the account has no GitHub account connected. */
	GITHUB_NOT_CONNECTED: "GITHUB_NOT_CONNECTED",
	/** GitHub App link (403): the GitHub App is not installed on the repository. */
	REPOSITORY_NOT_AVAILABLE: "REPOSITORY_NOT_AVAILABLE",
	/** GitHub App link (403): the connected GitHub account has no write access to the repository. */
	REPOSITORY_PERMISSION_REQUIRED: "REPOSITORY_PERMISSION_REQUIRED",
	/** GitHub App link (404): the repository does not exist or is not visible. */
	REPOSITORY_NOT_FOUND: "REPOSITORY_NOT_FOUND",
	/** GitHub App link (400): the branch does not exist in the repository. */
	BRANCH_NOT_FOUND: "BRANCH_NOT_FOUND",
	/** GitHub App link (502): GitHub did not confirm the branch. Safe to retry. */
	FAILED_TO_FETCH: "FAILED_TO_FETCH",
	INVALID_BRANCH_LENGTH: "INVALID_BRANCH_LENGTH",
	INVALID_AUTORESTART: "INVALID_AUTORESTART",

	// Network / domains
	INVALID_DOMAIN: "INVALID_DOMAIN",
	CANNOT_SET_SUBDOMAIN: "CANNOT_SET_SUBDOMAIN",
	NO_CUSTOM_DOMAIN: "NO_CUSTOM_DOMAIN",
	DOMAIN_ALREADY_EXISTS: "DOMAIN_ALREADY_EXISTS",
	RESERVED_DOMAIN: "RESERVED_DOMAIN",
	LOAD_BALANCER_LIMIT_REACHED: "LOAD_BALANCER_LIMIT_REACHED",
	DNS_FAILED: "DNS_FAILED",
	PURGE_CACHE_FAILED: "PURGE_CACHE_FAILED",
	/** 400 on network analytics: a drill-down filter value is invalid. */
	INVALID_FILTER: "INVALID_FILTER",
	/** 503 on the network analytics endpoints: the edge provider is busy. Retry in about a minute. */
	ANALYTICS_BUSY: "ANALYTICS_BUSY",
	UNABLE_TO_FETCH_ANALYTICS: "UNABLE_TO_FETCH_ANALYTICS",
	UNABLE_TO_FETCH_ERRORS: "UNABLE_TO_FETCH_ERRORS",
	UNABLE_TO_FETCH_PERFORMANCE: "UNABLE_TO_FETCH_PERFORMANCE",

	// Realtime
	/** 429: the user already has the maximum number of realtime connections open. */
	REALTIME_MAX_CONNECTIONS: "REALTIME_MAX_CONNECTIONS",
	/** 429: the application already has the maximum number of realtime connections across all users. */
	REALTIME_MAX_CONNECTIONS_APP: "REALTIME_MAX_CONNECTIONS_APP",

	// Snapshots
	SNAPSHOT_FAILED: "SNAPSHOT_FAILED",
	SNAPSHOT_NOT_FOUND: "SNAPSHOT_NOT_FOUND",
	/** 202 on snapshot creation: still generating, it will appear in the listing on its own. */
	SNAPSHOT_PROCESSING: "SNAPSHOT_PROCESSING",
	/** 404: the restore could not be performed. The only restore failure code. */
	SNAPSHOT_RESTORE_FAILED: "SNAPSHOT_RESTORE_FAILED",
	SNAPSHOT_DATABASE_MISMATCH: "SNAPSHOT_DATABASE_MISMATCH",
	RESTORE_IN_PROGRESS: "RESTORE_IN_PROGRESS",
	INVALID_SNAPSHOT_ID: "INVALID_SNAPSHOT_ID",
	INVALID_VERSION_ID: "INVALID_VERSION_ID",

	// Databases
	DATABASE_NOT_FOUND: "DATABASE_NOT_FOUND",
	DATABASE_NOT_RUNNING: "DATABASE_NOT_RUNNING",
	DATABASE_CREATION_FAILED: "DATABASE_CREATION_FAILED",
	INVALID_DATABASE_TYPE: "INVALID_DATABASE_TYPE",
	INVALID_DATABASE_VERSION: "INVALID_DATABASE_VERSION",
	INVALID_RESET_TYPE: "INVALID_RESET_TYPE",
	RESET_FAILED: "RESET_FAILED",
	NO_UPDATE_DATA: "NO_UPDATE_DATA",

	// Workspaces
	WORKSPACE_NOT_FOUND: "WORKSPACE_NOT_FOUND",
	WORKSPACE_CREATION_FAILED: "WORKSPACE_CREATION_FAILED",
	WORKSPACE_LIMIT_REACHED: "WORKSPACE_LIMIT_REACHED",
	MEMBER_NOT_FOUND: "MEMBER_NOT_FOUND",
	MEMBERS_LIMIT_REACHED: "MEMBERS_LIMIT_REACHED",
	MEMBER_ALREADY_ADDED: "MEMBER_ALREADY_ADDED",
	APP_ALREADY_IN_WORKSPACE: "APP_ALREADY_IN_WORKSPACE",
	CANNOT_EDIT_OWNER: "CANNOT_EDIT_OWNER",
	CANNOT_INVITE_OWNER: "CANNOT_INVITE_OWNER",
	CANNOT_LEAVE_OWNER: "CANNOT_LEAVE_OWNER",
	INVALID_GROUP: "INVALID_GROUP",
	VALIDATION_FAILED: "VALIDATION_FAILED",
	VALIDATION_TIMEOUT: "VALIDATION_TIMEOUT",

	// Square Cloud AI agent
	/** 429: the plan's daily AI usage is exhausted. Resets at 00:00 UTC. */
	AI_DAILY_LIMIT_REACHED: "AI_DAILY_LIMIT_REACHED",
	/** 429: the shared daily AI allowance for accounts without a plan is exhausted. */
	AI_NO_PLAN_LIMIT_REACHED: "AI_NO_PLAN_LIMIT_REACHED",
	/** Too many AI chat streams are open for the account. */
	AI_MAX_CONCURRENT_STREAMS: "AI_MAX_CONCURRENT_STREAMS",
	/** 503: the AI agent is temporarily unavailable. */
	AI_UNAVAILABLE: "AI_UNAVAILABLE",
} as const;

/**
 * Union of the canonical error code values.
 */
export type APIErrorCode = (typeof APIErrorCode)[keyof typeof APIErrorCode];

export type ISODateString = string;

export type UserId = string & Brand<"UserId">;
export const UserId = (id: string): UserId => id as UserId;

export type ApplicationId = string & Brand<"ApplicationId">;
export const ApplicationId = (id: string): ApplicationId => id as ApplicationId;

export type DatabaseId = string & Brand<"DatabaseId">;
export const DatabaseId = (id: string): DatabaseId => id as DatabaseId;

/**
 * Workspace identifier: a UUID v4 without hyphens (32 hex chars), or a
 * 40-hex id on older workspaces.
 */
export type WorkspaceId = string & Brand<"WorkspaceId">;
export const WorkspaceId = (id: string): WorkspaceId => id as WorkspaceId;

/**
 * Compact runtime stats entry returned by `/apps/status` and `/databases/status`.
 * The id is parameterized so the same shape can be branded as `ApplicationId`,
 * `DatabaseId`, or left as a plain `string`. `cpu` (`"0.00%"`) and `ram`
 * (RAM in use, `"0.00MB"`) are present only while running.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/status-all
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/databases/status-all
 */
export type RuntimeStatsListItem<
	TId extends string = string,
	Running extends boolean = boolean,
> = {
	id: TId;
} & (Running extends true
	? { running: true; cpu: string; ram: string }
	: { running: false; cpu?: never; ram?: never });

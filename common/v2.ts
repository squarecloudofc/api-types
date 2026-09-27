import type { Brand } from "../utils";

export type APIPayloadStatus = "error" | "success";

export interface APIPayload<TResponse> {
	status: APIPayloadStatus;
	response: TResponse;
	code?: string;
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
 */
export const APIErrorCode = {
	// Auth / plan gates
	ACCESS_DENIED: "ACCESS_DENIED",
	PERMISSION_DENIED: "PERMISSION_DENIED",
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

	// Generic validation / transport
	INVALID_ID: "INVALID_ID",
	INVALID_CODE: "INVALID_CODE",
	INVALID_NAME: "INVALID_NAME",
	INVALID_MEMORY: "INVALID_MEMORY",
	INVALID_JSON_BODY: "INVALID_JSON_BODY",
	INVALID_CONTENT_TYPE: "INVALID_CONTENT_TYPE",
	INVALID_TIME_RANGE: "INVALID_TIME_RANGE",
	INVALID_SCOPE: "INVALID_SCOPE",
	MISSING_PARAMETERS: "MISSING_PARAMETERS",
	MISSING_REQUIRED_FIELDS: "MISSING_REQUIRED_FIELDS",
	PAYLOAD_TOO_LARGE: "PAYLOAD_TOO_LARGE",
	EMPTY_RESPONSE: "EMPTY_RESPONSE",
	ACTION_FAILED: "ACTION_FAILED",
	INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",

	// Applications
	APP_NOT_FOUND: "APP_NOT_FOUND",
	APPLICATIONS_LIMIT_REACHED: "APPLICATIONS_LIMIT_REACHED",
	INSUFFICIENT_MEMORY: "INSUFFICIENT_MEMORY",
	CLUSTER_SELECTION_FAILED: "CLUSTER_SELECTION_FAILED",
	CLUSTER_MAINTENANCE_TRY_LATER: "CLUSTER_MAINTENANCE_TRY_LATER",
	/** `GET /apps/{appId}/metrics` on an application without metrics support. */
	METRICS_NOT_SUPPORTED: "METRICS_NOT_SUPPORTED",

	// Upload / commit
	UPLOAD_FAILED: "UPLOAD_FAILED",
	UPLOAD_ABORTED: "UPLOAD_ABORTED",
	STORAGE_UPLOAD_FAILED: "STORAGE_UPLOAD_FAILED",
	COMMIT_FAILED: "COMMIT_FAILED",
	INVALID_FILE: "INVALID_FILE",
	INVALID_DISPLAY_NAME: "INVALID_DISPLAY_NAME",
	INVALID_DESCRIPTION: "INVALID_DESCRIPTION",
	INVALID_SUBDOMAIN: "INVALID_SUBDOMAIN",
	FILE_TOO_LARGE: "FILE_TOO_LARGE",

	// File manager
	READ_FAILED: "READ_FAILED",
	SAVE_FAILED: "SAVE_FAILED",
	RENAME_FAILED: "RENAME_FAILED",
	DELETE_FAILED: "DELETE_FAILED",
	FILE_NOT_FOUND: "FILE_NOT_FOUND",
	INVALID_PATH: "INVALID_PATH",
	INVALID_FILENAME: "INVALID_FILENAME",
	INVALID_CONTENT: "INVALID_CONTENT",
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
	/** GitHub App link (403): the connected GitHub account has no write access to the repository. */
	REPOSITORY_PERMISSION_REQUIRED: "REPOSITORY_PERMISSION_REQUIRED",
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
	UNABLE_TO_FETCH_ANALYTICS: "UNABLE_TO_FETCH_ANALYTICS",
	UNABLE_TO_FETCH_ERRORS: "UNABLE_TO_FETCH_ERRORS",
	UNABLE_TO_FETCH_PERFORMANCE: "UNABLE_TO_FETCH_PERFORMANCE",

	// Realtime
	REALTIME_MAX_CONNECTIONS: "REALTIME_MAX_CONNECTIONS",

	// Snapshots
	SNAPSHOT_FAILED: "SNAPSHOT_FAILED",
	SNAPSHOT_NOT_FOUND: "SNAPSHOT_NOT_FOUND",
	SNAPSHOT_PROCESSING: "SNAPSHOT_PROCESSING",
	SNAPSHOT_RESTORE_FAILED: "SNAPSHOT_RESTORE_FAILED",
	SNAPSHOT_DATABASE_MISMATCH: "SNAPSHOT_DATABASE_MISMATCH",
	RESTORE_IN_PROGRESS: "RESTORE_IN_PROGRESS",
	INVALID_SNAPSHOT_ID: "INVALID_SNAPSHOT_ID",
	INVALID_VERSION_ID: "INVALID_VERSION_ID",

	// Databases
	DATABASE_NOT_FOUND: "DATABASE_NOT_FOUND",
	DATABASE_NOT_RUNNING: "DATABASE_NOT_RUNNING",
	/** Database start (409): the container is already running. */
	CONTAINER_ALREADY_STARTED: "CONTAINER_ALREADY_STARTED",
	/** Database stop (409): the container is already stopped. */
	CONTAINER_ALREADY_STOPPED: "CONTAINER_ALREADY_STOPPED",
	/** Database start/stop (409): the container is suspended. */
	CONTAINER_TEMPORARILY_SUSPENDED: "CONTAINER_TEMPORARILY_SUSPENDED",
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

export type WorkspaceId = string & Brand<"WorkspaceId">;
export const WorkspaceId = (id: string): WorkspaceId => id as WorkspaceId;

/**
 * Compact runtime stats entry returned by `/apps/status` and `/databases/status`.
 * The id is parameterized so the same shape can be branded as `ApplicationId`,
 * `DatabaseId`, or left as a plain `string`.
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

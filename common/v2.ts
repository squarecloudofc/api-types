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
 * Canonical names follow the standardized convention
 * `INVALID_X` / `X_FAILED` / `X_NOT_FOUND` / `X_LIMIT_REACHED`. For a
 * transition period the API still returns the old names alongside the new
 * ones — the old keys below are kept as deprecated aliases that resolve to
 * the new canonical values.
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
	RATE_LIMIT: "RATE_LIMIT",
	RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
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

	// ------------------------------------------------------------------
	// Deprecated aliases — pre-standardization names. They resolve to the new
	// canonical values so comparisons keep working against new responses.
	// ------------------------------------------------------------------
	/** @deprecated Use {@link APIErrorCode.INVALID_ID}. */
	ID_INVALID: "INVALID_ID",
	/** @deprecated Use {@link APIErrorCode.INVALID_CODE}. */
	CODE_INVALID: "INVALID_CODE",
	/** @deprecated Use {@link APIErrorCode.INVALID_NAME}. */
	NAME_INVALID: "INVALID_NAME",
	/** @deprecated Use {@link APIErrorCode.INVALID_MEMORY}. */
	MEMORY_INVALID: "INVALID_MEMORY",
	/** @deprecated Use {@link APIErrorCode.INVALID_DATABASE_TYPE}. */
	DATABASE_TYPE_INVALID: "INVALID_DATABASE_TYPE",
	/** @deprecated Use {@link APIErrorCode.INVALID_DATABASE_VERSION}. */
	DATABASE_VERSION_INVALID: "INVALID_DATABASE_VERSION",
	/** @deprecated Use {@link APIErrorCode.WORKSPACE_NOT_FOUND}. */
	UNKNOWN_WORKSPACE: "WORKSPACE_NOT_FOUND",
	/** @deprecated Use {@link APIErrorCode.MEMBER_NOT_FOUND}. */
	UNKNOWN_MEMBER: "MEMBER_NOT_FOUND",
	/** @deprecated Use {@link APIErrorCode.APPLICATIONS_LIMIT_REACHED}. */
	MAX_APPLICATIONS_REACHED: "APPLICATIONS_LIMIT_REACHED",
	/** @deprecated Use {@link APIErrorCode.MEMBERS_LIMIT_REACHED}. */
	MAX_MEMBERS_REACHED: "MEMBERS_LIMIT_REACHED",
	/** @deprecated Use {@link APIErrorCode.WORKSPACE_CREATION_FAILED}. */
	FAILED_WORKSPACE_CREATION: "WORKSPACE_CREATION_FAILED",
	/** @deprecated Use {@link APIErrorCode.DATABASE_CREATION_FAILED}. */
	FAILED_DATABASE_CREATION: "DATABASE_CREATION_FAILED",
	/** @deprecated Use {@link APIErrorCode.CLUSTER_SELECTION_FAILED}. */
	FAILED_CLUSTER_SELECTION: "CLUSTER_SELECTION_FAILED",
	/** @deprecated Use {@link APIErrorCode.INSUFFICIENT_MEMORY}. */
	FEW_MEMORY: "INSUFFICIENT_MEMORY",
	/** @deprecated Use {@link APIErrorCode.READ_FAILED}. */
	FAILED_READ: "READ_FAILED",
	/** @deprecated Use {@link APIErrorCode.DELETE_FAILED}. */
	FAILED_DELETE: "DELETE_FAILED",
	/** @deprecated Use {@link APIErrorCode.DELETE_FAILED}. */
	DELETE_ERROR: "DELETE_FAILED",
	/** @deprecated Use {@link APIErrorCode.RENAME_FAILED}. */
	FAILED_RENAME: "RENAME_FAILED",
	/** @deprecated Use {@link APIErrorCode.SAVE_FAILED}. */
	FAILED_TO_SAVE: "SAVE_FAILED",
	/** @deprecated Use {@link APIErrorCode.RESET_FAILED}. */
	FAILED_RESET: "RESET_FAILED",
	/** @deprecated Use {@link APIErrorCode.UPLOAD_FAILED}. */
	FAILED_UPLOAD: "UPLOAD_FAILED",
	/** @deprecated Use {@link APIErrorCode.STORAGE_UPLOAD_FAILED}. */
	FAILED_UPLOAD_DATA: "STORAGE_UPLOAD_FAILED",
	/** @deprecated Use {@link APIErrorCode.COMMIT_FAILED}. */
	COMMIT_ERROR: "COMMIT_FAILED",
	/** @deprecated Use {@link APIErrorCode.INTERNAL_SERVER_ERROR}. */
	INTERNAL_ERROR: "INTERNAL_SERVER_ERROR",
	/** @deprecated Use {@link APIErrorCode.INVALID_DOMAIN}. */
	REGEX_VALIDATION: "INVALID_DOMAIN",
	/** @deprecated Use {@link APIErrorCode.CANNOT_SET_SUBDOMAIN}. */
	CAN_NOT_SET_SUBDOMAIN: "CANNOT_SET_SUBDOMAIN",
	/** @deprecated Use {@link APIErrorCode.METRICS_NOT_SUPPORTED}. */
	INVALID_APP: "METRICS_NOT_SUPPORTED",
	/** @deprecated Use {@link APIErrorCode.UPGRADE_REQUIRED}. */
	SUBSCRIPTION_REQUIRED: "UPGRADE_REQUIRED",
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

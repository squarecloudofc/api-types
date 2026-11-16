import type { Brand } from "../utils";

/**
 * The value of `status` in every JSON response: `success` when the call
 * worked and `error` when it failed.
 */
export type APIPayloadStatus = "error" | "success";

/**
 * The envelope every JSON response of the API uses.
 *
 * Check `status` before you read `response`. A failed call sets `status` to
 * `error` and explains why in `code` and, sometimes, `message`.
 */
export interface APIPayload<TResponse> {
	/** Says whether the call worked. */
	status: APIPayloadStatus;
	/** The data the route returns when `status` is `success`. */
	response: TResponse;
	/**
	 * The error code when `status` is `error`. The value is one of
	 * {@link APIErrorCode} or a newer code this package does not know yet.
	 */
	code?: APIErrorCode | (string & {});
	/**
	 * A human-readable explanation that some errors include. Branch on `code`
	 * instead, because the wording can change.
	 */
	message?: string;
}

/**
 * The envelope of a response that carries no data, such as a successful
 * start, stop or delete.
 */
export interface APIPayloadStatusOnly {
	/** Says whether the call worked. */
	status: APIPayloadStatus;
}

/**
 * The headers every authenticated request sends.
 */
export interface APIHeaders {
	/** Your Square Cloud API key. */
	Authorization: string;
}

/**
 * A version segment of the API path, such as `v2`.
 */
export type APIVersion<TVersion extends number> = `v${TVersion}`;

/**
 * Error codes the API returns in the `code` field of a failed response.
 *
 * Each code says when the API sends it and what you can do about it. Names
 * follow a few patterns, such as `INVALID_X`, `X_FAILED`, `X_NOT_FOUND` and
 * `X_LIMIT_REACHED`. The list grows over time, so treat a code you do not
 * know as a generic failure of the HTTP status it came with.
 *
 * @example
 * ```ts
 * if (payload.code === APIErrorCode.RESTORE_IN_PROGRESS) {
 *   // Wait for the snapshot restore to end, then try again.
 * }
 * ```
 */
export const APIErrorCode = {
	// Auth / plan gates
	/** Returned with 401 when the `Authorization` header is missing or malformed, or the API key is not valid or has expired, so check the key you send. */
	ACCESS_DENIED: "ACCESS_DENIED",
	/** Returned with 403 when your workspace role does not allow the operation, so ask the workspace owner for a role that does. */
	PERMISSION_DENIED: "PERMISSION_DENIED",
	/** Returned with 403 when the API key lacks the scope the operation needs, so use a key that holds it. */
	MISSING_SCOPE: "MISSING_SCOPE",
	/** Returned with 403 when the API key is restricted to other resources, so use a key that covers this one. */
	RESOURCE_NOT_ALLOWED: "RESOURCE_NOT_ALLOWED",
	/** Returned with 403 when you add or edit a workspace member with an API key that does not cover every application in the workspace or lacks the scopes the role would grant, so use a key with that access. */
	SCOPE_NOT_GRANTABLE: "SCOPE_NOT_GRANTABLE",
	/** Returned with 400 when an API key combines Blob Storage scopes with a resource restriction, so remove one of the two. */
	CONFLICTING_RESOURCES: "CONFLICTING_RESOURCES",
	/** Returned with 421 when an MCP server path is requested on a Square Cloud host other than the MCP one, so connect to the address the message names. */
	WRONG_HOST: "WRONG_HOST",
	/** Returned with 400 when the deploy webhook `access_token` is neither `@` nor a GitHub personal access token, so send a token that starts with `ghp_` or `github_pat_`. */
	INVALID_ACCESS_TOKEN: "INVALID_ACCESS_TOKEN",
	/** Returned with 403, or 402 on the user snapshot listing, when your plan does not include the feature, such as custom domains, databases, workspaces or network logs, so upgrade the plan to use it. */
	UPGRADE_REQUIRED: "UPGRADE_REQUIRED",

	// Rate limiting
	/** Returned with 429 when you hit the short cooldown of one endpoint, so wait a few seconds and try again. */
	KEEP_CALM: "KEEP_CALM",
	/** Returned with 429 when your account, API key or IP is over its request budget, so slow down, since the block can last about 30 minutes. */
	RATE_LIMITED: "RATE_LIMITED",
	/** Returned with 429 when the owner has used the plan's daily snapshot quota, so upgrade the plan or wait for the quota to free up instead of retrying. */
	DAILY_SNAPSHOTS_LIMIT_REACHED: "DAILY_SNAPSHOTS_LIMIT_REACHED",

	// Platform availability
	/** Returned with 503 when the platform's own database is briefly unavailable, so try again in a few seconds. */
	DATABASE_UNAVAILABLE: "DATABASE_UNAVAILABLE",
	/** Returned when the server that hosts the resource did not answer in time, so check the resource's status before you try again. */
	CLUSTER_TIMEOUT: "CLUSTER_TIMEOUT",
	/** Returned when the server that hosts the resource cannot be reached, so try again in a few minutes. */
	CLUSTER_UNAVAILABLE: "CLUSTER_UNAVAILABLE",
	/** Returned when the request to the server that hosts the resource was cut off before it finished, so check the resource's state before you try again. */
	REQUEST_ABORTED: "REQUEST_ABORTED",
	/** Returned with 404 when no route matches the method and path, so check the URL and the HTTP method. */
	ROUTE_NOT_FOUND: "ROUTE_NOT_FOUND",

	// Generic validation / transport
	/** Returned with 400 when an id in the body, such as `workspaceId` or `appId`, is missing or malformed, so send a valid id. */
	INVALID_ID: "INVALID_ID",
	/** Returned with 400 when the workspace invite code is not valid, so ask the user to generate a new one. */
	INVALID_CODE: "INVALID_CODE",
	/** Returned with 400 when a database or workspace name is not 1 to 32 letters, numbers, spaces, hyphens or underscores, so fix the name. */
	INVALID_NAME: "INVALID_NAME",
	/** Returned with 400 when a memory value is not a whole number of MB, so send an integer. */
	INVALID_MEMORY: "INVALID_MEMORY",
	/** Returned when a field of the request fails validation, so check the values you send. */
	INVALID_INPUT: "INVALID_INPUT",
	/** Returned with 400 when a query parameter has an unsupported value, such as a metrics `range` other than `24h` or `7d`, so send one of the accepted values. */
	INVALID_PARAMETERS: "INVALID_PARAMETERS",
	/** Returned when the request body cannot be parsed as JSON, so send a valid JSON body. */
	INVALID_JSON_BODY: "INVALID_JSON_BODY",
	/** Returned with 415 when an upload or commit is not sent as `multipart/form-data`, so send the file as multipart form data. */
	INVALID_CONTENT_TYPE: "INVALID_CONTENT_TYPE",
	/** Returned with 400 when the network `start` or `end` is missing or malformed, or `start` comes after `end`, so send two ISO 8601 timestamps in order. */
	INVALID_TIME_RANGE: "INVALID_TIME_RANGE",
	/** Returned with 400 when the user snapshot listing gets a `scope` other than `applications` or `databases`, so send one of those. */
	INVALID_SCOPE: "INVALID_SCOPE",
	/** Returned with 400 when a snapshot restore lacks `snapshotId` or `versionId`, so send both values from the snapshot listing. */
	MISSING_PARAMETERS: "MISSING_PARAMETERS",
	/** Returned with 400 when a GitHub App link lacks `repositoryName` or `repositoryBranch`, so send both. */
	MISSING_REQUIRED_FIELDS: "MISSING_REQUIRED_FIELDS",
	/** Returned with 413 when the request body is larger than the route accepts, so send a smaller body. */
	PAYLOAD_TOO_LARGE: "PAYLOAD_TOO_LARGE",
	/** Returned with 400 when an application upload ends without a result, so check your application list before you upload again. */
	EMPTY_RESPONSE: "EMPTY_RESPONSE",
	/** Returned with 500 when the API hits an unexpected error, so try again later and contact support if it keeps happening. */
	INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",

	// Applications
	/** Returned with 404 when the application does not exist or you cannot reach it, so check the id, including the workspace suffix of a workspace application. */
	APP_NOT_FOUND: "APP_NOT_FOUND",
	/** Returned with 400 when the workspace already holds its maximum of 100 applications, so remove one before you share another. */
	APPLICATIONS_LIMIT_REACHED: "APPLICATIONS_LIMIT_REACHED",
	/** Returned with 400 when your plan does not have enough free memory for the new application or database, so free some memory or upgrade the plan. */
	INSUFFICIENT_MEMORY: "INSUFFICIENT_MEMORY",
	/** Returned with 400 when no cluster could be chosen to host a new application or database, so try again later. */
	CLUSTER_SELECTION_FAILED: "CLUSTER_SELECTION_FAILED",
	/** Returned with 503 when the server needed for an upload, a new database or a snapshot is under maintenance, so try again in a few minutes. */
	CLUSTER_MAINTENANCE_TRY_LATER: "CLUSTER_MAINTENANCE_TRY_LATER",
	/**
	 * Was returned when an application had no metrics.
	 *
	 * @deprecated The API no longer sends this code, because applications
	 * below 512 MB have metrics too.
	 */
	METRICS_NOT_SUPPORTED: "METRICS_NOT_SUPPORTED",
	/** Returned with 404 when the application's logs cannot be read, for example because it is offline or not deployed yet, so try again once it runs. */
	LOGS_UNAVAILABLE: "LOGS_UNAVAILABLE",

	// Lifecycle actions (start / stop / restart of apps and databases)
	/** Returned with 409 when a start, stop or restart fails for a reason the API cannot name, so check the status and logs and try again. */
	ACTION_FAILED: "ACTION_FAILED",
	/** Returned with 409 when you start an application or database that is already running, so there is nothing to do. */
	CONTAINER_ALREADY_STARTED: "CONTAINER_ALREADY_STARTED",
	/** Returned with 409 when you stop an application or database that is already stopped, so there is nothing to do. */
	CONTAINER_ALREADY_STOPPED: "CONTAINER_ALREADY_STOPPED",
	/** Returned with 409 when the application is suspended and cannot be started, stopped or restarted, so contact Square Cloud support. */
	CONTAINER_TEMPORARILY_SUSPENDED: "CONTAINER_TEMPORARILY_SUSPENDED",
	/** Returned with 409 when the resource's container is missing, so try again later and contact support if it keeps happening. */
	CONTAINER_NOT_FOUND: "CONTAINER_NOT_FOUND",
	/** Returned with 409 when there is no disk space left to run the container, so try again later and contact support if it keeps happening. */
	CONTAINER_INSUFFICIENT_DISK_SPACE: "CONTAINER_INSUFFICIENT_DISK_SPACE",
	/** Returned with 409 when the container's network could not be set up because of a port conflict, so try again in a moment. */
	CONTAINER_NETWORK_CONFLICT: "CONTAINER_NETWORK_CONFLICT",
	/** Returned with 409 when a snapshot restore holds the resource, so wait for the restore to end and try again. */
	RESTORE_IN_PROGRESS: "RESTORE_IN_PROGRESS",

	// Upload / commit
	/** Returned with 400 when an application upload could not be confirmed and the application may still be created, so check your application list before you upload again. */
	UPLOAD_FAILED: "UPLOAD_FAILED",
	/** Returned with 400 when the upload was interrupted before it finished, so send the file again. */
	UPLOAD_ABORTED: "UPLOAD_ABORTED",
	/** Returned with 503 when upload storage is busy, so try again in a moment. */
	UPLOAD_BUSY: "UPLOAD_BUSY",
	/** Returned with 400 when the uploaded file could not be stored, so try again later. */
	STORAGE_UPLOAD_FAILED: "STORAGE_UPLOAD_FAILED",
	/** Returned with 400 when a commit could not be applied to the application, so check the file and try again. */
	COMMIT_FAILED: "COMMIT_FAILED",
	/** Returned with 400 when the uploaded file is missing or cannot be read, so check the file and send it again. */
	INVALID_FILE: "INVALID_FILE",
	/** Returned with 400 when the display name in the configuration file is not valid, so fix it. */
	INVALID_DISPLAY_NAME: "INVALID_DISPLAY_NAME",
	/** Returned with 400 when the description in the configuration file is not valid, so fix it. */
	INVALID_DESCRIPTION: "INVALID_DESCRIPTION",
	/** Returned with 400 when the subdomain in the configuration file is not valid, so fix it. */
	INVALID_SUBDOMAIN: "INVALID_SUBDOMAIN",
	/** Returned with 413 when an upload or commit file is over 100 MB, or a file you read from the file manager is over 10 MB, so use a smaller file. */
	FILE_TOO_LARGE: "FILE_TOO_LARGE",

	// File manager
	/** Returned with 400 when a file, the environment variables or a database certificate could not be read, so try again. */
	READ_FAILED: "READ_FAILED",
	/** Returned with 400 when the file manager could not write the file, so try again. */
	WRITE_FAILED: "WRITE_FAILED",
	/** Returned with 500 when a change to the configuration file could not be saved, so try again. */
	SAVE_FAILED: "SAVE_FAILED",
	/** Returned with 400 when a file could not be renamed or moved, so check both paths and try again. */
	RENAME_FAILED: "RENAME_FAILED",
	/** Returned with 404, or 400 for a file, when an application, a database or a file could not be deleted, so try again. */
	DELETE_FAILED: "DELETE_FAILED",
	/** Returned with 404 when no file or directory exists at the given path, so check the path. */
	FILE_NOT_FOUND: "FILE_NOT_FOUND",
	/** Returned with 400 when a path is not valid, for example because it tries to leave the application or holds invalid characters, so send an absolute path inside the application. */
	INVALID_PATH: "INVALID_PATH",
	/** Returned with 400 when an uploaded file name looks like path traversal, holds control characters or is `.` or `..`, so rename the file. */
	INVALID_FILENAME: "INVALID_FILENAME",
	/** Returned with 400 when `content` does not match its `encoding`, for example malformed base64, so encode the file again. */
	INVALID_CONTENT: "INVALID_CONTENT",
	/** Returned with 400 when `encoding` has any value other than `base64`, so send `base64`. */
	INVALID_ENCODING: "INVALID_ENCODING",
	/** Returned with 403 when the file manager does not expose the path, or your workspace role may not change that file, so choose another path or ask the workspace owner for more access. */
	BLOCKED_PATH: "BLOCKED_PATH",

	// Environment variables
	/** Returned with 400 when an environment variable name or value is not valid, so use names made of letters, digits, underscores, dots and hyphens that do not start with a digit. */
	INVALID_ENV_CONTENT: "INVALID_ENV_CONTENT",
	/** Returned with 400 when an environment variable name is longer than 1024 characters, so shorten it. */
	ENV_NAME_TOO_LONG: "ENV_NAME_TOO_LONG",
	/** Returned with 400 when an environment variable value is longer than 4096 characters, so shorten it. */
	ENV_CONTENT_TOO_LONG: "ENV_CONTENT_TOO_LONG",
	/** Returned with 400 when the application would have more than 256 environment variables, so remove some first. */
	TOO_MANY_ENV_VARS: "TOO_MANY_ENV_VARS",
	/** Returned with 400 when you read or change the environment variables of a static application, which does not support them. */
	STATIC_APP_ENV_NOT_SUPPORTED: "STATIC_APP_ENV_NOT_SUPPORTED",
	/** Returned with 409 when another request is changing the application's environment variables at the same time, so try again in a moment. */
	ENV_BUSY: "ENV_BUSY",

	// Deploys / git
	/** Returned with 400 when the application already has a GitHub repository linked, so unlink it before you link another. */
	GIT_ALREADY_CONFIGURED: "GIT_ALREADY_CONFIGURED",
	/** Returned with 400 when you unlink the GitHub App repository of an application that has none, so there is nothing to remove. */
	GIT_NOT_CONFIGURED: "GIT_NOT_CONFIGURED",
	/** Returned with 409 when another application, of any account, already links the same repository and branch, so choose another branch or unlink it there first. */
	REPOSITORY_BRANCH_ALREADY_CONFIGURED: "REPOSITORY_BRANCH_ALREADY_CONFIGURED",
	/** Returned with 403 when your account has no usable GitHub connection, so connect or reconnect your GitHub account. */
	GITHUB_NOT_CONNECTED: "GITHUB_NOT_CONNECTED",
	/** Returned with 403 when no Square Cloud GitHub App installation of your GitHub account covers the repository, so give the Square Cloud GitHub App access to that repository. */
	REPOSITORY_NOT_AVAILABLE: "REPOSITORY_NOT_AVAILABLE",
	/** Returned with 403 when your GitHub account has no write access to the repository, so link a repository you can write to. */
	REPOSITORY_PERMISSION_REQUIRED: "REPOSITORY_PERMISSION_REQUIRED",
	/** Returned with 404 when the repository does not exist or your GitHub account cannot see it, so check `repositoryName`. */
	REPOSITORY_NOT_FOUND: "REPOSITORY_NOT_FOUND",
	/** Returned with 400 when the branch does not exist in the repository, so check `repositoryBranch`. */
	BRANCH_NOT_FOUND: "BRANCH_NOT_FOUND",
	/** Returned with 502 when GitHub did not confirm the branch, so it is safe to try again. */
	FAILED_TO_FETCH: "FAILED_TO_FETCH",
	/** Returned with 400 when the branch name is longer than 256 characters, so use a shorter branch name. */
	INVALID_BRANCH_LENGTH: "INVALID_BRANCH_LENGTH",
	/** Returned with 400 when the autorestart setting in the configuration file is not valid, so fix it. */
	INVALID_AUTORESTART: "INVALID_AUTORESTART",
	/** Sent by the Git deploy webhook with 202 when the push deletes the branch, which means nothing is deployed. */
	GIT_BRANCH_DELETED: "GIT_BRANCH_DELETED",
	/** Sent by the Git deploy webhook with 202 when the push is for a tag or another ref that is not a branch, which means nothing is deployed. */
	GIT_REF_NOT_SUPPORTED: "GIT_REF_NOT_SUPPORTED",

	// Network / domains
	/** Returned with 400 when the custom domain is not a fully qualified domain name, so send one such as `app.example.com`. */
	INVALID_DOMAIN: "INVALID_DOMAIN",
	/** Returned with 400 when the configuration file sets a subdomain that cannot be applied to the application, so remove or change it. */
	CANNOT_SET_SUBDOMAIN: "CANNOT_SET_SUBDOMAIN",
	/** Returned with 400 when you ask for the DNS records of an application without a custom domain, so attach a custom domain first. */
	NO_CUSTOM_DOMAIN: "NO_CUSTOM_DOMAIN",
	/** Returned with 409 when the domain is attached to an application of another account, or to one your credentials cannot reach, so use another domain. */
	DOMAIN_ALREADY_EXISTS: "DOMAIN_ALREADY_EXISTS",
	/** Returned with 400 when the custom domain is a Square Cloud domain, so use a domain you own. */
	RESERVED_DOMAIN: "RESERVED_DOMAIN",
	/** Returned with 403 when the domain already serves as many applications as your plan allows, which is 2 on Standard, 5 on Pro and 10 on Enterprise, so remove it from another application or upgrade the plan. */
	LOAD_BALANCER_LIMIT_REACHED: "LOAD_BALANCER_LIMIT_REACHED",
	/** Returned with 502 when the edge network could not attach the custom domain, so try again later. */
	DNS_FAILED: "DNS_FAILED",
	/** Returned with 500 when the edge cache could not be purged, so try again later. */
	PURGE_CACHE_FAILED: "PURGE_CACHE_FAILED",
	/** Returned with 400 when a network analytics filter is not valid, so pass the exact `type` value that the matching breakdown returned. */
	INVALID_FILTER: "INVALID_FILTER",
	/** Returned with 503 when edge analytics are briefly unavailable and no recent cached copy exists, so try again in about a minute. */
	ANALYTICS_BUSY: "ANALYTICS_BUSY",
	/** Returned with 500 when network analytics or network logs could not be loaded, so try again later. */
	UNABLE_TO_FETCH_ANALYTICS: "UNABLE_TO_FETCH_ANALYTICS",
	/** Returned with 500 when the network error breakdown could not be loaded, so try again later. */
	UNABLE_TO_FETCH_ERRORS: "UNABLE_TO_FETCH_ERRORS",
	/** Returned with 500 when network performance data could not be loaded, so try again later. */
	UNABLE_TO_FETCH_PERFORMANCE: "UNABLE_TO_FETCH_PERFORMANCE",

	// Realtime
	/** Returned with 429 when you already have 5 realtime connections open, so close one before you open another. */
	REALTIME_MAX_CONNECTIONS: "REALTIME_MAX_CONNECTIONS",
	/** Returned with 429 when the application already has 30 realtime connections open across all users, so try again after some of them close. */
	REALTIME_MAX_CONNECTIONS_APP: "REALTIME_MAX_CONNECTIONS_APP",

	// Snapshots
	/** Returned with 404 when the snapshot could not be captured, so try again later. */
	SNAPSHOT_FAILED: "SNAPSHOT_FAILED",
	/** Returned with 404 when the snapshot to restore does not exist or you cannot reach it, so take `snapshotId` and `versionId` from the snapshot listing. */
	SNAPSHOT_NOT_FOUND: "SNAPSHOT_NOT_FOUND",
	/** Returned with 202 when a snapshot takes longer than about 90 seconds and keeps being generated, so look for it in the snapshot listing about 2 minutes later instead of creating another one. */
	SNAPSHOT_PROCESSING: "SNAPSHOT_PROCESSING",
	/** Returned with 409 when a snapshot or a restore of the resource is already running, so wait for it to finish and try again. */
	SNAPSHOT_IN_PROGRESS: "SNAPSHOT_IN_PROGRESS",
	/** Returned with 503 when snapshot storage cannot answer a listing, so try again in about 30 seconds, since the snapshots themselves are not affected. */
	SNAPSHOTS_UNAVAILABLE: "SNAPSHOTS_UNAVAILABLE",
	/** Returned with 202 when a restore takes longer than about 90 seconds and keeps running, so poll the restore state instead of posting the restore again. */
	SNAPSHOT_RESTORE_PROCESSING: "SNAPSHOT_RESTORE_PROCESSING",
	/** Returned with 404 when the restore could not be performed, so try again later or restore another snapshot. */
	SNAPSHOT_RESTORE_FAILED: "SNAPSHOT_RESTORE_FAILED",
	/** Returned with 404 when the snapshot archive is damaged, so restore another snapshot. */
	SNAPSHOT_CORRUPT: "SNAPSHOT_CORRUPT",
	/** Returned with 404 when the restore stopped before it finished, so check the resource and restore it again. */
	RESTORE_INTERRUPTED: "RESTORE_INTERRUPTED",
	/** Returned with 400 when the snapshot comes from another database engine than the target database, so restore a snapshot of the same engine. */
	SNAPSHOT_DATABASE_MISMATCH: "SNAPSHOT_DATABASE_MISMATCH",
	/** Returned with 400 when `snapshotId` is malformed, so pass the snapshot's `name` from the listing. */
	INVALID_SNAPSHOT_ID: "INVALID_SNAPSHOT_ID",
	/** Returned with 400 when `versionId` is malformed, so pass the snapshot's `version_id` from the listing. */
	INVALID_VERSION_ID: "INVALID_VERSION_ID",

	// Databases
	/** Returned with 404 when the database does not exist or is not yours, so check the id. */
	DATABASE_NOT_FOUND: "DATABASE_NOT_FOUND",
	/** Returned with 400 when you read the certificate or reset a credential of a database that is not running, so start it first. */
	DATABASE_NOT_RUNNING: "DATABASE_NOT_RUNNING",
	/** Returned with 400 or 500 when the database could not be created, so try again, since a failed creation keeps nothing. */
	DATABASE_CREATION_FAILED: "DATABASE_CREATION_FAILED",
	/** Returned with 400 when `type` is not `mongo`, `mysql`, `redis` or `postgres`, so send one of them. */
	INVALID_DATABASE_TYPE: "INVALID_DATABASE_TYPE",
	/** Returned with 400 when `version` is not supported for the chosen engine, so choose a supported version. */
	INVALID_DATABASE_VERSION: "INVALID_DATABASE_VERSION",
	/** Returned with 400 when `reset` is neither `password` nor `certificate`, so send one of them. */
	INVALID_RESET_TYPE: "INVALID_RESET_TYPE",
	/** Returned with 500 when the credential could not be rotated, so try again. */
	RESET_FAILED: "RESET_FAILED",
	/** Returned with 400 when a database update has neither `name` nor `ram`, so send at least one of them. */
	NO_UPDATE_DATA: "NO_UPDATE_DATA",

	// Workspaces
	/** Returned with 404 when the workspace does not exist, or you are not its owner or member as the route requires, so check `workspaceId`. */
	WORKSPACE_NOT_FOUND: "WORKSPACE_NOT_FOUND",
	/** Returned with 400 when the workspace could not be created, so try again. */
	WORKSPACE_CREATION_FAILED: "WORKSPACE_CREATION_FAILED",
	/** Returned with 400 when you already own as many workspaces as your plan allows, so delete one or upgrade the plan. */
	WORKSPACE_LIMIT_REACHED: "WORKSPACE_LIMIT_REACHED",
	/** Returned with 404 when `memberId` is missing or not a member of the workspace, so check the member id. */
	MEMBER_NOT_FOUND: "MEMBER_NOT_FOUND",
	/** Returned with 400 when the workspace already has as many members as the plan allows, so remove a member or upgrade the plan. */
	MEMBERS_LIMIT_REACHED: "MEMBERS_LIMIT_REACHED",
	/** Returned with 400 when the user is already a member of the workspace, so change their role instead if needed. */
	MEMBER_ALREADY_ADDED: "MEMBER_ALREADY_ADDED",
	/** Returned with 400 when the application is already shared with the workspace, so there is nothing to add. */
	APP_ALREADY_IN_WORKSPACE: "APP_ALREADY_IN_WORKSPACE",
	/** Returned with 400 when the workspace owner tries to change their own role, which is not allowed. */
	CANNOT_EDIT_OWNER: "CANNOT_EDIT_OWNER",
	/** Returned with 400 when the invite code belongs to the workspace owner, who cannot join their own workspace as a member. */
	CANNOT_INVITE_OWNER: "CANNOT_INVITE_OWNER",
	/** Returned with 400 when the owner tries to leave their own workspace, so delete the workspace instead. */
	CANNOT_LEAVE_OWNER: "CANNOT_LEAVE_OWNER",
	/** Returned with 400 when `group` is not `view`, `manager`, `maintain` or `admin`, so send one of them. */
	INVALID_GROUP: "INVALID_GROUP",
	/** Returned with 500 or 502 when GitHub repository validation fails during a GitHub App link, so try again. */
	VALIDATION_FAILED: "VALIDATION_FAILED",
	/** Returned with 504 when GitHub repository validation times out during a GitHub App link, so try again. */
	VALIDATION_TIMEOUT: "VALIDATION_TIMEOUT",

	// Square Cloud AI agent
	/** Returned with 429 when the plan's daily AI usage is used up, so wait for the reset at 00:00 UTC. */
	AI_DAILY_LIMIT_REACHED: "AI_DAILY_LIMIT_REACHED",
	/** Returned with 429 when the plan's weekly AI usage is used up, so wait for the reset on Monday at 00:00 UTC. */
	AI_WEEKLY_LIMIT_REACHED: "AI_WEEKLY_LIMIT_REACHED",
	/** Returned with 429 when the shared daily AI allowance for accounts without a plan is used up, so try again the next day or get a plan. */
	AI_NO_PLAN_LIMIT_REACHED: "AI_NO_PLAN_LIMIT_REACHED",
	/** Returned when your account already has the most AI chat streams open at once, so wait for one of them to finish. */
	AI_MAX_CONCURRENT_STREAMS: "AI_MAX_CONCURRENT_STREAMS",
	/** Returned with 503 when the AI agent is briefly unavailable, so try again later. */
	AI_UNAVAILABLE: "AI_UNAVAILABLE",
} as const;

/**
 * Any one of the error code values in the {@link APIErrorCode} object.
 */
export type APIErrorCode = (typeof APIErrorCode)[keyof typeof APIErrorCode];

/**
 * An ISO 8601 date and time string, such as `2024-05-01T12:00:00.000Z`.
 */
export type ISODateString = string;

/**
 * The id of a Square Cloud user.
 */
export type UserId = string & Brand<"UserId">;
/** Marks a plain string as a {@link UserId}. It does not check the value. */
export const UserId = (id: string): UserId => id as UserId;

/**
 * The id of an application, 32 hexadecimal characters.
 *
 * To act on an application shared with you through a workspace, append the
 * workspace id to the application id in the route: `<appId>-<workspaceId>`.
 */
export type ApplicationId = string & Brand<"ApplicationId">;
/** Marks a plain string as an {@link ApplicationId}. It does not check the value. */
export const ApplicationId = (id: string): ApplicationId => id as ApplicationId;

/**
 * The id of a database, 32 hexadecimal characters.
 */
export type DatabaseId = string & Brand<"DatabaseId">;
/** Marks a plain string as a {@link DatabaseId}. It does not check the value. */
export const DatabaseId = (id: string): DatabaseId => id as DatabaseId;

/**
 * The id of a workspace. It is a UUID v4 without hyphens, 32 hexadecimal
 * characters, and older workspaces keep a 40-character hexadecimal id.
 */
export type WorkspaceId = string & Brand<"WorkspaceId">;
/** Marks a plain string as a {@link WorkspaceId}. It does not check the value. */
export const WorkspaceId = (id: string): WorkspaceId => id as WorkspaceId;

/**
 * One entry of the runtime stats listing of every application or database
 * you own.
 *
 * `cpu`, formatted like `"0.00%"`, and `ram`, the memory in use formatted
 * like `"0.00MB"`, are present only while `running` is `true`. `TId` sets the
 * id type, so the same shape serves applications and databases.
 *
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

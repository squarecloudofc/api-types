# @squarecloud/api-types

## 5.0.0

### Major Changes

- Sync with the current Square Cloud API contract.

  **Breaking**

  - File content travels base64-encoded, which is lighter on the wire than the old JSON byte array. `APIFileReadPayload` is now `APIPayload<APIReadFileBase64>` (`{ encoding: "base64", data: string }`), and `RESTGetAPIFileContentQuery.encoding` is the required `"base64"`. Removed `APIReadFile` (the byte-array shape).
  - `RESTPutAPIFileUpsertJSONBody.content` is a `string`: the file base64-encoded with `encoding: "base64"`, or plain UTF-8 text. It no longer accepts `APIReadFile`.
  - `RESTPutAPIFileUpsertResultPayload` is status-only. Removed `RESTPutAPIFileUpsertResult` (`written`), which the API does not return.
  - `RESTDeleteAPIFileDeleteQuery` is replaced by `RESTDeleteAPIFileDeleteJSONBody`: the path goes in the JSON body.
  - `RESTPostAPIApplicationUploadResult`: `subdomain` is replaced by `domain`, the full host.
  - `APIDeployment`: every event has the required `source: "git"`.
  - `APISnapshot`: new required `version_id` and `url`.
  - `APIWorkspaceMember.name` is `string | null`.
  - `APIDatabaseCreated.certificate` is `string | null` (and still optional).
  - `APIListedFile.lastModified` is `number | null`.
  - `APIApplication`, `APIUserApplication` and `APIWorkspaceApp`: `domain` and `custom` are optional, because the key is omitted when unset.
  - Network performance: latency percentiles (`APINetworkLatency`, countries, colos, slowest paths) are `number | null`, and `APINetworkPerformanceColo.city`/`country` are `string | null`.
  - `APIServiceStatus.status` is `"online" | "degraded" | "unknown"` instead of `string`.

  **Added**

  - `APIErrorCode` now matches the API's public error codes, with 29 new codes: `MISSING_SCOPE` (403), `RESOURCE_NOT_ALLOWED` (403), `SCOPE_NOT_GRANTABLE`, `CONFLICTING_RESOURCES`, `DATABASE_UNAVAILABLE` (503, retryable), `CLUSTER_TIMEOUT`, `CLUSTER_UNAVAILABLE`, `REQUEST_ABORTED`, `ROUTE_NOT_FOUND`, `INVALID_INPUT`, `INVALID_PARAMETERS`, `LOGS_UNAVAILABLE`, `CONTAINER_NOT_FOUND`, `CONTAINER_INSUFFICIENT_DISK_SPACE`, `CONTAINER_NETWORK_CONFLICT`, `UPLOAD_BUSY`, `INVALID_ENCODING` (400), `GITHUB_NOT_CONNECTED` (403), `REPOSITORY_NOT_AVAILABLE`, `REPOSITORY_NOT_FOUND`, `BRANCH_NOT_FOUND`, `PURGE_CACHE_FAILED`, `INVALID_FILTER` (400), `ANALYTICS_BUSY`, `REALTIME_MAX_CONNECTIONS_APP`, `AI_DAILY_LIMIT_REACHED`, `AI_NO_PLAN_LIMIT_REACHED`, `AI_MAX_CONCURRENT_STREAMS` and `AI_UNAVAILABLE`.
  - `encoding?: "base64"` on `RESTPutAPIFileUpsertJSONBody`.
  - `APIDeployment` error events: optional `code` and `message`.
  - `APISnapshot`: optional `runtime` and `origin` (`SnapshotOrigin`).
  - `RESTPostAPIApplicationUploadResult.cluster`.
  - Realtime: `APIRealtimeEventName`, `APIRealtimeStatus` (the full `status` frame, where `cpuLimit` is the number of CPU cores) and `APIRealtimeStatusUpdate` (the lean frames to merge onto it).
  - `APIServiceStatus`: `checked_at`, `stale`, `services` and `dependencies` (`APIServiceComponentStatus`), plus the `ServiceStatus` type.
  - `APIPayload.message`.

  **Changed**

  - `APIPayload.code` is typed `APIErrorCode | (string & {})` for autocompletion. Unknown codes still type-check.
  - The `ApplicationStatus` constant is `as const`, so its values are literal types.
  - `APIErrorCode` groups the container codes under lifecycle actions and documents the non-obvious codes. An expired API key answers `401 ACCESS_DENIED`, and `SNAPSHOT_RESTORE_FAILED` (404) is the only restore failure code.
  - `RESTPostAPIDatabaseJSONBody.memory`: a non-integer is `400 INVALID_MEMORY`, not `INSUFFICIENT_MEMORY`.
  - JSDoc updates: status `ram` is the RAM in use (`"120.4MB"`), and `cpu`/`ram` are numbers with `rawData=true`. Metrics points come newest first. Workspace ids are 32 hex (UUID v4 without hyphens) or 40 hex on older workspaces. `providers[].type` is `"NAME (ASN)"`, the `provider` filter takes that exact value, and an invalid filter is `400 INVALID_FILTER`. File manager limits and errors are documented: 10 MB (`413 FILE_TOO_LARGE`), paths of at most 256 chars, `404 FILE_NOT_FOUND` for a missing directory, `403 BLOCKED_PATH`, `400 INVALID_CONTENT` for invalid base64, and empty content creating an empty file. Snapshot restore ids come from the listing's `name` and `version_id`.

## 4.0.0

### Major Changes

- 2fc9919: Sync `APIErrorCode` with the current API and drop every deprecated code.

  **Breaking**

  - Removed the pre-standardization aliases (`ID_INVALID`, `CODE_INVALID`, `NAME_INVALID`, `MEMORY_INVALID`, `DATABASE_TYPE_INVALID`, `DATABASE_VERSION_INVALID`, `UNKNOWN_WORKSPACE`, `UNKNOWN_MEMBER`, `MAX_APPLICATIONS_REACHED`, `MAX_MEMBERS_REACHED`, `FAILED_WORKSPACE_CREATION`, `FAILED_DATABASE_CREATION`, `FAILED_CLUSTER_SELECTION`, `FEW_MEMORY`, `FAILED_READ`, `FAILED_DELETE`, `DELETE_ERROR`, `FAILED_RENAME`, `FAILED_TO_SAVE`, `FAILED_RESET`, `FAILED_UPLOAD`, `FAILED_UPLOAD_DATA`, `COMMIT_ERROR`, `INTERNAL_ERROR`, `REGEX_VALIDATION`, `CAN_NOT_SET_SUBDOMAIN`, `INVALID_APP`, `SUBSCRIPTION_REQUIRED`). Use the canonical names they pointed to.
  - Removed `RATE_LIMIT` and `RATE_LIMIT_EXCEEDED`: every rate-limit 429 now answers `RATE_LIMITED`. `KEEP_CALM` is unchanged.

  **Added**

  - `RATE_LIMITED`: 429 on the account/API key (or an IP blocked for invalid keys, which can last ~30 minutes), on the app network endpoints and on `GET /users/snapshots`.
  - `CONTAINER_ALREADY_STARTED`, `CONTAINER_ALREADY_STOPPED` and `CONTAINER_TEMPORARILY_SUSPENDED` (409 on database start/stop).
  - `REPOSITORY_PERMISSION_REQUIRED` (403) and `FAILED_TO_FETCH` (502, retryable) for the GitHub App link.

  **Changed**

  - `RESTPostAPIDatabaseJSONBody.memory` is documented as an integer in MB.
  - The package author is Square Cloud; the maintainers are listed as contributors.

## 3.0.1

### Patch Changes

- Refreshed README with the standard Square Cloud SDK layout, quick-start imports and related projects.

## 3.0.0

### Major Changes

- d05bcc3: Sync with the Square Cloud API contract changes from the last 3 months.

  **Breaking**

  - `RESTPostAPIApplicationUploadResult`: `lang` replaced by `language: { name, version }`; added required `cpu` and optional `description`/`subdomain`.
  - `APINetworkAnalytics`: new required breakdowns `ips`, `status_codes`, `bots` and `content_types`, typed as whole-window `APINetworkAnalyticsTotalBucket` buckets.
  - `APINetworkDNS` is now an array of `APINetworkDNSRecord` (`{ type: "txt" | "cname", name, value, status }`); the previous `ownership`/`ssl` object shape no longer exists in the API.
  - `APIApplication` gained the required nullable `domain` and `custom` fields; `APIWebsiteApplication` now only narrows `domain` to `string`.
  - `APIListedFile.lastModified` is a Unix timestamp in milliseconds (`number`) instead of an ISO string.
  - `RESTGetAPIFilesListQuery.path` is optional (the API defaults it to `/`).

  **Added**

  - `GET /v2/apps/domains` types: `APIAppDomain`, `APIAppDomainType`, `APIAppDomainsPayload`.
  - `GET /v2/apps/load-balancers` types: `APILoadBalancers`, `APILoadBalancer`, `APILoadBalancerApp`, `APILoadBalancersPayload`.
  - `RESTGetAPINetworkAnalyticsQuery`: 11 optional drill-down filters (`country`, `ip`, `path`, `status`, `os`, `browser`, `protocol`, `referer`, `provider`, `content_type`, `bot`) applied to every breakdown at once.
  - `APIErrorCode`: constant and union of the standardized error codes (`INVALID_X` / `X_FAILED` / `X_NOT_FOUND` / `X_LIMIT_REACHED`), including `DAILY_SNAPSHOTS_LIMIT_REACHED`, `UPLOAD_ABORTED`, `LOAD_BALANCER_LIMIT_REACHED` and `UPGRADE_REQUIRED`. Pre-standardization names remain available as `@deprecated` aliases resolving to the canonical values, so existing comparisons keep working.
  - `APIApplicationStatus`/`APIDatabaseStatus`: optional `Raw` type parameter mirroring the `?rawData=true` response variant (raw numbers/arrays instead of formatted strings), plus `RESTGetAPIApplicationStatusQuery`.
  - `RESTPostAPIApplicationCommitQuery`: optional `path` destination directory for commits.
  - `ApplicationLanguage`: added `ruby`.

  **Docs**

  - JSDoc now documents current rate limits and behavior: logs, snapshots (per-plan daily quota and 30-minute listing cache), realtime SSE connection limits and TTL, custom-domain daily change limit, single-use workspace invite codes, `413 FILE_TOO_LARGE` on large file reads, and the expanded locale list (incl. `it-IT`).

## 2.0.0

### Major Changes

- 74df421: Remove `RESTPostAPINetworkPurgeCacheJSONBody` — the purge cache endpoint no longer accepts a body.

## 1.0.0

### Major Changes

- Port the ~30 missing v10.5 endpoint typings from the Node.js SDK draft, and
  realign the existing Network Analytics typings with the current OpenAPI
  (v10.5.0). New coverage:

  - Branded `DatabaseId` and `WorkspaceId` plus a shared
    `RuntimeStatsListItem<TId, Running>` used by both `APIApplicationStatusAll`
    and `APIDatabaseStatusListItem`.
  - `APIEnvVars` payload and POST/PUT/DELETE bodies for `/v2/apps/{appId}/envs`.
  - `APIMetrics` (24h × 5min points) for `/v2/apps/{appId}/metrics` and
    `/v2/databases/{databaseId}/metrics`.
  - Snapshot restore body and `RESTGetAPIUserSnapshotsQuery` with the new
    `SnapshotScope` ("applications" | "databases").
  - `APIGithubAppLinkResponse`, `RESTPostAPIGithubAppJSONBody`, and the
    `app: { id, name, branch }` field on `APIDeploymentCurrent`.
  - Full Network category: `APINetworkAnalyticsBucket`,
    `APINetworkAnalyticsTimeBucket`, `APINetworkErrors`, `APINetworkLogs`,
    `APINetworkPerformance`, plus `RESTAPINetworkRangeQuery` /
    `RESTAPINetworkErrorsQuery`.
  - Full Databases category: `APIDatabase`, `APIDatabaseSummary`,
    `APIDatabaseCreated`, `APIDatabaseStatus` (alias of `APIApplicationStatus`),
    `APIDatabaseStatusListItem`, certificate + credentials reset typings, plus
    POST/PATCH/DELETE/start/stop bodies.
  - Full Workspaces category: `APIWorkspace`, members, applications, invite
    code, and all mutation bodies.
  - `APIRealtimeSystemEvent` union for SSE protocol events.
  - `RESTGetAPIApplicationStatusAllQuery` adds the new optional `workspaceId`
    query parameter on `GET /v2/apps/status`.

  **`APIDeployment` realigned with production response** (the OpenAPI 10.5
  description of this endpoint was incorrect — verified against a live response):

  - `APIDeployPayload.response` is now `APIDeployment[][]` (nested) — outer is
    the list of recent deploys, inner is the timeline of events for each
    deploy.
  - `APIDeployment` is now a discriminated union on `state`:
    - `clone` events carry `branch: string`
    - `commit` events carry `files: { added, removed, modified }`
    - all other states have only `{ id, state, date }`
  - `DeploymentState` adds `"commit"` and `"restarting"`.
  - `APIDeployment.id` is now `string` (40-char SHA-1 commit hash) instead of
    the previous `` `git-${string}` `` template literal.

  **Realigned pre-existing endpoint typings with production** (all validated
  against live responses with the API team):

  - `APINetworkDNSPayload` shape replaced. The endpoint returns a single object
    `{ ownership: { type, name, value }, ssl: { status } }`, not the array of
    DNS records the previous type declared. `APINetworkDNSStatus` now describes
    the SSL validation state, applied to `APINetworkDNS.ssl.status`.
  - `APIListedFile.lastModified` is now `ISODateString` (was `number`).
  - `APIReadFile.type` is now the literal `"Buffer"` (was `string`).
  - `RESTPutAPIFileUpsertJSONBody.content` accepts `string | APIReadFile`
    (string or Node-style Buffer JSON object), not just `string`.
  - `RESTPutAPIFileUpsertResultPayload` now carries `response: { written: boolean }`
    instead of being status-only.
  - `RESTPostAPIApplicationUploadResult` simplified to `{ id, name, lang, ram }`
    to match the actual upload response. `RESTPostAPIApplicationUploadResultLanguage`
    is removed; `lang` is a plain `string` slug (e.g. `"nodejs"`).
  - `RESTPostAPIGithubWebhookResultPayload` is no longer
    `APIPayload<{ webhook }>` because `response` is absent when the webhook is
    removed (`access_token: "@"`). It now extends `APIPayloadStatusOnly` with an
    optional `response`.
  - `UserPlanName` rewritten. Paid tiers are always suffixed with their RAM
    size in GB (`hobby-1`/`hobby-2`, `standard-4`/`standard-6`/`standard-8`,
    `pro-12`/`pro-16`/`pro-24`, `enterprise-<N>`); only `free` has no suffix.
    The previous union accepted plain `"hobby"`/`"standard"`/`"pro"` (without
    size) which the backend never returns. The `"advanced"` tier is removed
    (no such tier exists in production). Added `HobbyPlanSizes`,
    `StandardPlanSizes`, `ProPlanSizes` type helpers; the `UserPlanName`
    helper now requires a size for paid tiers
    (`UserPlanName.Pro(16)` → `"pro-16"`).
  - `APIWorkspaceApp.lang` is now `ApplicationLanguage` (was `string`) — same
    vocabulary as `APIApplication.language` and `APIUserApplication.lang`.
  - `RESTPostAPIApplicationUploadResult.lang` is now `ApplicationLanguage` (was
    `string`).
  - `APIApplication` gains required `created_at: ISODateString` (backend has
    always returned it; the type just didn't declare it). `APIWebsiteApplication`
    inherits it.
  - `APIWorkspaceMember.joinedAt` is now required (was optional).
  - `RESTPostAPIApplicationCommitResultPayload` simplified to
    `APIPayloadStatusOnly`. The previous `message?: string` field was a vestige
    of an old shared success/error interface and never appears on real success
    responses.
  - `APINetworkPerformancePayload` now allows the empty-object response variant
    (`APIPayload<APINetworkPerformance | Record<string, never>>`) — consistent
    with analytics and errors. Backend returns `{}` when the requested window
    precedes the application's creation date.

  **Breaking changes vs 0.6.0:**

  - `APINetworkAnalytics` response shape replaced. The new shape matches the
    OpenAPI `NetworkAnalytics`: per-dimension breakdowns (`visits`, `countries`,
    `devices`, `os`, `browsers`, `protocols`, `methods`, `paths`, `referers`,
    `providers`) each as arrays of 15-minute buckets. Fields removed from the
    previous shape: `hostname`, `total`, `agents`, `hosts`. Fields renamed:
    `deviceTypes` → `devices`, `operatingSystems` → `os`. The endpoint now also
    requires `start`/`end` ISO timestamps (`RESTGetAPINetworkAnalyticsQuery`).
    `APINetworkAnalyticsPayload` is now `APIPayload<APINetworkAnalytics | Record<string, never>>`
    because the backend returns `{}` when the requested window precedes the
    application's creation date.
  - `APINetworkErrorsPayload` likewise becomes
    `APIPayload<APINetworkErrors | Record<string, never>>` for the same reason.
  - `APINetworkErrorsTopPath.method` and `APINetworkErrorsByMethod.method` are
    now `string | null` (edge may not attribute a method).
  - `APIDeploymentCurrent.webhook` is now optional. Either `app`, `webhook`, or
    both may be present.
  - `APIUser` gains required `locale` and `created_at`.
  - `APIUserApplication` gains required `domain: string | null`,
    `custom: string | null`, and `created_at` to match the OpenAPI `AppSummary`.
  - `APIUserInfo` gains required `databases: APIDatabaseSummary[]`.

### Minor Changes

- 4153b54: Remove deprecated backup typings

## 0.6.0

### Minor Changes

- d788f4c: Rename application backups to snapshots
- a3cf61a: Add typings for `/apps/:appId/network/purge_cache`

## 0.5.0

### Minor Changes

- 5a39642: Add enterprise plan sizes type
- 3bfd7c6: Fix `APIApplicationStatusAll` to show/hide usage depending on `running` property.
- 5a39642: Drop using enums.

### Patch Changes

- 4de3145: Added `advanced` and `enterprise-24` plans
- 4de3145: Removed `student` and `enterprise-16` plans

## 0.4.0

### Minor Changes

- 4d7babe: Update `UserPlanName` to include `Enterprise-16` new plan.
  Remove `Business` plan from `UserPlanName`.

## 0.3.3

### Patch Changes

- df0a13d: Remove `RESTPostAPIApplicationCommitQuery` due to API changes

## 0.3.2

### Patch Changes

- 79b1e02: Make deployment state an enum: `DeploymentState`
- 5b1f4af: Update `ApplicationLanguage` enum with new `dotnet` lang

## 0.3.1

### Patch Changes

- 5e67a46: Add typings for `/apps/:appId/deployments/current` (`APIDeploymentCurrent`)

## 0.3.0

### Minor Changes

- ef69efb: Add typings for `/apps/:appId/network/dns` (`APINetworkDNS`)
- 78f00c9: Add `RESTPostAPIApplicationBackup` and update `APIApplicationBackup`
- 211a9d4: Update file-related typings to match new API convention
- 3ef25a4: Implement branded types for UserId and ApplicationId
- 211a9d4: Add typings for `PATCH /apps/:appId/files`
- 58d009d: Add typings for `/apps/:appId/network/custom` (`RESTPostAPINetworkCustomDomainJSONBody`)
- a15ce71: Add typings for `/service/status` (`APIServiceStatus`)

### Patch Changes

- b3c226d: Completely remove deprecated `tag` and `isWebsite` properties

## 0.2.5

### Patch Changes

- b3f1a17: Update `UserPlanName` with new Enterprise plans

## 0.2.4

### Patch Changes

- 4b4ddc1: Deprecate APIUser, APIUserApplication and RESTPostAPIApplicationUploadResult `tag` property.
- 4b4ddc1: Deprecate APIApplication, APIWebsiteApplication and APIUserApplication `isWebsite` property.

## 0.2.3

### Patch Changes

- ecd05cf: Add `free` and `student` to `UserPlanName`
- ab66f4c: remove `locale` from `APIUser`

## 0.2.2

### Patch Changes

- 881b9a1: Add `static` to `ApplicationLanguage` enum

## 0.2.1

### Patch Changes

- c013db0: remove `APIApplication#gitIntegration` due to API changes

## 0.2.0

### Minor Changes

- c4b38e3: remove `avatar` from `APIApplication`, `APIUserApplication` and `RESTPostAPIApplicationUploadResult`
- 59da443: update `UserPlanName` enum to new plans

### Patch Changes

- 2504cbd: improve JSDocs

## 0.1.0

### Minor Changes

- 004808a: add typings for /apps/all/status route

### Patch Changes

- 0f3cd4e: improve common interfaces naming
- d3dbca7: rename some typings under application#files

## 0.0.4

### Patch Changes

- b24724c: improve comments and file structure
- b4865e1: simplify `RESTPostAPIFileCreateJSONBody#buffer`
- 2dcfab4: add descriptions properties to Applications\*

## 0.0.3

### Patch Changes

- 19c73d1: fix `APIDeploy#state` named incorrectly
  remove `APIApplication#cpu`
  make `RESTPostAPIApplicationUploadResult#cpu` not nullable
  add enum for `APIApplication#language`
  add enum for `APIApplicationStatus#status`
  add enum for `APIDeploy#state`
  add enum for `APIFile#type`
  improve typings for `APIDeploy`

## 0.0.2

### Patch Changes

- 9e85d33: added README

## 0.0.1

### Patch Changes

- 1baa4f5: First version!

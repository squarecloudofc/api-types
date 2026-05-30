# @squarecloud/api-types

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

---
"@squarecloud/api-types": major
---

Sync with the Square Cloud API contract changes from the last 3 months.

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

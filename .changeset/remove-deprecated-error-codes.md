---
"@squarecloud/api-types": major
---

Sync `APIErrorCode` with the current API and drop every deprecated code.

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

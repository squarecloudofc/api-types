import type { APIPayload } from "../../common/v2";

/**
 * Application environment variables as a `{ key: value }` map. Up to 256
 * entries per application; each key max 1024 chars, each value max 4096 chars.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/envs
 */
export type APIEnvVars = Record<string, string>;

export type APIEnvVarsPayload = APIPayload<APIEnvVars>;

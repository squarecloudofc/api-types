import type { APIPayload } from "../../common/v2";

/**
 * The environment variables of an application, as a map of names to values.
 *
 * An application can have up to 256 variables. Each name can be up to 1024
 * characters and each value up to 4096 characters.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/envs
 */
export type APIEnvVars = Record<string, string>;

/** The response envelope that carries {@link APIEnvVars}. */
export type APIEnvVarsPayload = APIPayload<APIEnvVars>;

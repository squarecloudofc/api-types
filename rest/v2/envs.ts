/**
 * Merge new environment variables into the existing set.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/envs
 */
export interface RESTPostAPIEnvVarsJSONBody {
	envs: Record<string, string>;
}

/**
 * Replace the entire set of environment variables.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/envs
 */
export interface RESTPutAPIEnvVarsJSONBody {
	envs: Record<string, string>;
}

/**
 * Remove specific environment variables by key.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/envs
 */
export interface RESTDeleteAPIEnvVarsJSONBody {
	envs: string[];
}

/**
 * Body of `POST /v2/apps/{appId}/envs`, which adds or updates environment
 * variables and keeps the ones you leave out.
 *
 * Names are letters, digits, underscores, dots and hyphens and cannot start
 * with a digit. An application can have up to 256 variables, each name up to
 * 1024 characters and each value up to 4096 characters.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/envs
 */
export interface RESTPostAPIEnvVarsJSONBody {
	/** The variables to add or update, as a map of names to values. */
	envs: Record<string, string>;
}

/**
 * Body of `PUT /v2/apps/{appId}/envs`, which replaces every environment
 * variable with the set you send. Send an empty object to remove them all.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/envs
 */
export interface RESTPutAPIEnvVarsJSONBody {
	/** The complete set of variables, as a map of names to values. */
	envs: Record<string, string>;
}

/**
 * Body of `DELETE /v2/apps/{appId}/envs`, which removes environment
 * variables by name. Names that do not exist are ignored.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/envs
 */
export interface RESTDeleteAPIEnvVarsJSONBody {
	/** The names of the variables to remove. */
	envs: string[];
}

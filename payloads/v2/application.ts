import type { APIPayload, ApplicationId, ISODateString } from "../../common/v2";

/**
 * The runtime of an application, as the API names it. `static` covers sites
 * made only of HTML, CSS and other static files.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/info
 * @see https://docs.squarecloud.app/en/getting-started/config-file
 */
export type ApplicationLanguage =
	| "javascript"
	| "typescript"
	| "python"
	| "java"
	| "elixir"
	| "go"
	| "rust"
	| "ruby"
	| "php"
	| "dotnet"
	| "static";
/** The {@link ApplicationLanguage} values by name. */
export const ApplicationLanguage = {
	JavaScript: "javascript",
	TypeScript: "typescript",
	Python: "python",
	Java: "java",
	Elixir: "elixir",
	Go: "go",
	Rust: "rust",
	Ruby: "ruby",
	PHP: "php",
	Dotnet: "dotnet",
	Static: "static",
} as const;

/**
 * The details of one application: its name, owner, memory, runtime and
 * domains.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/info
 */
export interface APIApplication {
	id: ApplicationId;
	/** The display name. */
	name: string;
	/** The description. The key is omitted when no description is set. */
	desc?: string;
	/** The user id of the application's owner. */
	owner: string;
	/** The cluster that hosts the application. */
	cluster: string;
	/** The memory allocated to the application, in MB. */
	ram: number;
	language: ApplicationLanguage;
	/**
	 * The default hostname, such as `my-app.squareweb.app`. It is omitted or
	 * `null` when the application has none.
	 */
	domain?: string | null;
	/**
	 * The custom domain attached to the application. It is omitted or `null`
	 * when no custom domain is set.
	 */
	custom?: string | null;
	/** When the application was created. */
	created_at: ISODateString;
}

/** The response envelope that carries an {@link APIApplication}. */
export type APIApplicationPayload = APIPayload<APIApplication>;

/**
 * An {@link APIApplication} known to be a website, so `domain` is always a
 * string.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/info
 */
export interface APIWebsiteApplication extends APIApplication {
	/** The default hostname, such as `my-app.squareweb.app`. */
	domain: string;
}

/** The response envelope that carries an {@link APIWebsiteApplication}. */
export type APIWebsiteApplicationPayload = APIPayload<APIWebsiteApplication>;
